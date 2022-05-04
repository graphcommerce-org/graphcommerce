#!/usr/bin/env node

import { runCli, cliError } from '@graphql-codegen/cli'

const [, , cmd] = process.argv

// console.log(process.argv)

runCli(cmd)
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    cliError(error)
  })
