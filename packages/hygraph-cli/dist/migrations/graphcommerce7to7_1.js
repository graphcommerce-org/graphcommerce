"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce7to7_1 = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const migrationAction_1 = require("../migrationAction");
const graphcommerce7to7_1 = async (schema) => {
    if (!migrationAction_1.client) {
        return 0;
    }
    // const schema.models.some((m) => m.fields.some((f) => f.apiId === 'row'))
    const hasRow = schema.models
        .find((m) => m.apiId === 'DynamicRow')
        ?.fields.some((f) => f.apiId === 'row');
    if (hasRow) {
        (0, migrationAction_1.migrationAction)(schema, 'simpleField', 'delete', {
            apiId: 'row',
            parentApiId: 'DynamicRow',
        });
    }
    (0, migrationAction_1.migrationAction)(schema, 'unionField', 'create', {
        displayName: 'Rows',
        apiId: 'rows',
        isList: true,
        reverseField: {
            modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
            apiId: 'dynamicRow',
            displayName: 'DynamicRows',
            visibility: management_sdk_1.VisibilityTypes.Hidden,
            isList: true,
        },
        parentApiId: 'DynamicRow',
    }, 'DynamicRow', 'model');
    return migrationAction_1.client.run(true);
};
exports.graphcommerce7to7_1 = graphcommerce7to7_1;
