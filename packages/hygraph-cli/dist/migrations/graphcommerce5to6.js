"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphcommerce5to6 = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const migrationActionFactory_1 = require("../migrationActionFactory");
const graphcommerce5to6 = async (schema, client) => {
    const { migrationAction } = (0, migrationActionFactory_1.migrationActionFactory)(schema, client);
    // ? ENUMERATIONS
    migrationAction(schema, 'enumeration', 'create', {
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
    migrationAction(schema, 'model', 'create', {
        apiId: 'RowLinks',
        apiIdPlural: 'RowLinksMultiple',
        displayName: 'Row Links',
        description: 'Row Links is a Row of PageLinks with different variants',
    });
    migrationAction(schema, 'simpleField', 'create', {
        displayName: 'Identity',
        apiId: 'identity',
        description: 'Only used for internal reference',
        type: management_sdk_1.SimpleFieldType.String,
        isTitle: true,
        isRequired: true,
        isUnique: true,
        modelApiId: 'RowLinks',
    }, 'RowLinks', 'model');
    migrationAction(schema, 'enumerableField', 'create', {
        displayName: 'Variant',
        apiId: 'linksVariant',
        parentApiId: 'RowLinks',
        enumerationApiId: 'RowLinksVariants',
        description: 'Different variants for Row Links',
    }, 'RowLinks', 'model');
    migrationAction(schema, 'simpleField', 'create', {
        displayName: 'Title',
        apiId: 'title',
        type: management_sdk_1.SimpleFieldType.String,
        isRequired: true,
        modelApiId: 'RowLinks',
        isLocalized: true,
    }, 'RowLinks', 'model');
    migrationAction(schema, 'simpleField', 'create', {
        displayName: 'Copy',
        apiId: 'rowLinksCopy',
        type: management_sdk_1.SimpleFieldType.Richtext,
        isLocalized: true,
        modelApiId: 'RowLinks',
    }, 'RowLinks', 'model');
    migrationAction(schema, 'relationalField', 'create', {
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
    migrationAction(schema, 'unionField', 'update', {
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
    return client.run(true);
};
exports.graphcommerce5to6 = graphcommerce5to6;
