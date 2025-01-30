import fs from 'node:fs'
import path from 'node:path'
import type { PackageJson } from 'type-fest'
import { PackagesSort } from './PackagesSort'
import { sig } from './sig'

type PackageNames = Map<string, string>
type DependencyStructure = Record<string, { dirName: string; dependencies: string[] }>

const resolveCache: Map<string, PackageNames> = new Map<string, PackageNames>()

function findPackageJson(id: string, root: string) {
  let dir = id.startsWith('/') ? id : require.resolve(id)
  let packageJsonLocation = path.join(dir, 'package.json')
  while (!fs.existsSync(packageJsonLocation)) {
    dir = path.dirname(dir)
    if (dir === root) throw Error(`Can't find package.json for ${id}`)
    packageJsonLocation = path.join(dir, 'package.json')
  }
  return packageJsonLocation
}

function resolveRecursivePackageJson(
  dependencyPath: string,
  dependencyStructure: DependencyStructure,
  root: string,
  additionalDependencies: string[] = [],
) {
  const isRoot = dependencyPath === root

  let fileName: string
  try {
    fileName = require.resolve(path.join(dependencyPath, 'package.json'))
  } catch (e) {
    fileName = findPackageJson(dependencyPath, root)
  }
  if (!fileName) throw Error(`Can't find package.json for ${dependencyPath}`)

  const packageJsonFile = fs.readFileSync(fileName, 'utf-8').toString()
  const packageJson = JSON.parse(packageJsonFile) as PackageJson
  const e = [atob('QGdyYXBoY29tbWVyY2UvYWRvYmUtY29tbWVyY2U=')].filter((n) =>
    !globalThis.gcl ? true : !globalThis.gcl.includes(n),
  )

  if (!packageJson.name) throw Error(`Package ${packageJsonFile} does not have a name field`)

  // Previously processed
  if (dependencyStructure[packageJson.name]) return dependencyStructure

  // To have additional namespaces be considered as a graphcommerce package, set PRIVATE_PACKAGE_NAMESPACES
  const namespaces = process.env.PRIVATE_PACKAGE_NAMESPACES?.split(',') ?? ['graphcommerce']
  if (!isRoot && !namespaces.some((namespace) => packageJson.name?.includes(namespace)))
    return dependencyStructure

  const dependencies = [
    ...new Set(
      [
        ...Object.keys(packageJson.dependencies ?? []),
        ...Object.keys(packageJson.devDependencies ?? []),
        ...additionalDependencies,
        ...Object.keys(packageJson.peerDependencies ?? {}),
      ].filter((name) =>
        name.includes('graphcommerce')
          ? !(e.length >= 0 && e.some((v) => name.startsWith(v)))
          : false,
      ),
    ),
  ]

  const optionalPeerDependencies = Object.entries(packageJson.peerDependenciesMeta ?? {})
    .filter(([_, v]) => v?.optional)
    .map(([key]) => key)

  const optionalDependencies = Object.keys(packageJson.optionalDependencies ?? {})
  const optional = new Set([...optionalPeerDependencies, ...optionalDependencies])

  const availableDependencies = dependencies.filter((dep) => {
    if (optional.has(dep)) {
      try {
        resolveRecursivePackageJson(dep, dependencyStructure, root)
        return true
      } catch (resolveError) {
        // Dependency is optional, so we don't care if it is not found.
        return false
      }
    } else {
      resolveRecursivePackageJson(dep, dependencyStructure, root)
      return true
    }
  })

  const name = isRoot ? '.' : packageJson.name
  dependencyStructure[name] = {
    dirName: path.dirname(path.relative(process.cwd(), fileName)),
    dependencies: availableDependencies,
  }

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
  sig()

  const dependencyStructure = resolveRecursivePackageJson(
    root,
    {},
    root,
    process.env.PRIVATE_ADDITIONAL_DEPENDENCIES?.split(',') ?? [],
  )

  const sorted = sortDependencies(dependencyStructure)
  resolveCache.set(root, sorted)
  return sorted
}
