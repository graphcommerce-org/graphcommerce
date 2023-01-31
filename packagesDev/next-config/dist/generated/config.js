"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommerceI18nConfigSchema = exports.GraphCommerceConfigSchema = exports.definedNonNullAnySchema = exports.isDefinedNonNullAny = void 0;
/* eslint-disable */
const zod_1 = require("zod");
const isDefinedNonNullAny = (v) => v !== undefined && v !== null;
exports.isDefinedNonNullAny = isDefinedNonNullAny;
exports.definedNonNullAnySchema = zod_1.z.any().refine((v) => (0, exports.isDefinedNonNullAny)(v));
function GraphCommerceConfigSchema() {
    return zod_1.z.object({
        advancedFilters: zod_1.z.boolean(),
        customerRequireEmailConfirmation: zod_1.z.boolean(),
        demoMode: zod_1.z.boolean().nullish(),
        googleAnalyticsKey: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerKey: zod_1.z.string().nullish(),
        i18n: zod_1.z.array(GraphCommerceI18nConfigSchema()),
        singleProductRoute: zod_1.z.boolean()
    });
}
exports.GraphCommerceConfigSchema = GraphCommerceConfigSchema;
function GraphCommerceI18nConfigSchema() {
    return zod_1.z.object({
        defaultLocale: zod_1.z.boolean().nullish(),
        domain: zod_1.z.string().nullish(),
        googleAnalyticsEnabled: zod_1.z.boolean().nullish(),
        googleAnalyticsKey: zod_1.z.string().nullish(),
        googleRecaptchaKey: zod_1.z.string().nullish(),
        googleTagmanagerKey: zod_1.z.string().nullish(),
        hygraphLocales: zod_1.z.array(zod_1.z.string().min(1)),
        locale: zod_1.z.string().min(1),
        magentoStoreCode: zod_1.z.string().min(1)
    });
}
exports.GraphCommerceI18nConfigSchema = GraphCommerceI18nConfigSchema;
