#!/usr/bin/env node

import { runCli, cliError } from '@graphql-codegen/cli'

const [, , cmd] = process.argv

// console.log(process.argv)

runCli(cmd)
  .then((result) => {
    process.exit(result)
  })
  .catch((error) => {
    cliError(error)
  })
