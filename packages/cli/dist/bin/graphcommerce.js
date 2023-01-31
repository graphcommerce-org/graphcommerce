#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateConfig_1 = require("./commands/generateConfig");
const args = process.argv.slice(2);
if (args[0] === 'generateConfig') {
    (0, generateConfig_1.generateConfig)().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
