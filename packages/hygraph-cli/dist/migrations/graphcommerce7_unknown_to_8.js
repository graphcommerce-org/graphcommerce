"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce7_unknown_to_8 = void 0;
const migrationAction_1 = require("../migrationAction");
const graphcommerce7_unknown_to_8 = async (schema) => {
    if (!migrationAction_1.client) {
        return 0;
    }
    // This migration is for GC 8.0 and is not yet exported as a usable migration.
    // Removes the deprecated 'Row' field which was deprecated in GC@7.1
    const hasRow = schema.models
        .find((m) => m.apiId === 'DynamicRow')
        ?.fields.some((f) => f.apiId === 'row');
    if (hasRow) {
        (0, migrationAction_1.migrationAction)(schema, 'simpleField', 'delete', {
            apiId: 'row',
            parentApiId: 'DynamicRow',
        });
    }
    return migrationAction_1.client.run(true);
};
exports.graphcommerce7_unknown_to_8 = graphcommerce7_unknown_to_8;
