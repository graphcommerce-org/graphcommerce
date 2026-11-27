import fs from 'fs'
import path from 'path'

const debug = process.env.DEBUG === '1'
// eslint-disable-next-line no-console
const log = (message: string) => debug && console.log(`isMonorepo: ${message}`)

type PackageJson = { name?: string; workspaces?: string[] | { packages?: string[] } }

function findPackageJson(directory: string): PackageJson | null {
  try {
    const packageJsonPath = path.join(directory, 'package.json')
    const content = fs.readFileSync(packageJsonPath, 'utf8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

/**
 * Finds the path of the parent @graphcommerce package that has `directory` as a workspace. Returns
 * null if no parent package is found
 */
export function findParentPath(directory: string): string | null {
  let currentDir = directory
  log(`Starting directory: ${currentDir}`)

  // Start from the parent directory
  currentDir = path.dirname(currentDir)
  log(`Looking for parent packages starting from: ${currentDir}`)

  // Keep going up until we find a root package or hit the filesystem root
  while (currentDir !== path.parse(currentDir).root) {
    const packageJson = findPackageJson(currentDir)

    if (packageJson?.name?.startsWith('@graphcommerce/')) {
      log(`Found package ${packageJson.name} in: ${currentDir}`)
      const workspaces = Array.isArray(packageJson.workspaces)
        ? packageJson.workspaces
        : (packageJson.workspaces?.packages ?? [])
      const relative = path.relative(currentDir, directory)

      if (workspaces.some((workspace) => path.matchesGlob(relative, workspace))) {
        log(`Found parent @graphcommerce package at: ${currentDir}`)
        return currentDir
      }
      log(`${relative} is not a workspace of ${packageJson.name}`)
    }

    currentDir = path.dirname(currentDir)
  }

  log('No parent @graphcommerce package found')
  return null
}
