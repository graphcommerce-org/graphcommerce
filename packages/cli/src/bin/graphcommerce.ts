#!/usr/bin/env node

const commands = {
  'codegen-config': () => import('@graphcommerce/next-config').then((m) => m.generateConfig),
  'export-config': () => import('@graphcommerce/next-config').then((m) => m.exportConfig),
  'hygraph-migrate': () => import('@graphcommerce/hygraph-cli').then((m) => m.migrateHygraph),
}

const args = process.argv.slice(2)
const command = args[0] as keyof typeof commands

if (!(command in commands)) {
  console.error(
    `Unknown command: ${args.join(' ')}, possible commands: ${Object.keys(commands).join(', ')}`,
  )
  process.exit(1)
}

commands[command]()
  .then((c) => c())
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
