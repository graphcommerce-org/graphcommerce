import fs from 'node:fs/promises'
import path from 'node:path'
import { sync as globSync } from 'glob'
import { packageRoots } from '../utils'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import type { PluginConfig } from './generateInterceptor'

export interface PackageJson {
  name: string
  exports?: Record<string, string | { types?: string; default?: string }>
  [key: string]: any
}

/** Updates package.json exports to include all plugin files automatically */
export async function updatePackageExports(
  plugins: PluginConfig[],
  cwd: string = process.cwd(),
): Promise<void> {
  // Use packageRoots to discover ALL packages in the monorepo, not just dependencies
  const deps = resolveDependenciesSync()
  const packages = [...deps.values()].filter((p) => p !== '.')
  const roots = packageRoots(packages)

  console.log(`🔍 Scanning ${roots.length} package roots for plugins...`)

  // Group plugins by package - discover ALL plugin files in ALL packages in the monorepo
  const pluginsByPackage = new Map<string, Set<string>>()

  // Scan all individual packages within the package roots
  for (const root of roots) {
    // Find all package directories within this root
    const packageDirs = globSync(`${root}/*/package.json`).map((pkgPath) => path.dirname(pkgPath))

    for (const packagePath of packageDirs) {
      const pluginFiles = globSync(`${packagePath}/plugins/**/*.{ts,tsx}`)

      if (pluginFiles.length > 0) {
        const exportPaths = new Set<string>()

        pluginFiles.forEach((file) => {
          // Convert file path to export path
          const relativePath = path.relative(packagePath, file)
          const exportPath = `./${relativePath.replace(/\.(ts|tsx)$/, '')}`
          exportPaths.add(exportPath)
        })

        if (exportPaths.size > 0) {
          const packageJsonPath = path.join(packagePath, 'package.json')
          try {
            // Read package.json to get the package name for logging
            const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8')
            const packageJson = JSON.parse(packageJsonContent)
            const packageName = packageJson.name || path.basename(packagePath)

            pluginsByPackage.set(packagePath, exportPaths)
            console.log(`🔍 Found ${exportPaths.size} plugin files in ${packageName}`)
          } catch (error) {
            console.warn(`⚠️  Could not read package.json for ${packagePath}:`, error)
          }
        }
      }
    }
  }

  console.log(`📦 Total packages with plugins: ${pluginsByPackage.size}`)

  // Update package.json for each package that has plugins
  const updatePromises = Array.from(pluginsByPackage.entries()).map(
    async ([packagePath, exportPaths]) => {
      const packageJsonPath = path.join(packagePath, 'package.json')

      try {
        const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8')
        const packageJson: PackageJson = JSON.parse(packageJsonContent)

        // Initialize exports if it doesn't exist
        if (!packageJson.exports) {
          packageJson.exports = { '.': './index.ts' }
        }

        // Ensure main export exists
        if (typeof packageJson.exports === 'object' && !packageJson.exports['.']) {
          packageJson.exports['.'] = './index.ts'
        }

        let hasChanges = false

        // Add plugin exports
        exportPaths.forEach((exportPath) => {
          const exportKey = exportPath.startsWith('./') ? exportPath : `./${exportPath}`
          const filePath = `${exportPath}.tsx`
          const tsFilePath = `${exportPath}.ts`

          // Check if .tsx or .ts file exists
          const targetFile = globSync(path.join(packagePath, `${exportPath.slice(2)}.{ts,tsx}`))[0]
          if (targetFile) {
            const extension = targetFile.endsWith('.tsx') ? '.tsx' : '.ts'
            const targetPath = `${exportPath}${extension}`

            if (packageJson.exports && !packageJson.exports[exportKey]) {
              packageJson.exports[exportKey] = targetPath
              hasChanges = true
            }
          }
        })

        if (hasChanges) {
          // Sort exports for consistency (. first, then alphabetically)
          const sortedExports: Record<string, string | { types?: string; default?: string }> = {}

          if (packageJson.exports['.']) {
            sortedExports['.'] = packageJson.exports['.']
          }

          Object.keys(packageJson.exports)
            .filter((key) => key !== '.')
            .sort()
            .forEach((key) => {
              sortedExports[key] = packageJson.exports![key]
            })

          packageJson.exports = sortedExports

          const updatedContent = JSON.stringify(packageJson, null, 2) + '\n'
          await fs.writeFile(packageJsonPath, updatedContent)

          console.log(`✅ Updated exports in ${packageJson.name}`)

          // Log the new exports
          const newExports = Object.keys(packageJson.exports).filter((key) => key !== '.')
          if (newExports.length > 0) {
            console.log(`   Added exports: ${newExports.join(', ')}`)
          }
        } else {
          // Log packages that were scanned but had no changes
          console.log(
            `ℹ️  No changes needed for ${packageJson.name} (${exportPaths.size} plugins already exported)`,
          )
        }
      } catch (error) {
        console.error(`❌ Failed to update package.json for ${packagePath}:`, error)
      }
    },
  )

  await Promise.all(updatePromises)
}
