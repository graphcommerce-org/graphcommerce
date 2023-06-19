"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommerce6 = void 0;
const functions_1 = require("../functions");
const client_1 = require("../client");
const GraphCommerce6 = async (name, config, schema) => {
    const client = (0, client_1.initClient)(config, name);
    const { models, components, enumerations } = schema;
    // DEV PURPOSES
    // END DEV PURPOSES
    // // ? ENUMERATIONS
    (0, functions_1.validateFunction)(client, schema, 'enumeration', 'create', {
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
    // validateFunction(client, schema, 'model', {
    //   apiId: 'RowLinks',
    //   apiIdPlural: 'RowLinksMultiple',
    //   displayName: 'Row Links',
    //   description: 'Row Links is a Row of PageLinks with different variants',
    // })
    // client.createSimpleField({
    //   displayName: 'Identity',
    //   apiId: 'identity',
    //   description: 'Only used for internal reference',
    //   type: SimpleFieldType.String,
    //   isTitle: true,
    //   isRequired: true,
    //   isUnique: true,
    //   modelApiId: 'RowLinks',
    // })
    // client.createEnumerableField({
    //   displayName: 'Variant',
    //   apiId: 'linksVariant',
    //   parentApiId: 'RowLinks',
    //   enumerationApiId: 'RowLinksVariants',
    //   description: 'Different variants for Row Links',
    // })
    // client.createSimpleField({
    //   displayName: 'Title',
    //   apiId: 'title',
    //   type: SimpleFieldType.String,
    //   isRequired: true,
    //   modelApiId: 'RowLinks',
    //   isLocalized: true,
    // })
    // client.createSimpleField({
    //   displayName: 'Copy',
    //   apiId: 'rowLinksCopy',
    //   type: SimpleFieldType.Richtext,
    //   isLocalized: true,
    //   modelApiId: 'RowLinks',
    // })
    // client.createRelationalField({
    //   displayName: 'Links',
    //   apiId: 'pageLinks',
    //   modelApiId: 'RowLinks',
    //   type: RelationalFieldType.Relation,
    //   reverseField: {
    //     apiId: 'rowLinks',
    //     modelApiId: 'PageLink',
    //     displayName: 'RowLinks',
    //     visibility: VisibilityTypes.Hidden,
    //     isList: true,
    //   },
    //   visibility: VisibilityTypes.ReadWrite,
    //   isList: true,
    // })
    // client.updateUnionField({
    //   apiId: 'content',
    //   displayName: 'Content',
    //   modelApiId: 'Page',
    //   reverseField: {
    //     modelApiIds: [
    //       'RowLinks',
    //       'RowServiceOptions',
    //       'RowSpecialBanner',
    //       'RowQuote',
    //       'RowProduct',
    //       'RowColumnOne',
    //       'RowColumnTwo',
    //       'RowColumnThree',
    //       'RowHeroBanner',
    //       'RowBlogContent',
    //       'RowButtonList',
    //       'RowContentLinks',
    //       'RowButtonLinkList',
    //     ],
    //     // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
    //   },
    // })
    // client.updateUnionField({
    //   apiId: 'row',
    //   displayName: 'Row',
    //   modelApiId: 'DynamicRow',
    //   reverseField: {
    //     modelApiIds: [
    //       'RowLinks',
    //       'RowServiceOptions',
    //       'RowSpecialBanner',
    //       'RowQuote',
    //       'RowProduct',
    //       'RowColumnOne',
    //       'RowColumnTwo',
    //       'RowColumnThree',
    //       'RowHeroBanner',
    //       'RowBlogContent',
    //       'RowButtonList',
    //       'RowContentLinks',
    //       'RowButtonLinkList',
    //     ],
    //     // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
    //   },
    //   visibility: VisibilityTypes.Hidden,
    // })
    // client.updateUnionField({
    //   apiId: 'target',
    //   displayName: 'Placement target',
    //   modelApiId: 'DynamicRow',
    //   reverseField: {
    //     modelApiIds: [
    //       'RowLinks',
    //       'RowServiceOptions',
    //       'RowSpecialBanner',
    //       'RowQuote',
    //       'RowProduct',
    //       'RowColumnOne',
    //       'RowColumnTwo',
    //       'RowColumnThree',
    //       'RowHeroBanner',
    //       'RowBlogContent',
    //       'RowButtonList',
    //       'RowContentLinks',
    //       'RowButtonLinkList',
    //     ],
    //     // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
    //   },
    //   visibility: VisibilityTypes.Hidden,
    // })
    // DEV PURPOSES
    // END DEV PURPOSES
    return client.run(true);
};
exports.GraphCommerce6 = GraphCommerce6;
