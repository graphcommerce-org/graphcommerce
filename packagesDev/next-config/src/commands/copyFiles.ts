import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'

// Add debug logging helper
const debug = (...args: unknown[]) => {
  if (process.env.DEBUG) console.log('[copyFiles]', ...args)
}

// Add constants for the magic comments
type FileManagement = 'graphcommerce' | 'local'
const createManagementComment = (type: FileManagement) => `// managed by: ${type}`

const MANAGED_BY_GC = createManagementComment('graphcommerce')
const MANAGED_LOCALLY = createManagementComment('local')

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

  debug('Updating .gitignore with managed files:', managedFiles)

  try {
    content = await fs.readFile(gitignorePath, 'utf-8')
    debug('Existing .gitignore content:', content)
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
  debug('Content after removing existing section:', content)

  // Only add new section if there are files to manage
  if (managedFiles.length > 0) {
    const newSection = [
      GITIGNORE_SECTION_START,
      ...managedFiles.sort(),
      GITIGNORE_SECTION_END,
      '', // Empty line at the end
    ].join('\n')
    debug('New section to add:', newSection)

    // Append the new section
    content = `${content.trim()}\n\n${newSection}`
  } else {
    // Just trim the content when no files to manage
    content = `${content.trim()}\n`
  }

  debug('Final content:', content)

  try {
    await fs.writeFile(gitignorePath, content)
    debug('Successfully wrote .gitignore file')
  } catch (err) {
    console.error('Error writing .gitignore:', err)
  }
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
  debug('Starting copyFiles')

  const cwd = process.cwd()
  const deps = resolveDependenciesSync()
  const packages = [...deps.values()].filter((p) => p !== '.')
  debug('Found packages:', packages)

  // Track files and their source packages to detect conflicts
  const fileMap = new Map<string, { sourcePath: string; packagePath: string }>()
  // Track which files are managed by GraphCommerce
  const managedFiles = new Set<string>()

  // First pass: collect all files and check for conflicts
  await Promise.all(
    packages.map(async (pkg) => {
      const copyDir = path.join(pkg, 'copy')

      try {
        const files = await glob('**/*', { cwd: copyDir, nodir: true, dot: true })
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
      } catch (err) {
        // Skip if copy directory doesn't exist
        if ((err as { code?: string }).code !== 'ENOENT') {
          console.error(`Error scanning directory ${copyDir}: ${(err as Error).message}
Path: ${copyDir}`)
          process.exit(1)
        }
      }
    }),
  )

  // Second pass: copy files
  await Promise.all(
    Array.from(fileMap.entries()).map(async ([file, { sourcePath }]) => {
      const targetPath = path.join(cwd, file)
      debug(`Processing file: ${file}`)

      try {
        await fs.mkdir(path.dirname(targetPath), { recursive: true })

        const sourceContent = await fs.readFile(sourcePath)
        const contentWithComment = Buffer.concat([
          Buffer.from(`${MANAGED_BY_GC}\n`),
          Buffer.from('// to modify this file, change it to managed by: local\n\n'),
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
          console.log(`Creating new file: ${file}
Source: ${sourcePath}`)
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

  // Update .gitignore with the list of managed files
  if (managedFiles.size > 0) {
    debug('Found managed files:', Array.from(managedFiles))
    await updateGitignore(Array.from(managedFiles))
  } else {
    debug('No managed files found, cleaning up .gitignore section')
    await updateGitignore([]) // Pass empty array to clean up the section
  }
}
