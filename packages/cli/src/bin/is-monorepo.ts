#!/usr/bin/env node

import type { ChildProcess } from 'node:child_process'
import { spawn } from 'node:child_process'
import { isMonorepo } from '@graphcommerce/next-config'
import { detect } from 'detect-package-manager'

/**
 * Executes a command dependening if we're running in a monorepo or not Usage:
 *
 *     is-monorepo '[pkgrun] run my-script' '[pkgrun] run my-other-script'
 *
 * We're using the `[pkgrun]` placeholder to replace it with the package manager we're using. For
 * example, if we're using `yarn` it will replace `[pkgrun]` with `yarn`. If we're using `npm` it
 * will replace `[pkgrun]` with `npm run`.
 */
async function main() {
  const isMono = isMonorepo()
  const command = isMono ? process.argv.slice(2)[0] : process.argv.slice(2)[1]

  let packageManager = 'yarn'
  try {
    packageManager = await detect({ cwd: isMono ? '../..' : '.' })
  } catch {
    console.error('Could not detect package manager, defaulting to yarn')
  }

  const commandArray = command
    .split(' ')
    .map((arg) => arg.replace('[pkgrun]', `${packageManager} run`))

  if (isMono) commandArray.unshift('cd', '../..', '&&')

  const [cmd, ...args] = commandArray
  const childProcess: ChildProcess = spawn(cmd, args, { shell: true, stdio: 'inherit' })

  childProcess.on('exit', (code) => {
    process.exit(code ?? 0)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
