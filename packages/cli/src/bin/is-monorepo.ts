#!/usr/bin/env node
import type { ChildProcess } from 'node:child_process'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { isMonorepo } from '@graphcommerce/next-config'
import { detect } from 'detect-package-manager'

const debug = process.env.DEBUG === '1'
// eslint-disable-next-line no-console
const log = (message: string) => debug && console.log(`is-monorepo: ${message}`)
const logError = (message: string) => console.error(`is-monorepo: ${message}`)

function findRootDir(startDir: string): string | null {
  let currentDir = startDir

  while (currentDir !== path.parse(currentDir).root) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, 'package.json'), 'utf8'))
      if (
        packageJson.name === '@graphcommerce/graphcommerce' ||
        packageJson.name === '@graphcommerce/private'
      ) {
        log(`Found root directory at: ${currentDir}`)
        return currentDir
      }
    } catch {
      // Continue if package.json doesn't exist or can't be parsed
    }
    currentDir = path.dirname(currentDir)
  }

  return null
}

/**
 * Executes a command depending if we're running in a monorepo or not. Usage: is-monorepo '[pkgrun]
 * run my-script' '[pkgrun] run my-other-script'
 *
 * The [pkgrun] placeholder will be replaced with the detected package manager:
 *
 * - Yarn -> 'yarn'
 * - Npm -> 'npm run'
 */
async function main() {
  const isMono = isMonorepo()
  log(`Running in monorepo: ${isMono}`)
  log(`Arguments: ${process.argv.slice(2).join(' ')}`)

  const command = isMono ? process.argv.slice(2)[1] : process.argv.slice(2)[0]
  if (!command) {
    logError('No command provided')
    process.exit(1)
  }

  let packageManager = 'yarn'
  try {
    packageManager = await detect({ cwd: '.' })
  } catch {
    log('Could not detect package manager, defaulting to yarn')
  }

  const commandArray = command
    .split(' ')
    .map((arg) =>
      arg.replace('[pkgrun]', `${packageManager}${packageManager === 'npm' ? ' run' : ''}`),
    )
  log(`Command: ${commandArray.join(' ')}`)

  const currentDir = process.cwd()
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, 'package.json'), 'utf8'))
    log(`Current package: ${packageJson.name}`)

    if (
      isMono &&
      packageJson.name !== '@graphcommerce/private' &&
      packageJson.name !== '@graphcommerce/graphcommerce'
    ) {
      const rootDir = findRootDir(currentDir)
      if (rootDir && rootDir !== currentDir) {
        const relativePathToRoot = path.relative(currentDir, rootDir)
        log(`Adding cd ${relativePathToRoot}`)
        commandArray.unshift('cd', relativePathToRoot, '&&')
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      log(`Error reading package.json: ${e.message}`)
    }
  }

  const finalCommand = commandArray.join(' ')
  log(`Executing: ${finalCommand}`)

  const childProcess: ChildProcess = spawn(finalCommand, [], { shell: true, stdio: 'inherit' })

  childProcess.on('exit', (code) => {
    process.exit(code ?? 0)
  })
}

main().catch((err: unknown) => {
  if (err instanceof Error) {
    logError(err.message)
  } else {
    logError('An unknown error occurred')
  }
  process.exit(1)
})
