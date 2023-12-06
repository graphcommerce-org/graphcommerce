"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce7to7_1 = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const migrationAction_1 = require("../migrationAction");
const graphcommerce7to7_1 = async (schema) => {
    if (!migrationAction_1.client) {
        return 0;
    }
    /**
     * Running this migration will cause a loss in entries for the 'row' field in the DynamicRow model.
     * The field is replaced by Rows. Row will be deprecated so Graphcommerce 7.0 will still keep running.
     **/
    const hasRow = schema.models
        .find((m) => m.apiId === 'DynamicRow')
        ?.fields.some((f) => f.apiId === 'row');
    if (hasRow) {
        (0, migrationAction_1.migrationAction)(schema, 'simpleField', 'delete', {
            apiId: 'row',
            parentApiId: 'DynamicRow',
        });
        (0, migrationAction_1.migrationAction)(schema, 'unionField', 'create', {
            apiId: 'row',
            displayName: 'Row Deprecated',
            parentApiId: 'DynamicRow',
            description: 'This field is deprecated. Use Rows instead.',
            visibility: management_sdk_1.VisibilityTypes.Hidden,
            reverseField: {
                modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
                apiId: 'dynamicRowDeprecated',
                displayName: 'DynamicRows Deprecated',
                description: 'This field is deprecated. Use Dynamic Rows instead.',
                visibility: management_sdk_1.VisibilityTypes.Hidden,
                isList: true,
            },
        });
    }
    (0, migrationAction_1.migrationAction)(schema, 'unionField', 'create', {
        displayName: 'Rows',
        apiId: 'rows',
        isList: true,
        reverseField: {
            modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
            apiId: 'dynamicRow',
            displayName: 'Dynamic Rows',
            visibility: management_sdk_1.VisibilityTypes.Hidden,
            isList: true,
        },
        parentApiId: 'DynamicRow',
    }, 'DynamicRow', 'model');
    return migrationAction_1.client.run(true);
};
exports.graphcommerce7to7_1 = graphcommerce7to7_1;
