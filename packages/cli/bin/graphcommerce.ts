#!/usr/bin/env node

import { generateConfig } from './commands/generateConfig'

const args = process.argv.slice(2)
if (args[0] === 'generateConfig') {
  generateConfig().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
