"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHygraph = void 0;
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const readline_1 = __importDefault(require("readline"));
const prompts_1 = __importDefault(require("prompts"));
const migrations_1 = require("./migrations");
async function migrateHygraph() {
    let forceRun = false;
    // Interface to determine if force run should be enabled
    readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const affirmativeAnswers = ['y', 'yes', 'Y', 'YES'];
    const handleKeypress = (key) => {
        if (affirmativeAnswers.includes(key.toLowerCase())) {
            console.log('\nForce run enabled');
            forceRun = true;
        }
        else {
            console.log('\nForce run disabled');
            forceRun = false;
        }
        process.stdin.pause();
    };
    // Listen for keypress events
    process.stdin.on('keypress', handleKeypress);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    console.log('Enable force run? (y/n)');
    // Wait for input
    await new Promise((resolve) => {
        process.stdin.once('data', () => {
            // Stop listening for input
            process.stdin.removeListener('keypress', handleKeypress);
            process.stdin.setRawMode(false);
            resolve();
        });
    });
    const possibleMigrations = [
        ['add_dynamic_rows', migrations_1.dynamicRow],
        ['GraphCommerce6', migrations_1.GraphCommerce6],
    ];
    console.log('\x1b[1m%s\x1b[0m', '[GraphCommerce]: Available migrations: ');
    const question = {
        type: 'select',
        name: 'selectedMigration',
        message: '[GraphCommerce]: Select migration',
        choices: [],
    };
    for (const [name, migration] of possibleMigrations) {
        if (Array.isArray(question.choices)) {
            question?.choices?.push({ title: name, value: { name, migration } });
        }
    }
    // TODO: GC-Version based migration
    /** Here we choose a migration from a list of possible migrations */
    try {
        const response = await (0, prompts_1.default)(question);
        const { migration, name } = response.selectedMigration;
        console.log(`You have selected the ${response.selectedMigration.name} migration`);
        try {
            // eslint-disable-next-line no-await-in-loop
            const result = await migration(forceRun ? undefined : name);
            console.log(result);
            if (result.status !== 'SUCCESS') {
                throw new Error(`[GraphCommerce]: Migration not successful: ${result.status} ${name}:\n${result.errors}`);
            }
            console.log(`Migration successful: ${name}`);
        }
        catch (err) {
            if (err instanceof Error) {
                const garbledErrorIndex = err.message.indexOf(': {"');
                const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message;
                console.error('\x1b[31m\x1b[1m%s\x1b[0m', `[GraphCommerce]: ${msg}`);
            }
        }
    }
    catch (error) {
        console.error('\x1b[31m\x1b[1m%s\x1b[0m', '[GraphCommerce]: An error occurred:', error);
    }
}
exports.migrateHygraph = migrateHygraph;
