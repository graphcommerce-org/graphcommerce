"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce7to8 = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const migrationActionFactory_1 = require("../migrationActionFactory");
const graphcommerce7to8 = async (schema, client) => {
    const { migrationAction } = (0, migrationActionFactory_1.migrationActionFactory)(schema, client);
    const hasRow = schema.models
        .find((m) => m.apiId === 'DynamicRow')
        ?.fields.some((f) => f.apiId === 'row');
    if (hasRow) {
        migrationAction(schema, 'unionField', 'update', {
            apiId: 'row',
            displayName: 'Row Deprecated',
            parentApiId: 'DynamicRow',
            description: 'This field is deprecated. Use Rows instead.',
        });
    }
    migrationAction(schema, 'unionField', 'create', {
        displayName: 'Rows',
        apiId: 'rows',
        isList: true,
        reverseField: {
            modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
            apiId: 'dynamicRows',
            displayName: 'Dynamic Rows',
            visibility: management_sdk_1.VisibilityTypes.Hidden,
            isList: true,
        },
        parentApiId: 'DynamicRow',
    }, 'DynamicRow', 'model');
    migrationAction(schema, 'componentUnionField', 'create', {
        displayName: 'Conditions',
        apiId: 'conditions',
        parentApiId: 'ConditionOr',
        componentApiIds: ['ConditionText', 'ConditionNumber'],
        isList: true,
    }, 'ConditionOr', 'component');
    return client.run(true);
};
exports.graphcommerce7to8 = graphcommerce7to8;
