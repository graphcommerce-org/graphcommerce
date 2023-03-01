#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const next_config_1 = require("@graphcommerce/next-config");
const commands = {
    'codegen-config': next_config_1.generateConfig,
    'export-config': next_config_1.exportConfig,
};
const args = process.argv.slice(2);
const command = args[0];
if (!commands[command]) {
    console.error(`Unknown command: ${args.join(' ')}, possible commands: ${Object.keys(commands).join(', ')}`);
    process.exit(1);
}
commands[command]().catch((e) => {
    console.error(e);
    process.exit(1);
});
