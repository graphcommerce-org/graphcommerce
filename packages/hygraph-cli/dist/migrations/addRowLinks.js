"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRowLinks = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const client_1 = require("../client");
const addRowLinks = async (name) => {
    const client = (0, client_1.initClient)(name);
    // ? ENUMERATIONS
    client.createEnumeration({
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
    client.createModel({
        apiId: 'RowLinks',
        apiIdPlural: 'RowLinksMultiple',
        displayName: 'Row Links',
        description: 'Row Links is a Row of PageLinks with different variants',
    });
    client.createSimpleField({
        displayName: 'Identity',
        apiId: 'identity',
        description: 'Only used for internal reference',
        type: management_sdk_1.SimpleFieldType.String,
        isTitle: true,
        isRequired: true,
        isUnique: true,
        modelApiId: 'RowLinks',
    });
    client.createEnumerableField({
        displayName: 'Variant',
        apiId: 'linksVariant',
        parentApiId: 'RowLinks',
        enumerationApiId: 'RowLinksVariants',
        description: 'Different variants for Row Links',
    });
    client.createSimpleField({
        displayName: 'Title',
        apiId: 'title',
        type: management_sdk_1.SimpleFieldType.String,
        isRequired: true,
        modelApiId: 'RowLinks',
        isLocalized: true,
    });
    client.createSimpleField({
        displayName: 'Copy',
        apiId: 'rowLinksCopy',
        type: management_sdk_1.SimpleFieldType.Richtext,
        isLocalized: true,
        modelApiId: 'RowLinks',
    });
    client.createRelationalField({
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
    });
    client.updateUnionField({
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
    });
    client.updateUnionField({
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
    });
    client.updateUnionField({
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
    });
    return client.run(true);
};
exports.addRowLinks = addRowLinks;
