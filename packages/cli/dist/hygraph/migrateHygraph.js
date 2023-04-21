"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHygraph = void 0;
const dynamicRow_1 = require("./migrations/dynamicRow");
async function migrateHygraph() {
    const forceRun = true;
    const possibleMigrations = [
        ['migrationDynamicRows_fake2', dynamicRow_1.dynamicRow],
    ];
    for (const [name, migration] of possibleMigrations) {
        try {
            // eslint-disable-next-line no-await-in-loop
            const result = await migration(forceRun ? undefined : name);
            console.log(result);
            if (result.status !== 'SUCCESS') {
                throw new Error(`Migration not successful: ${result.status} ${name}:\n${result.errors}`);
            }
            console.log(`Migration successful: ${name}`);
        }
        catch (err) {
            if (err instanceof Error) {
                const garbledErrorIndex = err.message.indexOf(': {"');
                const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message;
                console.error(msg);
            }
        }
    }
}
exports.migrateHygraph = migrateHygraph;
