#!/usr/bin/env node

import { generateConfig, exportConfig } from '@graphcommerce/next-config'
import { migrateHygraph } from '../hygraph/migrateHygraph'

const commands = {
  'codegen-config': generateConfig,
  'export-config': exportConfig,
  'hygraph-migrate': migrateHygraph,
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
