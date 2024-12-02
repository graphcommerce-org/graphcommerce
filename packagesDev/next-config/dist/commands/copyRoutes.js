"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
// ... earlier code remains the same ...
try {
    targetContent = await promises_1.default.readFile(targetPath);
}
catch (err) {
    if (err.code !== 'ENOENT')
        throw err;
    // File doesn't exist, log that we're creating it
    console.log(`Creating new file: ${file}`);
}
// Skip if content is identical
if (targetContent && Buffer.compare(sourceContent, targetContent) === 0)
    return;
// ... rest of the code remains the same ...
