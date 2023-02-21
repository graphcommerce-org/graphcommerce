#!/usr/bin/env node

import { generateConfig } from '@graphcommerce/next-config'

const commands = {
  'codegen-config': generateConfig,
}

const args = process.argv.slice(2)
const command = args[0] as keyof typeof commands

if (!commands[command]) {
  console.error(
    `Unknown command: ${args.join(' ')}, possible commands: ${Object.keys(commands).join(', ')}`,
  )
  process.exit(1)
}

commands[command]().catch((e) => {
  console.error(e)
  process.exit(1)
})
