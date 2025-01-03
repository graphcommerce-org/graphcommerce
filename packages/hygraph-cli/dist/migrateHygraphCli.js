"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHygraphCli = migrateHygraphCli;
const fs_1 = __importDefault(require("fs"));
const next_config_1 = require("@graphcommerce/next-config");
const dotenv_1 = __importDefault(require("dotenv"));
const prompts_1 = __importDefault(require("prompts"));
const migrations_1 = require("./migrations");
const readSchema_1 = require("./readSchema");
const UpsertClient_1 = require("./UpsertClient");
const getConfig_1 = require("./utils/getConfig");
const getEndpointUrl_1 = require("./utils/getEndpointUrl");
const getManagementClient_1 = require("./utils/getManagementClient");
const graphCommerceLog_1 = require("./utils/graphCommerceLog");
dotenv_1.default.config();
async function migrateHygraphCli() {
    const hygraphConfig = (0, getConfig_1.getConfig)((0, next_config_1.loadConfig)(process.cwd()));
    /**
     * Extracting the current GC version. Are we gonna use the current version to determine which
     * scripts should be runned? Or do we let the user pick the migration from a list? 🤔
     */
    const packageJson = fs_1.default.readFileSync('package.json', 'utf8');
    const packageData = JSON.parse(packageJson);
    const graphcommerceVersion = packageData.dependencies['@graphcommerce/next-ui'];
    (0, graphCommerceLog_1.graphcommerceLog)(`Graphcommerce version: ${graphcommerceVersion}`, 'info');
    const mangementClient = (0, getManagementClient_1.getManagementClient)(hygraphConfig);
    // Extract the currently existing models, components and enumerations from the Hygraph schema.
    const schemaViewer = await (0, readSchema_1.readSchema)(mangementClient, hygraphConfig.projectId);
    const schema = schemaViewer.viewer.project.environment.contentModel;
    // A list of possible migrations
    const possibleMigrations = Object.entries(migrations_1.availableMigrations);
    // Here we setup the list we ask the user to choose from
    const selectMigrationInput = {
        type: 'select',
        name: 'selectedMigration',
        message: '\x1b[36m\x1b[1m[]: Select migration',
        choices: possibleMigrations.map(([name, migration]) => ({
            title: name,
            value: { name, migration },
        })),
    };
    // Here we ask the user to choose a migration from a list of possible migrations
    try {
        (0, graphCommerceLog_1.graphcommerceLog)('Available migrations: ', 'info');
        const selectMigrationOutput = await (0, prompts_1.default)(selectMigrationInput);
        let { migration, name } = selectMigrationOutput.selectedMigration;
        (0, graphCommerceLog_1.graphcommerceLog)(`You have selected the ${selectMigrationOutput.selectedMigration.name} migration`, 'info');
        try {
            const { endpoint, migrations } = await (0, getEndpointUrl_1.getEnvironment)(mangementClient, hygraphConfig);
            const migrationExists = migrations.find((m) => m.name?.startsWith(name) && m.status === 'SUCCESS');
            if (migrationExists) {
                if (!process.argv.includes('--force')) {
                    (0, graphCommerceLog_1.graphcommerceLog)(`Migration ${name} as ${migrationExists.name} already exists in Hygraph with the status SUCCESS. To rerun this migration use the --force option. Exiting now..`, 'info');
                    process.exit(1);
                }
                else {
                    (0, graphCommerceLog_1.graphcommerceLog)(`Migration ${name} as ${migrationExists.name} already exists in Hygraph with the status SUCCESS. Using --force, rerunning migration..`, 'warning');
                }
                name = `${name}-${Date.now()}`;
            }
            // Here we try to run the migration
            const result = await migration(schema, new UpsertClient_1.UpsertClient({ authToken: hygraphConfig.authToken, endpoint, name }, schema));
            (0, graphCommerceLog_1.graphcommerceLog)(`Migration result: ${JSON.stringify(result)}`, 'info');
            if (!result) {
                (0, graphCommerceLog_1.graphcommerceLog)('No migration client found. Please make sure your GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file is correct.');
                process.exit(1);
            }
            if (result.status !== 'SUCCESS') {
                (0, graphCommerceLog_1.graphcommerceLog)(`Migration not successful: ${result.status} ${name}:\n${result.errors}`);
                process.exit(1);
            }
            (0, graphCommerceLog_1.graphcommerceLog)(`Migration successful: ${name}`, 'info');
        }
        catch (err) {
            if (err instanceof Error) {
                const garbledErrorIndex = err.message.indexOf(': {"');
                const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message;
                (0, graphCommerceLog_1.graphcommerceLog)(`${msg}`, 'error');
            }
        }
    }
    catch (error) {
        (0, graphCommerceLog_1.graphcommerceLog)(`An error occurred: ${error}`, 'error');
    }
}
