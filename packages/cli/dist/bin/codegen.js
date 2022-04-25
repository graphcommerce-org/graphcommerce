#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = require("@graphql-codegen/cli");
var _a = process.argv, cmd = _a[2];
// console.log(process.argv)
(0, cli_1.runCli)(cmd)
    .then(function () {
    process.exit(0);
})
    .catch(function (error) {
    (0, cli_1.cliError)(error);
});
