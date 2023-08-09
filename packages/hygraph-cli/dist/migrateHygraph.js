"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHygraph = void 0;
const fs_1 = __importDefault(require("fs"));
const next_config_1 = require("@graphcommerce/next-config");
const dotenv_1 = __importDefault(require("dotenv"));
const prompts_1 = __importDefault(require("prompts"));
const functions_1 = require("./functions");
const migrations_1 = require("./migrations");
const readSchema_1 = require("./readSchema");
dotenv_1.default.config();
async function migrateHygraph() {
    const config = (0, next_config_1.loadConfig)(process.cwd());
    /**
     * Extracting the current GC version. Are we gonna use the current version to determine which
     * scripts should be runned? Or do we let the user pick the migration from a list? 🤔
     */
    const packageJson = fs_1.default.readFileSync('package.json', 'utf8');
    const packageData = JSON.parse(packageJson);
    const graphcommerceVersion = packageData.dependencies['@graphcommerce/next-ui'];
    (0, functions_1.graphcommerceLog)(`Graphcommerce version: ${graphcommerceVersion}`, 'info');
    // Extract the currently existing models, components and enumerations from the Hygraph schema.
    const schemaViewer = await (0, readSchema_1.readSchema)(config);
    const schema = schemaViewer.viewer.project.environment.contentModel;
    // A list of possible migrations
    const possibleMigrations = [
        ['Upgrade to GraphCommerce 6', migrations_1.GraphCommerce6],
        ['Upgrade to Graphcommerce 6.2', migrations_1.dynamicRow],
    ];
    // Here we setup the list we ask the user to choose from
    const selectMigrationInput = {
        type: 'select',
        name: 'selectedMigration',
        message: '\x1b[36m\x1b[1m[GraphCommerce]: Select migration',
        choices: [],
    };
    for (const [name, migration] of possibleMigrations) {
        if (Array.isArray(selectMigrationInput.choices)) {
            selectMigrationInput?.choices?.push({ title: name, value: { name, migration } });
        }
    }
    // Here we ask the user to choose a migration from a list of possible migrations
    try {
        (0, functions_1.graphcommerceLog)('Available migrations: ', 'info');
        const selectMigrationOutput = await (0, prompts_1.default)(selectMigrationInput);
        const { migration, name } = selectMigrationOutput.selectedMigration;
        (0, functions_1.graphcommerceLog)(`You have selected the ${selectMigrationOutput.selectedMigration.name} migration`, 'info');
        try {
            // Here we try to run the migration
            // eslint-disable-next-line no-await-in-loop
            const result = await migration(schema);
            (0, functions_1.graphcommerceLog)(`Migration result: ${JSON.stringify(result)}`, 'info');
            if (result.status !== 'SUCCESS') {
                throw new Error(`[GraphCommerce]: Migration not successful: ${result.status} ${name}:\n${result.errors}`);
            }
            (0, functions_1.graphcommerceLog)(`Migration successful: ${name}`, 'info');
        }
        catch (err) {
            if (err instanceof Error) {
                const garbledErrorIndex = err.message.indexOf(': {"');
                const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message;
                (0, functions_1.graphcommerceLog)(`${msg}`, 'error');
            }
        }
    }
    catch (error) {
        (0, functions_1.graphcommerceLog)(`[GraphCommerce]: An error occurred: ${error}`, 'error');
    }
}
exports.migrateHygraph = migrateHygraph;
