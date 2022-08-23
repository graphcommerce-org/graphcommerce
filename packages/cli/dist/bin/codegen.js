#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@graphql-codegen/cli");
const [, , cmd] = process.argv;
// console.log(process.argv)
(0, cli_1.runCli)(cmd)
    .then((result) => {
    process.exit(result);
})
    .catch((error) => {
    (0, cli_1.cliError)(error);
});
