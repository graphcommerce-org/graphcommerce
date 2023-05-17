"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommerce6 = void 0;
const next_config_1 = require("@graphcommerce/next-config");
const management_sdk_1 = require("@hygraph/management-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GraphCommerce6 = async (name) => {
    const config = (0, next_config_1.loadConfig)(process.cwd());
    if (!config.hygraphWriteAccessEndpoint) {
        throw new Error('Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env');
    }
    if (!config.hygraphWriteAccessToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env');
    }
    const client = new management_sdk_1.Client({
        authToken: config.hygraphWriteAccessToken,
        endpoint: config.hygraphWriteAccessEndpoint,
        name,
    });
    // DEV PURPOSES
    // client.deleteEnumeration({ apiId: 'RowLinksVariants' })
    // remove embeds
    // client.deleteModel({ apiId: 'RowColumnOne' })
    client.createModel({
        apiId: 'RowColumnOne',
        apiIdPlural: 'RowColumnOnes',
        displayName: 'Row Column One',
    });
    client.createSimpleField({
        displayName: 'Identity',
        apiId: 'identity',
        parentApiId: 'RowColumnOne',
        description: 'Only used for internal reference',
        type: management_sdk_1.SimpleFieldType.String,
        isUnique: true,
        isRequired: true,
        isTitle: true,
    });
    client.createSimpleField({
        displayName: 'Col One',
        apiId: 'colOne',
        parentApiId: 'RowColumnOne',
        description: 'Column One',
        type: management_sdk_1.SimpleFieldType.Richtext,
    });
    // END DEV PURPOSES
    // client.updateSimpleField({
    //   apiId: 'colTwo',
    //   parentApiId: 'RowColumnTwo',
    //   embedsEnabled: false,
    //   embeddableModels: undefined,
    // })
    // client.updateSimpleField({
    //   apiId: 'colThree',
    //   parentApiId: 'RowColumnThree',
    //   embedsEnabled: false,
    //   embeddableModels: undefined,
    // })
    // remove rowLinks
    // client.deleteModel({ apiId: 'RowLinks' })
    // ? ENUMERATIONS
    // client.createEnumeration({
    //   displayName: 'Row Links Variants',
    //   apiId: 'RowLinksVariants',
    //   values: [
    //     { displayName: 'Inline', apiId: 'Inline' },
    //     { displayName: 'Image Label Swiper', apiId: 'ImageLabelSwiper' },
    //     { displayName: 'Logo Swiper', apiId: 'LogoSwiper' },
    //     { displayName: 'USPS', apiId: 'Usps' },
    //   ],
    // })
    // // ? MODEL
    // client.createModel({
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
    //   description: 'Title of the Row',
    //   type: SimpleFieldType.String,
    //   isRequired: true,
    //   modelApiId: 'RowLinks',
    //   isLocalized: true,
    // })
    // client.createSimpleField({
    //   displayName: 'Copy',
    //   apiId: 'rowLinksCopy',
    //   description: 'Only used for internal reference',
    //   type: SimpleFieldType.Richtext,
    //   isLocalized: true,
    //   modelApiId: 'RowLinks',
    // })
    // client.updateUnionField({
    //   apiId: 'content',
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
    //     ],
    //   },
    // })
    // PageLinks
    // DEV PURPOSES
    client.updateUnionField({
        apiId: 'content',
        modelApiId: 'Page',
        reverseField: {
            modelApiIds: [
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
        },
        visibility: management_sdk_1.VisibilityTypes.Hidden,
    });
    client.updateUnionField({
        apiId: 'row',
        modelApiId: 'DynamicRow',
        reverseField: {
            modelApiIds: ['RowQuote', 'RowColumnOne', 'RowColumnTwo', 'RowColumnThree'],
        },
        visibility: management_sdk_1.VisibilityTypes.Hidden,
    });
    client.updateUnionField({
        apiId: 'target',
        modelApiId: 'DynamicRow',
        reverseField: {
            modelApiIds: [
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
        },
        visibility: management_sdk_1.VisibilityTypes.Hidden,
    });
    // END DEV PURPOSES
    return client.run(true);
};
exports.GraphCommerce6 = GraphCommerce6;
