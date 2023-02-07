"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteLegacyEnv = void 0;
const mergeEnvIntoConfig_1 = require("./mergeEnvIntoConfig");
function rewriteLegacyEnv(schema, config, env) {
    const clonedEnv = {};
    const applied = [];
    function renamedTo(to) {
        return (envVar, envValue) => {
            applied.push({
                warning: [`should be renamed to ${to}='${envValue}'`],
                envVar,
                envValue,
            });
            clonedEnv[to] = envValue;
        };
    }
    function notUsed() {
        return (envVar, envValue) => {
            applied.push({
                warning: [`should be removed`],
                envVar,
                envValue,
            });
        };
    }
    const parsers = {
        MAGENTO_ENDPPOINT: renamedTo('GC_MAGENTO_ENDPOINT'),
        GRAPHCMS_URL: renamedTo('GC_HYGRAPH_ENDPOINT'),
        NEXT_PUBLIC_GRAPHQL_ENDPOINT: notUsed(),
        IMAGE_DOMAINS: (envVar, envValue) => {
            applied.push({
                warning: [
                    `should be removed: will automatically add the Magento/Hygraph URL. For more advanced configurations, see: https://nextjs.org/docs/api-reference/next/image#configuration-options`,
                ],
                envVar,
                envValue,
            });
        },
        NEXT_PUBLIC_LOCALE_STORES: (envVar, envValue) => {
            const parsed = JSON.parse(envValue);
            applied.push({
                warning: ['env variable is is modified, rewritten to GC_I18N.'],
                envVar,
                envValue,
            });
            clonedEnv.GC_I18N = JSON.stringify(Object.entries(parsed).map(([locale, magentoStoreCode], index) => {
                config.i18n[index] = { ...config.i18n[index], locale, magentoStoreCode };
                return { locale, magentoStoreCode };
            }));
        },
        NEXT_PUBLIC_SITE_URL: renamedTo('GC_CANONICAL_BASE_URL'),
        NEXT_PUBLIC_GTM_ID: renamedTo('GC_GOOGLE_TAGMANAGER_ID'),
        NEXT_PUBLIC_GOOGLE_ANALYTICS: (envVar, envValue) => {
            if (envValue.startsWith('{')) {
                const parsed = JSON.parse(envValue);
                clonedEnv.GC_GOOGLE_ANALYTICS_ID = 'enabled';
                config.i18n.forEach((i18n, index) => {
                    if (parsed[i18n.locale]) {
                        clonedEnv[`GC_I18N_${index}_GOOGLE_ANALYTICS_ID`] = parsed[i18n.locale];
                    }
                });
                applied.push({
                    warning: ['should be rewritten to GC_I18N_*_GOOGLE_ANALYTICS_ID'],
                    envVar,
                    envValue,
                });
                return;
            }
            return renamedTo('GC_GOOGLE_ANALYTICS_ID');
        },
        NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY: renamedTo('GC_GOOGLE_RECAPTCHA_KEY'),
        NEXT_PUBLIC_DISPLAY_INCL_TAX: (envVar, envValue) => {
            const inclTax = envValue.split(',').map((i) => i.trim());
            config.i18n.forEach((i18n, index) => {
                if (!inclTax.includes(i18n.locale))
                    return null;
                clonedEnv[`GC_I18N_${index}_CART_DISPLAY_PRICES_INCL_TAX`] = '1';
            });
            applied.push({
                warning: ['env variable is renamed, move to configuration: cartDisplayPricesInclTax'],
                envVar,
                envValue,
            });
            clonedEnv.GC_DISPLAY_PRICES_INCL_TAX = envValue;
        },
        PREVIEW_SECRET: renamedTo('GC_PREVIEW_SECRET'),
        DEMO_MAGENTO_GRAPHCOMMERCE: renamedTo('GC_DEMO_MODE'),
    };
    Object.entries(env).forEach(([key, value]) => {
        if (value === undefined)
            return;
        try {
            parsers[key]?.(key, value);
        }
        catch (e) {
            console.error(`Error  parsing ${key}`, e);
        }
    });
    const [newConfig, envApplied] = (0, mergeEnvIntoConfig_1.mergeEnvIntoConfig)(schema, config, clonedEnv);
    return [newConfig, [...applied, ...envApplied]];
}
exports.rewriteLegacyEnv = rewriteLegacyEnv;
