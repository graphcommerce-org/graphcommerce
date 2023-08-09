"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommerce6 = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const functions_1 = require("../functions");
const GraphCommerce6 = async (schema) => {
    // ? ENUMERATIONS
    (0, functions_1.migrationAction)(schema, 'enumeration', 'create', {
        displayName: 'Row Links Variants',
        apiId: 'RowLinksVariants',
        values: [
            { displayName: 'Inline', apiId: 'Inline' },
            { displayName: 'Image Label Swiper', apiId: 'ImageLabelSwiper' },
            { displayName: 'Logo Swiper', apiId: 'LogoSwiper' },
            { displayName: 'USPS', apiId: 'Usps' },
        ],
    });
    // ? MODEL
    (0, functions_1.migrationAction)(schema, 'model', 'create', {
        apiId: 'RowLinks',
        apiIdPlural: 'RowLinksMultiple',
        displayName: 'Row Links',
        description: 'Row Links is a Row of PageLinks with different variants',
    });
    (0, functions_1.migrationAction)(schema, 'simpleField', 'create', {
        displayName: 'Identity',
        apiId: 'identity',
        description: 'Only used for internal reference',
        type: management_sdk_1.SimpleFieldType.String,
        isTitle: true,
        isRequired: true,
        isUnique: true,
        modelApiId: 'RowLinks',
    }, 'RowLinks', 'model');
    (0, functions_1.migrationAction)(schema, 'enumerableField', 'create', {
        displayName: 'Variant',
        apiId: 'linksVariant',
        parentApiId: 'RowLinks',
        enumerationApiId: 'RowLinksVariants',
        description: 'Different variants for Row Links',
    }, 'RowLinks', 'model');
    (0, functions_1.migrationAction)(schema, 'simpleField', 'create', {
        displayName: 'Title',
        apiId: 'title',
        type: management_sdk_1.SimpleFieldType.String,
        isRequired: true,
        modelApiId: 'RowLinks',
        isLocalized: true,
    }, 'RowLinks', 'model');
    (0, functions_1.migrationAction)(schema, 'simpleField', 'create', {
        displayName: 'Copy',
        apiId: 'rowLinksCopy',
        type: management_sdk_1.SimpleFieldType.Richtext,
        isLocalized: true,
        modelApiId: 'RowLinks',
    }, 'RowLinks', 'model');
    (0, functions_1.migrationAction)(schema, 'relationalField', 'create', {
        displayName: 'Links',
        apiId: 'pageLinks',
        modelApiId: 'RowLinks',
        type: management_sdk_1.RelationalFieldType.Relation,
        reverseField: {
            apiId: 'rowLinks',
            modelApiId: 'PageLink',
            displayName: 'RowLinks',
            visibility: management_sdk_1.VisibilityTypes.Hidden,
            isList: true,
        },
        visibility: management_sdk_1.VisibilityTypes.ReadWrite,
        isList: true,
    }, 'RowLinks', 'model');
    (0, functions_1.migrationAction)(schema, 'unionField', 'update', {
        apiId: 'content',
        displayName: 'Content',
        modelApiId: 'Page',
        reverseField: {
            modelApiIds: [
                'RowLinks',
                'RowServiceOptions',
                'RowSpecialBanner',
                'RowQuote',
                'RowProduct',
                'RowColumnOne',
                'RowColumnTwo',
                'RowColumnThree',
                'RowHeroBanner',
                'RowBlogContent',
                'RowButtonList',
                'RowContentLinks',
                'RowButtonLinkList',
            ],
            // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
        },
    }, 'Page', 'model');
    (0, functions_1.migrationAction)(schema, 'unionField', 'update', {
        apiId: 'row',
        displayName: 'Row',
        modelApiId: 'DynamicRow',
        reverseField: {
            modelApiIds: [
                'RowLinks',
                'RowServiceOptions',
                'RowSpecialBanner',
                'RowQuote',
                'RowProduct',
                'RowColumnOne',
                'RowColumnTwo',
                'RowColumnThree',
                'RowHeroBanner',
                'RowBlogContent',
                'RowButtonList',
                'RowContentLinks',
                'RowButtonLinkList',
            ],
            // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
        },
        visibility: management_sdk_1.VisibilityTypes.Hidden,
    }, 'DynamicRow', 'model');
    (0, functions_1.migrationAction)(schema, 'unionField', 'update', {
        apiId: 'target',
        displayName: 'Placement target',
        modelApiId: 'DynamicRow',
        reverseField: {
            modelApiIds: [
                'RowLinks',
                'RowServiceOptions',
                'RowSpecialBanner',
                'RowQuote',
                'RowProduct',
                'RowColumnOne',
                'RowColumnTwo',
                'RowColumnThree',
                'RowHeroBanner',
                'RowBlogContent',
                'RowButtonList',
                'RowContentLinks',
                'RowButtonLinkList',
            ],
            // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
        },
        visibility: management_sdk_1.VisibilityTypes.Hidden,
    }, 'DynamicRow', 'model');
    return functions_1.client.run(true);
};
exports.GraphCommerce6 = GraphCommerce6;
