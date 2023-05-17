"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHygraph = void 0;
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs_1 = __importDefault(require("fs"));
const next_config_1 = require("@graphcommerce/next-config");
const dotenv_1 = __importDefault(require("dotenv"));
const prompts_1 = __importDefault(require("prompts"));
const migrations_1 = require("./migrations");
const readSchema_1 = require("./readSchema");
dotenv_1.default.config();
async function migrateHygraph() {
    const config = (0, next_config_1.loadConfig)(process.cwd());
    // Read out the Graphcommerce version
    const packageJson = fs_1.default.readFileSync('package.json', 'utf8');
    const packageData = JSON.parse(packageJson);
    const graphcommerceVersion = packageData.dependencies['@graphcommerce/next-ui'];
    // Extract the minor version
    const versionParts = graphcommerceVersion.split('.');
    const graphcommerceMinorVersion = `${versionParts[0]}.${versionParts[1]}`;
    console.log('Graphcommerce version:', graphcommerceVersion);
    console.log('Graphcommerce minor version:', graphcommerceMinorVersion);
    // Force run will run the migration even if it has already been run before
    const forceRun = true;
    // Read the existing models, components and enumerations from the schema
    // TODO: Read the existing unions from the schema
    const schema = await (0, readSchema_1.readSchema)(config);
    const { models, components, enumerations } = schema.viewer.project.environment.contentModel;
    console.log(10, models);
    console.log(20, components);
    console.log(30, enumerations);
    // A list of possible migrations
    const possibleMigrations = [
        ['Dynamic Rows', migrations_1.dynamicRow],
        ['Upgrade to GraphCommerce 6', migrations_1.GraphCommerce6],
        ['Remove RowColumnOne', migrations_1.removeRowColumnOne],
        ['Remove RowColumnTwo', migrations_1.removeRowColumnTwo],
        ['Remove RowColumnThree', migrations_1.removeRowColumnThree],
        ['Remove RowLinks', migrations_1.removeRowLinks],
    ];
    console.log('\x1b[1m%s\x1b[0m', '[GraphCommerce]: Available migrations: ');
    // Here we setup the list we ask the user to choose from
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
    // Here we ask the user to choose a migration from a list of possible migrations
    try {
        const response = await (0, prompts_1.default)(question);
        const { migration, name } = response.selectedMigration;
        console.log(`You have selected the ${response.selectedMigration.name} migration`);
        try {
            // Here we try to run the migration
            // eslint-disable-next-line no-await-in-loop
            const result = await migration(config, forceRun ? undefined : name);
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
/**
 * TODO: GC-Version based migration
 *
 * What we want is to enter a GC version. And based on this version we want to run migrations. So
 * one gives the old GC version and the desired one, and the CLI calculates which model updates are
 * necessary.
 *
 * 1. Read out the current model => //? This can be done with the Management API viewer prop | DONE
 * 2. Read out the current GC version | DONE
 * 3. Read out the desired GC version
 * 4. Design a model per minor version of Graphcommerce e.g. 2.4.x, 2.5.x, 2.6.x
 * 5. Calculate the necessary migrations
 * 6. Run the migrations, no errors should occur
 */
