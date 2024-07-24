"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce8to9 = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const migrationActionFactory_1 = require("../migrationActionFactory");
const graphcommerce8to9 = async (schema, client) => {
    const { migrationAction } = (0, migrationActionFactory_1.migrationActionFactory)(schema, client);
    // Removes the deprecated 'Row' field which was deprecated in GC@7.1
    // const hasRow = schema.models
    //   .find((m) => m.apiId === 'DynamicRow')
    //   ?.fields.some((f) => f.apiId === 'row')
    // if (hasRow) {
    //   migrationAction(schema, 'simpleField', 'delete', {
    //     apiId: 'row',
    //     parentApiId: 'DynamicRow',
    //   })
    // }
    const hasRowCategory = schema.models.some((m) => m.apiId === 'RowCategory');
    //
    if (!hasRowCategory) {
        migrationAction(schema, 'model', 'create', {
            apiId: 'RowCategory',
            displayName: 'Row Category',
            apiIdPlural: 'RowProductLists',
            description: 'A model that displays a category',
        });
        migrationAction(schema, 'simpleField', 'create', {
            position: 1,
            type: management_sdk_1.SimpleFieldType.String,
            formConfig: { renderer: 'GCMS_SLUG', config: { isLowercase: true } },
            validations: {
                String: {
                    matches: {
                        regex: '^[a-z0-9]+(?:[-/][a-z0-9]+)*$',
                        errorMessage: 'The category URL must be a valid slug',
                    },
                },
            },
            parentApiId: 'RowCategory',
            displayName: 'Category URL',
            apiId: 'categoryUrl',
            description: 'The URL of the category, may include slashes',
            isTitle: true,
            isLocalized: true,
            isRequired: true,
            visibility: management_sdk_1.VisibilityTypes.ReadWrite,
        }, 'RowCategory', 'model');
        migrationAction(schema, 'enumeration', 'create', {
            displayName: 'Row Category Variant',
            apiId: 'RowCategoryVariant',
            values: [
                { displayName: 'Backstory', apiId: 'Backstory' },
                { displayName: 'Grid', apiId: 'Grid' },
                { displayName: 'Equal to', apiId: 'EQUAL' },
            ],
        });
        migrationAction(schema, 'enumerableField', 'create', {
            displayName: 'Variant',
            apiId: 'variant',
            parentApiId: 'RowCategory',
            enumerationApiId: 'RowCategoryVariant',
            description: 'As what variant wil the RowCategory be displayed',
            isRequired: true,
        }, 'RowCategory', 'model');
    }
    return client.run(true);
};
exports.graphcommerce8to9 = graphcommerce8to9;
