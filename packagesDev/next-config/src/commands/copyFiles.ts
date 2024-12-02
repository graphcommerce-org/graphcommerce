/* eslint-disable no-await-in-loop */
import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'

// Add debug logging helper
const debug = (...args: unknown[]) => {
  if (process.env.DEBUG) console.log('[copy-files]', ...args)
}

// Add constants for the magic comments
const MANAGED_BY_GC = '// managed by: graphcommerce'
const MANAGED_LOCALLY = '// managed by: local'

const GITIGNORE_SECTION_START = '# managed by: graphcommerce'
const GITIGNORE_SECTION_END = '# end managed by: graphcommerce'

/**
 * Updates the .gitignore file with a list of GraphCommerce managed files
 *
 * - Removes any existing GraphCommerce managed files section
 * - If managedFiles is not empty, adds a new section with the files
 * - If managedFiles is empty, just cleans up the existing section
 * - Ensures the file ends with a newline
 */
async function updateGitignore(managedFiles: string[]) {
  const gitignorePath = path.join(process.cwd(), '.gitignore')
  let content: string

  try {
    content = await fs.readFile(gitignorePath, 'utf-8')
    debug('Reading existing .gitignore')
  } catch (err) {
    debug('.gitignore not found, creating new file')
    content = ''
  }

  // Remove existing GraphCommerce section if it exists
  const sectionRegex = new RegExp(
    `${GITIGNORE_SECTION_START}[\\s\\S]*?${GITIGNORE_SECTION_END}\\n?`,
    'g',
  )
  content = content.replace(sectionRegex, '')

  // Only add new section if there are files to manage
  if (managedFiles.length > 0) {
    const newSection = [
      GITIGNORE_SECTION_START,
      ...managedFiles.sort(),
      GITIGNORE_SECTION_END,
      '', // Empty line at the end
    ].join('\n')

    // Append the new section
    content = `${content.trim()}\n\n${newSection}`
    debug(`Updated .gitignore with ${managedFiles.length} managed files`)
  } else {
    content = `${content.trim()}\n`
    debug('Cleaned up .gitignore managed section')
  }

  await fs.writeFile(gitignorePath, content)
}

/** Determines how a file should be managed based on its content */
function getFileManagement(content: Buffer | undefined): 'local' | 'graphcommerce' | 'unmanaged' {
  if (!content) return 'graphcommerce'
  const contentStr = content.toString()
  if (contentStr.startsWith(MANAGED_LOCALLY)) return 'local'
  if (contentStr.startsWith(MANAGED_BY_GC)) return 'graphcommerce'
  return 'unmanaged'
}

/**
 * The packages are @graphcommerce/* packages and have special treatment.
 *
 * 1. Glob the `copy/**` directory for each package and generate a list of files that need to be
 *    copied. Error if a file with the same path exists in another package.
 * 2. Copy the files to the project directory (cwd).
 *
 *    1. If the file doesn't exist: Create directories and the file with "managed by: graphcommerce"
 *    2. If the file exists and starts with "managed by: local": Skip the file
 *    3. If the file exists but doesn't have a management comment: Suggest adding "managed by: local"
 *    4. If the file is managed by graphcommerce: Update if content differs
 */
export async function copyFiles() {
  const startTime = performance.now()
  debug('Starting copyFiles')

  const cwd = process.cwd()
  const deps = resolveDependenciesSync()
  const packages = [...deps.values()].filter((p) => p !== '.')

  // Track files and their source packages to detect conflicts
  const fileMap = new Map<string, { sourcePath: string; packagePath: string }>()
  const managedFiles = new Set<string>()
  const existingManagedFiles = new Set<string>()

  // First scan existing files to find GraphCommerce managed ones
  const scanStart = performance.now()
  try {
    // Use only default patterns for testing
    const gitignorePatterns = [
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.git/**',
      '**/node_modules/**',
    ]

    const allFiles = await fg('**/*', {
      cwd,
      dot: true,
      ignore: gitignorePatterns,
      onlyFiles: true,
    })
    debug(
      `Found ${allFiles.length} project files in ${(performance.now() - scanStart).toFixed(0)}ms`,
    )

    const readStart = performance.now()
    await Promise.all(
      allFiles.map(async (file) => {
        const filePath = path.join(cwd, file)
        try {
          const content = await fs.readFile(filePath)
          if (getFileManagement(content) === 'graphcommerce') {
            existingManagedFiles.add(file)
            debug(`Found existing managed file: ${file}`)
          }
        } catch (err) {
          debug(`Error reading file ${file}:`, err)
        }
      }),
    )
    debug(
      `Read ${existingManagedFiles.size} managed files in ${(performance.now() - readStart).toFixed(0)}ms`,
    )
  } catch (err) {
    debug('Error scanning project files:', err)
  }

  // First pass: collect all files and check for conflicts
  const collectStart = performance.now()
  await Promise.all(
    packages.map(async (pkg) => {
      const copyDir = path.join(pkg, 'copy')
      try {
        const files = await fg('**/*', { cwd: copyDir, dot: true, suppressErrors: true })
        if (files.length > 0) {
          debug(`Found files in ${pkg}:`, files)

          for (const file of files) {
            const sourcePath = path.join(copyDir, file)
            const existing = fileMap.get(file)

            if (existing) {
              console.error(`Error: File conflict detected for '${file}'
Found in packages:
  - ${existing.packagePath} -> ${existing.sourcePath}
  - ${pkg} -> ${sourcePath}`)
              process.exit(1)
            }

            fileMap.set(file, { sourcePath, packagePath: pkg })
          }
        }
      } catch (err) {
        if ((err as { code?: string }).code === 'ENOENT') return
        console.error(
          `Error scanning directory ${copyDir}: ${(err as Error).message}\nPath: ${copyDir}`,
        )
        process.exit(1)
      }
    }),
  )
  debug(`Collected ${fileMap.size} files in ${(performance.now() - collectStart).toFixed(0)}ms`)

  // Second pass: copy files and handle removals
  const copyStart = performance.now()
  await Promise.all(
    Array.from(fileMap.entries()).map(async ([file, { sourcePath }]) => {
      const targetPath = path.join(cwd, file)
      debug(`Processing file: ${file}`)

      try {
        await fs.mkdir(path.dirname(targetPath), { recursive: true })

        const sourceContent = await fs.readFile(sourcePath)
        const contentWithComment = Buffer.concat([
          Buffer.from(
            `${MANAGED_BY_GC}\n// to modify this file, change it to managed by: local\n\n`,
          ),
          sourceContent,
        ])

        let targetContent: Buffer | undefined

        try {
          targetContent = await fs.readFile(targetPath)

          const management = getFileManagement(targetContent)
          if (management === 'local') {
            debug(`File ${file} is managed locally, skipping`)
            return
          }
          if (management === 'unmanaged') {
            console.log(
              `Note: File ${file} has been modified. Add '${MANAGED_LOCALLY.trim()}' at the top to manage it locally.`,
            )
            debug(`File ${file} doesn't have management comment, skipping`)
            return
          }

          debug(`File ${file} is managed by graphcommerce, will update if needed`)
        } catch (err) {
          if ((err as { code?: string }).code !== 'ENOENT') {
            console.error(`Error reading file ${file}: ${(err as Error).message}
Source: ${sourcePath}`)
            process.exit(1)
          }
          console.log(`Creating new file: ${file}\nSource: ${sourcePath}`)
          debug('File does not exist yet')
        }

        // Skip if content is identical (including magic comment)
        if (targetContent && Buffer.compare(contentWithComment, targetContent) === 0) {
          debug(`File ${file} content is identical to source, skipping`)
          managedFiles.add(file)
          return
        }

        // Copy the file with magic comment
        await fs.writeFile(targetPath, contentWithComment)
        if (targetContent) {
          console.log(`Updated managed file: ${file}`)
          debug(`Overwrote existing file: ${file}`)
        }

        // If the file is managed by GraphCommerce (new or updated), add it to managedFiles
        if (!targetContent || targetContent.toString().startsWith(MANAGED_BY_GC)) {
          managedFiles.add(file)
          debug('Added managed file:', file)
        }
      } catch (err) {
        console.error(`Error copying file ${file}: ${(err as Error).message}
Source: ${sourcePath}`)
        process.exit(1)
      }
    }),
  )
  debug(`Copied ${managedFiles.size} files in ${(performance.now() - copyStart).toFixed(0)}ms`)

  // Remove files that are no longer provided
  const removeStart = performance.now()
  const filesToRemove = Array.from(existingManagedFiles).filter((file) => !managedFiles.has(file))
  debug(`Files to remove: ${filesToRemove.length}`)

  // Helper function to recursively clean up empty directories
  async function cleanupEmptyDirs(startPath: string) {
    let currentDir = startPath
    while (currentDir !== cwd) {
      try {
        const dirContents = await fs.readdir(currentDir)
        if (dirContents.length === 0) {
          await fs.rmdir(currentDir)
          debug(`Removed empty directory: ${currentDir}`)
          currentDir = path.dirname(currentDir)
        } else {
          break // Stop if directory is not empty
        }
      } catch (err) {
        if ((err as { code?: string }).code === 'EACCES') {
          console.error(`Error cleaning up directory ${currentDir}: ${(err as Error).message}`)
          process.exit(1)
        }
        break // Stop on other errors (like ENOENT)
      }
    }
  }

  // Process file removals in parallel
  await Promise.all(
    filesToRemove.map(async (file) => {
      const filePath = path.join(cwd, file)
      const dirPath = path.dirname(filePath)

      try {
        // First check if the directory exists and is accessible
        await fs.readdir(dirPath)

        // Then try to remove the file
        try {
          await fs.unlink(filePath)
          console.log(`Removed managed file: ${file}`)
          debug(`Removed file: ${file}`)
        } catch (err) {
          if ((err as { code?: string }).code !== 'ENOENT') {
            console.error(`Error removing file ${file}: ${(err as Error).message}`)
            process.exit(1)
          }
        }

        // Finally, try to clean up empty directories
        await cleanupEmptyDirs(dirPath)
      } catch (err) {
        if ((err as { code?: string }).code === 'EACCES') {
          console.error(`Error accessing directory ${dirPath}: ${(err as Error).message}`)
          process.exit(1)
        }
        // Ignore ENOENT errors for directories that don't exist
      }
    }),
  )
  debug(`Removed files in ${(performance.now() - removeStart).toFixed(0)}ms`)

  // Update .gitignore with current list of managed files
  if (managedFiles.size > 0) {
    debug('Found managed files:', Array.from(managedFiles))
    await updateGitignore(Array.from(managedFiles))
  } else {
    debug('No managed files found, cleaning up .gitignore section')
    await updateGitignore([])
  }

  debug(`Total execution time: ${(performance.now() - startTime).toFixed(0)}ms`)
}
