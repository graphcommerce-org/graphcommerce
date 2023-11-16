#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const commands = {
    'codegen-config': () => Promise.resolve().then(() => __importStar(require('@graphcommerce/next-config'))).then((m) => m.generateConfig),
    'export-config': () => Promise.resolve().then(() => __importStar(require('@graphcommerce/next-config'))).then((m) => m.exportConfig),
    'hygraph-migrate': () => Promise.resolve().then(() => __importStar(require('@graphcommerce/hygraph-cli'))).then((m) => m.migrateHygraph),
};
const args = process.argv.slice(2);
const command = args[0];
if (!(command in commands)) {
    console.error(`Unknown command: ${args.join(' ')}, possible commands: ${Object.keys(commands).join(', ')}`);
    process.exit(1);
}
commands[command]()
    .then((c) => c())
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
