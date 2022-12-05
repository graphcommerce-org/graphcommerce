import fs from 'node:fs'
import path from 'node:path'
import type { PackageJson } from 'type-fest'
import { PackagesSort } from './PackagesSort'

type PackageNames = Map<string, string>
type DependencyStructure = Record<string, { dirName: string; dependencies: string[] }>

const resolveCache: Map<string, PackageNames> = new Map<string, PackageNames>()

function resolveRecursivePackageJson(
  packageJsonFilename: string,
  dependencyStructure: DependencyStructure,
  force = false,
) {
  const packageJsonFile = fs.readFileSync(packageJsonFilename, 'utf-8').toString()
  const packageJson = JSON.parse(packageJsonFile) as PackageJson

  if (!packageJson.name) throw Error('Package does not have a name')

  if (dependencyStructure[packageJson.name]) return dependencyStructure

  const dependencies = [
    ...new Set(
      [
        ...Object.keys(packageJson.dependencies ?? {}),
        ...Object.keys(packageJson.devDependencies ?? {}),
        // ...Object.keys(packageJson.peerDependencies ?? {}),
      ].filter((name) => name.includes('graphcommerce')),
    ),
  ]

  if (!force && !packageJson.name.includes('graphcommerce')) return dependencyStructure

  dependencyStructure[packageJson.name] = {
    dirName: path.dirname(path.relative(process.cwd(), packageJsonFilename)),
    dependencies,
  }

  dependencies.forEach((dependency) => {
    resolveRecursivePackageJson(
      require.resolve(path.join(dependency, 'package.json')),
      dependencyStructure,
    )
  })

  return dependencyStructure
}

/**
 * We're sorting all dependencies topologically
 *
 * This can detect dependency cycles and throw an error
 */
export function sortDependencies(dependencyStructure: DependencyStructure): PackageNames {
  const packages = Object.entries(dependencyStructure)
  const sorter = new PackagesSort(new Map(packages.map(([key, value]) => [key, value.dirName])))

  packages.forEach(([key, { dependencies }]) =>
    dependencies.forEach((dependency) => sorter.addEdge(key, dependency)),
  )

  const sortedKeys = [...sorter.sort().keys()]
  return new Map(sortedKeys.map((key) => [key, dependencyStructure[key].dirName]))
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
