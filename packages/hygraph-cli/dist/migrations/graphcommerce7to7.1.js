"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce7to7_1 = void 0;
const migrationAction_1 = require("../migrationAction");
const graphcommerce7to7_1 = async (schema) => {
    if (!migrationAction_1.client) {
        return 0;
    }
    (0, migrationAction_1.migrationAction)(schema, 'enumeration', 'update', {
        apiId: 'RowProductVariants',
        valuesToCreate: [{ apiId: 'Recent', displayName: 'Recent' }],
    });
    return migrationAction_1.client.run(true);
};
exports.graphcommerce7to7_1 = graphcommerce7to7_1;
