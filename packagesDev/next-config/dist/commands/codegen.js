"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegen = codegen;
const generateConfig_1 = require("../config/commands/generateConfig");
const codegenInterceptors_1 = require("../interceptors/commands/codegenInterceptors");
const copyFiles_1 = require("./copyFiles");
/** Run all code generation steps in sequence */
async function codegen() {
    // Copy files from packages to project
    console.log('🔄 Copying files from packages to project...');
    await (0, copyFiles_1.copyFiles)();
    // Generate GraphCommerce config types
    console.log('⚙️  Generating GraphCommerce config types...');
    await (0, generateConfig_1.generateConfig)();
    // Generate interceptors
    console.log('🔌 Generating interceptors...');
    await (0, codegenInterceptors_1.codegenInterceptors)();
}
