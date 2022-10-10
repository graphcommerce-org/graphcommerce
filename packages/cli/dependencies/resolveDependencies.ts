import fs from 'node:fs/promises'
import path from 'node:path'
import type { PackageJson } from 'type-fest'

async function resolveRecursivePackageJson(packageJsonFilename: string, packageNames: Set<string>) {
  try {
    const packageJsonFile = (await fs.readFile(packageJsonFilename, 'utf-8')).toString()
    const packageJson = JSON.parse(packageJsonFile) as PackageJson

    if (!packageJson.name) throw Error('Package does not have a name')

    const dependencies = [
      ...Object.keys(packageJson.dependencies ?? {}),
      ...Object.keys(packageJson.devDependencies ?? {}),
      ...Object.keys(packageJson.peerDependencies ?? {}),
    ]

    const isGraphCommerce = !!dependencies.some((name) => name.includes('graphcommerce'))
    if (!isGraphCommerce) return packageNames

    const dirName = path.dirname(path.relative(process.cwd(), packageJsonFilename))

    if (packageNames.has(dirName)) return packageNames
    packageNames.add(dirName)

    await Promise.allSettled(
      dependencies.map((dependency) => {
        try {
          const filePath = require.resolve(path.join(dependency, 'package.json'))
          if (filePath) return resolveRecursivePackageJson(filePath, packageNames)
        } catch {
          return false
        }
        return false
      }),
    )
  } catch (e) {
    console.log('done', e)
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
export async function resolveDependencies(root = process.cwd()) {
  return [...(await resolveRecursivePackageJson(path.join(root, 'package.json'), new Set()))]
}
