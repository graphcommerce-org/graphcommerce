import fs from 'node:fs'
import path from 'node:path'
import type { PackageJson } from 'type-fest'

function resolveRecursivePackageJson(
  packageJsonFilename: string,
  dependencyStructure: DependencyStructure,
  force = false,
) {
  try {
    const packageJsonFile = fs.readFileSync(packageJsonFilename, 'utf-8').toString()

    const packageJson = JSON.parse(packageJsonFile) as PackageJson

    if (!packageJson.name) throw Error('Package does not have a name')

    const dependencies = [
      ...Object.keys(packageJson.dependencies ?? {}),
      ...Object.keys(packageJson.devDependencies ?? {}),
      ...Object.keys(packageJson.peerDependencies ?? {}),
    ]

    if (!force && !packageJson.name.includes('graphcommerce')) return dependencyStructure

    const dirName = path.dirname(path.relative(process.cwd(), packageJsonFilename))

    if (packageNames.has(packageJson.name)) return packageNames

    // Package not found, recursively scan
    packageNames.set(packageJson.name, dirName)

    dependencies.map((dependency) => {
      try {
        const filePath = require.resolve(path.join(dependency, 'package.json'))
        if (filePath) return resolveRecursivePackageJson(filePath, packageNames)
      } catch {
        return false
      }
      return false
    })
  } catch (e) {
    // File is not a JSON file or something like that, we now skip this file
  }

  return packageNames
}

/**
 * This will return a list of all dependencies that have `graphcommerce` in the name, matching:
 *
 * - `@graphcommerce/package-name`
 * - `@mycompany/graphcommerce-my-feature`
 *
 * It will traverse children until it finds a package that doesn't contain graphcommerce in the name
 * and stop there, not checking children.
 */
export function resolveDependenciesSync(root = process.cwd()) {
  const cached = resolveCache.get(root)
  if (cached) return cached
  const dependencyStructure = resolveRecursivePackageJson(path.join(root, 'package.json'), {}, true)

  const sorted = sortDependencies(dependencyStructure)
  resolveCache.set(root, sorted)
  return sorted
}
