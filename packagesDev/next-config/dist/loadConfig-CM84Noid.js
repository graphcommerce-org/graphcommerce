import { cosmiconfigSync } from 'cosmiconfig';
import { GraphCommerceConfigSchema } from './generated/config.js';
import chalk from 'chalk';
import lodash from 'lodash';
import { z, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodObject, ZodArray, ZodNumber, ZodString, ZodEnum, ZodBoolean } from 'zod';

const demoConfig = {
  canonicalBaseUrl: "https://graphcommerce.vercel.app",
  hygraphEndpoint: "https://eu-central-1.cdn.hygraph.com/content/ckhx7xadya6xs01yxdujt8i80/master",
  magentoEndpoint: "https://configurator.reachdigital.dev/graphql",
  magentoVersion: 247,
  storefront: [
    { locale: "en", magentoStoreCode: "en_US", defaultLocale: true },
    {
      locale: "nl",
      magentoStoreCode: "nl_NL",
      hygraphLocales: ["nl", "en_us"],
      cartDisplayPricesInclTax: true
    },
    {
      locale: "fr-be",
      magentoStoreCode: "fr_BE",
      cartDisplayPricesInclTax: true,
      linguiLocale: "fr"
    },
    {
      locale: "nl-be",
      magentoStoreCode: "nl_BE",
      cartDisplayPricesInclTax: true,
      linguiLocale: "nl"
    },
    {
      locale: "en-gb",
      magentoStoreCode: "en_GB",
      cartDisplayPricesInclTax: true,
      linguiLocale: "en"
    },
    { locale: "en-ca", magentoStoreCode: "en_CA", linguiLocale: "en" }
  ],
  productFiltersPro: true,
  productFiltersLayout: "DEFAULT",
  productListPaginationVariant: "COMPACT",
  compareVariant: "ICON",
  robotsAllow: false,
  demoMode: true,
  limitSsg: true,
  compare: true,
  sidebarGallery: { paginationVariant: "DOTS" },
  configurableVariantForSimple: true,
  configurableVariantValues: { url: true, content: true, gallery: true },
  recentlyViewedProducts: { enabled: true, maxCount: 20 },
  breadcrumbs: false,
  customerDeleteEnabled: true,
  previewSecret: "SECRET"
};

var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function isNonNullObject(obj) {
  return obj !== null && typeof obj === "object";
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeep() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;
  if (count > 1) {
    var merger = new DeepMerger();
    for (var i = 1; i < count; ++i) {
      target = merger.merge(target, sources[i]);
    }
  }
  return target;
}
var defaultReconciler = function(target, source, property) {
  return this.merge(target[property], source[property]);
};
var DeepMerger = (
  /** @class */
  (function() {
    function DeepMerger2(reconciler) {
      if (reconciler === void 0) {
        reconciler = defaultReconciler;
      }
      this.reconciler = reconciler;
      this.isObject = isNonNullObject;
      this.pastCopies = /* @__PURE__ */ new Set();
    }
    DeepMerger2.prototype.merge = function(target, source) {
      var _this = this;
      var context = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        context[_i - 2] = arguments[_i];
      }
      if (isNonNullObject(source) && isNonNullObject(target)) {
        Object.keys(source).forEach(function(sourceKey) {
          if (hasOwnProperty.call(target, sourceKey)) {
            var targetValue = target[sourceKey];
            if (source[sourceKey] !== targetValue) {
              var result = _this.reconciler.apply(_this, __spreadArray([
                target,
                source,
                sourceKey
              ], context, false));
              if (result !== targetValue) {
                target = _this.shallowCopyForMerge(target);
                target[sourceKey] = result;
              }
            }
          } else {
            target = _this.shallowCopyForMerge(target);
            target[sourceKey] = source[sourceKey];
          }
        });
        return target;
      }
      return source;
    };
    DeepMerger2.prototype.shallowCopyForMerge = function(value) {
      if (isNonNullObject(value)) {
        if (!this.pastCopies.has(value)) {
          if (Array.isArray(value)) {
            value = value.slice(0);
          } else {
            value = __assign({ __proto__: Object.getPrototypeOf(value) }, value);
          }
          this.pastCopies.add(value);
        }
      }
      return value;
    };
    return DeepMerger2;
  })()
);

var toString = Object.prototype.toString;
function cloneDeep(value) {
  return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
  switch (toString.call(val)) {
    case "[object Array]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_1 = val.slice(0);
      seen.set(val, copy_1);
      copy_1.forEach(function(child, i) {
        copy_1[i] = cloneDeepHelper(child, seen);
      });
      return copy_1;
    }
    case "[object Object]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_2 = Object.create(Object.getPrototypeOf(val));
      seen.set(val, copy_2);
      Object.keys(val).forEach(function(key) {
        copy_2[key] = cloneDeepHelper(val[key], seen);
      });
      return copy_2;
    }
    default:
      return val;
  }
}

function isObject(val) {
  return typeof val === "object" && val !== null;
}
function isArray(val) {
  return Array.isArray(val);
}
function diff(item1, item2) {
  const item1Type = typeof item2;
  const item2Type = typeof item2;
  const isSame = item1Type === item2Type;
  if (!isSame) return item2;
  if (isArray(item1) && isArray(item2)) {
    const res = item1.map((val, idx) => diff(val, item2[idx])).filter((val) => !!val);
    return res.length ? res : void 0;
  }
  if (isObject(item1) && isObject(item2)) {
    const entriesRight = Object.fromEntries(
      Object.entries(item1).map(([key, val]) => [key, diff(val, item2[key])]).filter((entry) => !!entry[1])
    );
    const entriesLeft = Object.fromEntries(
      Object.entries(item2).map(([key, val]) => [key, diff(item1[key], val)]).filter((entry) => !!entry[1])
    );
    const entries = { ...entriesRight, ...entriesLeft };
    return Object.keys(entries).length ? entries : void 0;
  }
  return item2 === item1 ? void 0 : item2;
}

const fmt = (s) => s.split(/(\d+)/).map((v) => lodash.snakeCase(v)).join("");
const toEnvStr = (path) => ["GC", ...path].map(fmt).join("_").toUpperCase();
const dotNotation = (pathParts) => pathParts.map((v) => {
  const idx = Number(v);
  return !Number.isNaN(idx) ? `[${idx}]` : v;
}).join(".");
function isJSON(str) {
  if (!str) return true;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
function configToEnvSchema(schema) {
  const envSchema = {};
  const envToDot = {};
  function walk(incomming, path = []) {
    let node = incomming;
    if (node instanceof ZodEffects) node = node.innerType();
    if (node instanceof ZodOptional) node = node.unwrap();
    if (node instanceof ZodNullable) node = node.unwrap();
    if (node instanceof ZodDefault) node = node.removeDefault();
    if (node instanceof ZodObject) {
      if (path.length > 0) {
        envSchema[toEnvStr(path)] = z.string().optional().refine(isJSON, { message: "Invalid JSON" }).transform((val) => val ? JSON.parse(val) : val);
        envToDot[toEnvStr(path)] = dotNotation(path);
      }
      const typeNode = node;
      Object.keys(typeNode.shape).forEach((key) => {
        walk(typeNode.shape[key], [...path, key]);
      });
      return;
    }
    if (node instanceof ZodArray) {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      if (path.length > 0) {
        envSchema[toEnvStr(path)] = z.string().optional().refine(isJSON, { message: "Invalid JSON" }).transform((val) => val ? JSON.parse(val) : val);
        envToDot[toEnvStr(path)] = dotNotation(path);
      }
      arr.forEach((key) => {
        walk(node.element, [...path, String(key)]);
      });
      return;
    }
    if (node instanceof ZodNumber) {
      envSchema[toEnvStr(path)] = z.coerce.number().optional();
      envToDot[toEnvStr(path)] = dotNotation(path);
      return;
    }
    if (node instanceof ZodString || node instanceof ZodEnum) {
      envSchema[toEnvStr(path)] = node.optional();
      envToDot[toEnvStr(path)] = dotNotation(path);
      return;
    }
    if (node instanceof ZodBoolean) {
      envSchema[toEnvStr(path)] = z.enum(["true", "1", "false", "0"]).optional().transform((v) => {
        if (v === "true" || v === "1") return true;
        if (v === "false" || v === "0") return false;
        return v;
      });
      envToDot[toEnvStr(path)] = dotNotation(path);
      return;
    }
    throw Error(
      `[@graphcommerce/next-config] Unknown type in schema ${node.constructor.name}. This is probably a bug please create an issue.`
    );
  }
  walk(schema);
  return [z.object(envSchema), envToDot];
}
const filterEnv = (env) => Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith("GC_")));
function mergeEnvIntoConfig(schema, config, env) {
  const filteredEnv = filterEnv(env);
  const newConfig = cloneDeep(config);
  const [envSchema, envToDot] = configToEnvSchema(schema);
  const result = envSchema.safeParse(filteredEnv);
  const applyResult = [];
  if (!result.success) {
    Object.entries(result.error.flatten().fieldErrors).forEach(([envVar, error]) => {
      const dotVar = envToDot[envVar];
      const envValue = filteredEnv[envVar];
      applyResult.push({ envVar, envValue, dotVar, error });
    });
    return [void 0, applyResult];
  }
  Object.entries(result.data).forEach(([envVar, value]) => {
    const dotVar = envToDot[envVar];
    const envValue = filteredEnv[envVar];
    if (!dotVar) {
      applyResult.push({ envVar, envValue });
      return;
    }
    const dotValue = lodash.get(newConfig, dotVar);
    const merged = mergeDeep(dotValue, value);
    const from = diff(merged, dotValue);
    const to = diff(dotValue, merged);
    applyResult.push({ envVar, envValue, dotVar, from, to });
    lodash.set(newConfig, dotVar, merged);
  });
  return [newConfig, applyResult];
}
function formatAppliedEnv(applyResult) {
  let hasError = false;
  let hasWarning = false;
  const lines = applyResult.map(({ from, to, envVar, dotVar, error, warning }) => {
    const envVariableFmt = `${envVar}`;
    const dotVariableFmt = chalk.bold.underline(`${dotVar}`);
    const baseLog = `${envVariableFmt} => ${dotVariableFmt}`;
    if (error) {
      hasError = true;
      return `${chalk.red(` \u2A09 ${envVariableFmt}`)} => ${error.join(", ")}`;
    }
    if (warning) {
      hasWarning = true;
      return `${chalk.yellowBright(` \u203C ${envVariableFmt}`)} => ${warning.join(", ")}`;
    }
    if (!dotVar) return chalk.red(`${envVariableFmt} => ignored (no matching config)`);
    if (from === void 0 && to === void 0) return ` = ${baseLog}`;
    if (from === void 0 && to !== void 0) return ` ${chalk.green("+")} ${baseLog}`;
    if (from !== void 0 && to === void 0) return ` ${chalk.red("-")} ${baseLog}`;
    return ` ${chalk.yellowBright("~")} ${baseLog}`;
  });
  let header = chalk.blueBright("info");
  if (hasWarning) header = chalk.yellowBright("warning");
  if (hasError) header = chalk.yellowBright("error");
  header += "   - Loaded GraphCommerce env variables";
  return [header, ...lines].join("\n");
}

function flattenKeys(value, initialPathPrefix, stringify) {
  if (value === null || value === void 0 || typeof value === "number") {
    return { [initialPathPrefix]: value };
  }
  if (typeof value === "string") {
    return { [initialPathPrefix]: stringify ? JSON.stringify(value) : value };
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      [initialPathPrefix]: stringify || Array.isArray(value) ? JSON.stringify(value) : value
    };
  }
  if (typeof value === "object") {
    let outputValue = value;
    if (stringify)
      outputValue = process.env.NODE_ENV !== "production" ? `{ __debug: "'${initialPathPrefix}' can not be destructured, please access deeper properties directly" }` : "{}";
    return {
      [initialPathPrefix]: outputValue,
      ...Object.keys(value).map((key) => {
        const deep = value[key];
        return {
          ...flattenKeys(deep, `${initialPathPrefix}.${key}`, stringify),
          ...flattenKeys(deep, `${initialPathPrefix}?.${key}`, stringify)
        };
      }).reduce((acc, path) => ({ ...acc, ...path }), {})
    };
  }
  throw Error(`Unexpected value: ${value}`);
}
function configToImportMeta(config, path = "import.meta.graphCommerce", stringify = true) {
  return flattenKeys(config, path, stringify);
}

function replaceConfigInString(str, config) {
  let result = str;
  const replacers = configToImportMeta(config, "graphCommerce", false);
  Object.entries(replacers).forEach(([from, to]) => {
    result = result.replace(new RegExp(`{${from}}`, "g"), to);
  });
  return result;
}

const moduleName = "graphcommerce";
const loader = cosmiconfigSync(moduleName);
function loadConfig(cwd) {
  const isMainProcess = !process.send;
  try {
    const result = loader.search(cwd);
    let confFile = result?.config;
    if (!confFile) {
      if (isMainProcess)
        console.warn("No graphcommerce.config.js found in the project, using demo config");
      confFile = demoConfig;
    }
    confFile ||= {};
    const schema = GraphCommerceConfigSchema();
    const [mergedConfig, applyResult] = mergeEnvIntoConfig(schema, confFile, process.env);
    if (applyResult.length > 0 && isMainProcess) console.log(formatAppliedEnv(applyResult));
    const finalParse = schema.parse(mergedConfig);
    if (process.env.DEBUG && isMainProcess) {
      console.log("Parsed configuration");
      console.log(finalParse);
    }
    return finalParse;
  } catch (error) {
    if (error instanceof Error) {
      if (isMainProcess) {
        console.log("Error while parsing graphcommerce.config.js", error.message);
        process.exit(1);
      }
    }
    throw error;
  }
}

export { loadConfig as l, replaceConfigInString as r, toEnvStr as t };
