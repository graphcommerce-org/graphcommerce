import fs from 'node:fs'
import path from 'node:path'

const debug = process.env.DEBUG === '1'
// eslint-disable-next-line no-console
const log = (message: string) => debug && console.log(`is-monorepo: ${message}`)

function findPackageJson(directory: string): { name: string } | null {
  try {
    const packageJsonPath = path.join(directory, 'package.json')
    const content = fs.readFileSync(packageJsonPath, 'utf8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

export function isMonorepo() {
  let currentDir = process.cwd()
  log(`Starting directory: ${currentDir}`)

  // Keep going up until we find a root package or hit the filesystem root
  while (currentDir !== path.parse(currentDir).root) {
    const packageJson = findPackageJson(currentDir)
    if (packageJson) {
      log(`Found package.json in: ${currentDir}`)
      log(`Package name: ${packageJson.name}`)

      // If we find a root package, we're in a monorepo
      if (
        packageJson.name === '@graphcommerce/private' ||
        packageJson.name === '@graphcommerce/graphcommerce'
      ) {
        log('isMonorepo result: true')
        return true
      }
    }

    // Go up one directory
    currentDir = path.dirname(currentDir)
  }

  log('isMonorepo result: false')
  return false
}
