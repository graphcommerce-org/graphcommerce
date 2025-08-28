import fs from 'node:fs'
import path from 'node:path'

const debug = process.env.DEBUG === '1'
// eslint-disable-next-line no-console
const log = (message: string) => debug && console.log(`isMonorepo: ${message}`)

function findPackageJson(directory: string): { name: string } | null {
  try {
    const packageJsonPath = path.join(directory, 'package.json')
    const content = fs.readFileSync(packageJsonPath, 'utf8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

/**
 * Finds the path of the parent @graphcommerce package if it exists Returns null if no parent
 * package is found
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

    if (packageJson) {
      log(`Found package.json in: ${currentDir}`)
      log(`Package name: ${packageJson.name}`)

      if (packageJson.name.startsWith('@graphcommerce/')) {
        log(`Found parent @graphcommerce package at: ${currentDir}`)
        return currentDir
      }
    }

    currentDir = path.dirname(currentDir)
  }

  log('No parent @graphcommerce package found')
  return null
}
