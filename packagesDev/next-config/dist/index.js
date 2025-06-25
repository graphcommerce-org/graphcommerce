import{createRequire as _pkgrollCR}from"node:module";const require=_pkgrollCR(import.meta.url);import fs from 'node:fs';
import path from 'node:path';
import assert from 'assert';
import crypto from 'crypto';
import webpack from 'webpack';
import { cosmiconfigSync } from 'cosmiconfig';
import { GraphCommerceConfigSchema } from './generated/config.js';
export { CartPermissionsSchema, CompareVariantSchema, ContainerSizingSchema, CustomerAccountPermissionsSchema, DatalayerConfigSchema, GraphCommerceDebugConfigSchema, GraphCommerceGooglePlaystoreConfigSchema, GraphCommercePermissionsSchema, GraphCommerceStorefrontConfigSchema, MagentoConfigurableVariantValuesSchema, PaginationVariantSchema, ProductFiltersLayoutSchema, RecentlyViewedProductsConfigSchema, SidebarGalleryConfigSchema, SidebarGalleryPaginationVariantSchema, WebsitePermissionsSchema, definedNonNullAnySchema, isDefinedNonNullAny } from './generated/config.js';
import chalk from 'chalk';
import lodash from 'lodash';
import { z, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodObject, ZodArray, ZodNumber, ZodString, ZodEnum, ZodBoolean } from 'zod';
import path$1 from 'path';
import { parseFileSync, parseSync as parseSync$1, printSync as printSync$1, transformFileSync } from '@swc/core';
import { sync } from 'glob';
import fs$1 from 'node:fs/promises';
import prettierConf from '@graphcommerce/prettier-config-pwa';
import prettier from 'prettier';
import { writeFileSync, readFileSync } from 'fs';
import { generate } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
import fs$2 from 'fs/promises';
import fg from 'fast-glob';

const debug$1 = process.env.DEBUG === "1";
const log = (message) => debug$1 && console.log(`isMonorepo: ${message}`);
function findPackageJson$1(directory) {
  try {
    const packageJsonPath = path.join(directory, "package.json");
    const content = fs.readFileSync(packageJsonPath, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}
function findParentPath(directory) {
  let currentDir = directory;
  log(`Starting directory: ${currentDir}`);
  currentDir = path.dirname(currentDir);
  log(`Looking for parent packages starting from: ${currentDir}`);
  while (currentDir !== path.parse(currentDir).root) {
    const packageJson = findPackageJson$1(currentDir);
    if (packageJson) {
      log(`Found package.json in: ${currentDir}`);
      log(`Package name: ${packageJson.name}`);
      if (packageJson.name.startsWith("@graphcommerce/")) {
        log(`Found parent @graphcommerce package at: ${currentDir}`);
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  log("No parent @graphcommerce package found");
  return null;
}

class TopologicalSort {
  #nodes;
  #visitedNodes;
  #sortedKeysStack;
  constructor(nodes) {
    this.#nodes = /* @__PURE__ */ new Map();
    this.addMultipleInternalNodes(nodes);
  }
  /** @public */
  addNode(key, node) {
    return this.addInternalNode(key, node);
  }
  /** @public */
  addNodes(nodes) {
    this.addMultipleInternalNodes(nodes);
  }
  /** @public */
  addEdge(fromKey, toKey) {
    assert(this.#nodes.has(fromKey), `Source package with ${fromKey} key should exist`);
    assert(this.#nodes.has(toKey), `Target package with ${toKey} key should exist`);
    const sourceNode = this.#nodes.get(fromKey);
    const targetNode = this.#nodes.get(toKey);
    assert.strictEqual(
      sourceNode !== void 0,
      true,
      `Source package with key ${fromKey} doesn't exist`
    );
    assert.strictEqual(
      targetNode !== void 0,
      true,
      `Target package with key ${toKey} doesn't exist`
    );
    assert.strictEqual(
      sourceNode.children.has(toKey),
      false,
      `Source package ${fromKey} already has an edge to target node ${toKey}`
    );
    sourceNode.children.set(toKey, targetNode);
  }
  /** @public */
  sort() {
    this.#visitedNodes = /* @__PURE__ */ new Set();
    this.#sortedKeysStack = [];
    const output = /* @__PURE__ */ new Map();
    for (const [key] of this.#nodes) {
      this.exploreNode(key, []);
    }
    for (let i = this.#sortedKeysStack.length - 1; i >= 0; i--) {
      const node = this.#nodes.get(this.#sortedKeysStack[i]);
      output.set(this.#sortedKeysStack[i], node);
    }
    return output;
  }
  exploreNode(nodeKey, explorePath) {
    const newExplorePath = [...explorePath, nodeKey];
    if (explorePath.length) {
      if (explorePath.includes(nodeKey)) {
        throw Error(
          `Package ${nodeKey} forms circular dependency: ${newExplorePath.slice(newExplorePath.indexOf(nodeKey)).join(" -> ")}`
        );
      }
    }
    const node = this.#nodes.get(nodeKey);
    if (this.#visitedNodes.has(node)) return;
    this.#visitedNodes.add(node);
    for (const [childNodeKey] of node.children) {
      this.exploreNode(childNodeKey, newExplorePath);
    }
    this.#sortedKeysStack.push(nodeKey);
  }
  addInternalNode(key, node) {
    assert.strictEqual(this.#nodes.has(key), false, `Node ${key} already exists`);
    this.#nodes.set(key, {
      children: /* @__PURE__ */ new Map(),
      node
    });
    return this;
  }
  addMultipleInternalNodes(nodes) {
    const nodesFlat = [...nodes];
    for (let i = nodes.size - 1; i >= 0; i--) {
      const [key, node] = nodesFlat[i];
      this.addInternalNode(key, node);
    }
  }
}

class PackagesSort extends TopologicalSort {
}

function g(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", "BbcFEkUydGw3nE9ZPm7gbxTIIBQ9IiKN", iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
  encrypted += cipher.final("hex");
  return Buffer.from(`${iv.toString("hex")}:${encrypted}`).toString();
}
function sig() {
  const l = process.env[atob("R0NfTElDRU5TRQ==")];
  if (!l) return;
  if (!globalThis.gcl)
    try {
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        "BbcFEkUydGw3nE9ZPm7gbxTIIBQ9IiKN",
        Buffer.from(l.split(":")[0], "hex")
      );
      let decrypted = decipher.update(l.split(":")[1], "hex", "utf-8");
      decrypted += decipher.final("utf-8");
      globalThis.gcl = JSON.parse(decrypted);
    } catch (error) {
    }
}

const resolveCache = /* @__PURE__ */ new Map();
function findPackageJson(id, root) {
  let dir = id.startsWith("/") ? id : require.resolve(id);
  let packageJsonLocation = path.join(dir, "package.json");
  while (!fs.existsSync(packageJsonLocation)) {
    dir = path.dirname(dir);
    if (dir === root) throw Error(`Can't find package.json for ${id}`);
    packageJsonLocation = path.join(dir, "package.json");
  }
  return packageJsonLocation;
}
function resolveRecursivePackageJson(dependencyPath, dependencyStructure, root, additionalDependencies = []) {
  const isRoot = dependencyPath === root;
  let fileName;
  try {
    fileName = require.resolve(path.join(dependencyPath, "package.json"));
  } catch (e2) {
    fileName = findPackageJson(dependencyPath, root);
  }
  if (!fileName) throw Error(`Can't find package.json for ${dependencyPath}`);
  const packageJsonFile = fs.readFileSync(fileName, "utf-8").toString();
  const packageJson = JSON.parse(packageJsonFile);
  const e = [atob("QGdyYXBoY29tbWVyY2UvYWRvYmUtY29tbWVyY2U=")].filter(
    (n) => !globalThis.gcl ? true : !globalThis.gcl.includes(n)
  );
  if (!packageJson.name) throw Error(`Package ${packageJsonFile} does not have a name field`);
  if (dependencyStructure[packageJson.name]) return dependencyStructure;
  const namespaces = process.env.PRIVATE_PACKAGE_NAMESPACES?.split(",") ?? ["graphcommerce"];
  if (!isRoot && !namespaces.some((namespace) => packageJson.name?.includes(namespace)))
    return dependencyStructure;
  const dependencies = [
    ...new Set(
      [
        ...Object.keys(packageJson.dependencies ?? []),
        ...Object.keys(packageJson.devDependencies ?? []),
        ...additionalDependencies,
        ...Object.keys(packageJson.peerDependencies ?? {})
      ].filter(
        (name2) => name2.includes("graphcommerce") ? !(e.length >= 0 && e.some((v) => name2.startsWith(v))) : false
      )
    )
  ];
  const optionalPeerDependencies = Object.entries(packageJson.peerDependenciesMeta ?? {}).filter(([_, v]) => v?.optional).map(([key]) => key);
  const optionalDependencies = Object.keys(packageJson.optionalDependencies ?? {});
  const optional = /* @__PURE__ */ new Set([...optionalPeerDependencies, ...optionalDependencies]);
  const availableDependencies = dependencies.filter((dep) => {
    if (optional.has(dep)) {
      try {
        resolveRecursivePackageJson(dep, dependencyStructure, root);
        return true;
      } catch (resolveError) {
        return false;
      }
    } else {
      resolveRecursivePackageJson(dep, dependencyStructure, root);
      return true;
    }
  });
  const name = isRoot ? "." : packageJson.name;
  dependencyStructure[name] = {
    dirName: path.dirname(path.relative(process.cwd(), fileName)),
    dependencies: availableDependencies
  };
  return dependencyStructure;
}
function sortDependencies(dependencyStructure) {
  const packages = Object.entries(dependencyStructure);
  const sorter = new PackagesSort(new Map(packages.map(([key, value]) => [key, value.dirName])));
  packages.forEach(
    ([key, { dependencies }]) => dependencies.forEach((dependency) => sorter.addEdge(key, dependency))
  );
  const sortedKeys = [...sorter.sort().keys()];
  return new Map(sortedKeys.map((key) => [key, dependencyStructure[key].dirName]));
}
function resolveDependenciesSync(root = process.cwd()) {
  const cached = resolveCache.get(root);
  if (cached) return cached;
  sig();
  const dependencyStructure = resolveRecursivePackageJson(
    root,
    {},
    root,
    process.env.PRIVATE_ADDITIONAL_DEPENDENCIES?.split(",") ?? []
  );
  const sorted = sortDependencies(dependencyStructure);
  resolveCache.set(root, sorted);
  return sorted;
}

const packageRoots = (packagePaths) => {
  const pathMap = {};
  packagePaths.forEach((singlePath) => {
    const parts = singlePath.split("/");
    for (let i = 1; i < parts.length; i++) {
      const subPath = parts.slice(0, i + 1).join("/");
      if (pathMap[subPath]) {
        pathMap[subPath].count += 1;
      } else {
        pathMap[subPath] = { path: subPath, count: 1 };
      }
    }
  });
  const roots = [];
  Object.values(pathMap).forEach(({ path, count }) => {
    if (count > 1) {
      roots.push(path);
    }
  });
  return roots.filter(
    (root, index, self) => self.findIndex((r) => r !== root && r.startsWith(`${root}/`)) === -1
  );
};

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
  function() {
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
  }()
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

function isObject$1(val) {
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
  if (isObject$1(item1) && isObject$1(item2)) {
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

const fmt$1 = (s) => s.split(/(\d+)/).map((v) => lodash.snakeCase(v)).join("");
const toEnvStr = (path) => ["GC", ...path].map(fmt$1).join("_").toUpperCase();
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

const resolveDependency = (cwd = process.cwd()) => {
  const dependencies = resolveDependenciesSync(cwd);
  function resolve(dependency, options = {}) {
    const { includeSources = false } = options;
    let dependencyPaths = {
      root: ".",
      source: "",
      sourcePath: "",
      sourcePathRelative: "",
      dependency,
      fromRoot: dependency,
      fromModule: dependency,
      denormalized: dependency
    };
    dependencies.forEach((root, depCandidate) => {
      if (dependency === depCandidate || dependency.startsWith(`${depCandidate}/`)) {
        const relative = dependency.replace(depCandidate, "");
        const rootCandidate = dependency.replace(depCandidate, root);
        let source = "";
        let sourcePath = "";
        const fromRoot = [
          `${rootCandidate}`,
          `${rootCandidate}/index`,
          `${rootCandidate}/src/index`
        ].find(
          (location) => ["ts", "tsx"].find((extension) => {
            const candidatePath = `${location}.${extension}`;
            const exists = fs.existsSync(candidatePath);
            if (includeSources && exists) {
              source = fs.readFileSync(candidatePath, "utf-8");
              sourcePath = candidatePath;
            }
            return exists;
          })
        );
        if (!fromRoot) {
          return;
        }
        const denormalized = fromRoot.replace(root, depCandidate);
        let fromModule = !relative ? "." : `./${relative.split("/")[relative.split("/").length - 1]}`;
        const sourcePathRelative = !sourcePath ? "." : `./${sourcePath.split("/")[sourcePath.split("/").length - 1]}`;
        if (dependency.startsWith("./")) fromModule = `.${relative}`;
        dependencyPaths = {
          root,
          dependency,
          denormalized,
          fromRoot,
          fromModule,
          source,
          sourcePath,
          sourcePathRelative
        };
      }
    });
    return dependencyPaths;
  }
  return resolve;
};

function isIdentifier(node) {
  return node.type === "Identifier";
}
function isBooleanLiteral(node) {
  return node.type === "BooleanLiteral";
}
function isNullLiteral(node) {
  return node.type === "NullLiteral";
}
function isStringLiteral(node) {
  return node.type === "StringLiteral";
}
function isNumericLiteral(node) {
  return node.type === "NumericLiteral";
}
function isArrayExpression(node) {
  return node.type === "ArrayExpression";
}
function isObjectExpression(node) {
  return node.type === "ObjectExpression";
}
function isKeyValueProperty(node) {
  return node.type === "KeyValueProperty";
}
function isRegExpLiteral(node) {
  return node.type === "RegExpLiteral";
}
function isTemplateLiteral(node) {
  return node.type === "TemplateLiteral";
}
const RUNTIME_VALUE = Symbol("RUNTIME_VALUE");
function extractValue(node, path, optional = false) {
  if (isNullLiteral(node)) {
    return null;
  }
  if (isBooleanLiteral(node)) {
    return node.value;
  }
  if (isStringLiteral(node)) {
    return node.value;
  }
  if (isNumericLiteral(node)) {
    return node.value;
  }
  if (isRegExpLiteral(node)) {
    return new RegExp(node.pattern, node.flags);
  }
  if (isIdentifier(node)) {
    switch (node.value) {
      case "undefined":
        return void 0;
      default:
        return RUNTIME_VALUE;
    }
  } else if (isArrayExpression(node)) {
    const arr = [];
    for (let i = 0, len = node.elements.length; i < len; i++) {
      const elem = node.elements[i];
      if (elem) {
        if (elem.spread) {
          return RUNTIME_VALUE;
        }
        arr.push(extractValue(elem.expression, path, optional));
      } else {
        arr.push(void 0);
      }
    }
    return arr;
  } else if (isObjectExpression(node)) {
    const obj = {};
    for (const prop of node.properties) {
      if (!isKeyValueProperty(prop)) {
        return RUNTIME_VALUE;
      }
      let key;
      if (isIdentifier(prop.key)) {
        key = prop.key.value;
      } else if (isStringLiteral(prop.key)) {
        key = prop.key.value;
      } else {
        return RUNTIME_VALUE;
      }
      obj[key] = extractValue(prop.value, path);
    }
    return obj;
  } else if (isTemplateLiteral(node)) {
    if (node.expressions.length !== 0) {
      return RUNTIME_VALUE;
    }
    const [{ cooked, raw }] = node.quasis;
    return cooked ?? raw;
  } else {
    return RUNTIME_VALUE;
  }
}
function extractExports(module) {
  const exports = {};
  const errors = [];
  for (const moduleItem of module.body) {
    switch (moduleItem.type) {
      case "ExportAllDeclaration":
        errors.push("You can not use export * from a plugin, exports must be explicit");
        break;
      case "ExportDefaultDeclaration":
        errors.push("You can not use default exports from a plugin, exports must be explicit");
        break;
      case "ExportDeclaration":
        switch (moduleItem.declaration.type) {
          case "ClassDeclaration":
          case "FunctionDeclaration":
            exports[moduleItem.declaration.identifier.value] = RUNTIME_VALUE;
            break;
          case "VariableDeclaration":
            moduleItem.declaration.declarations.forEach((decl) => {
              if (isIdentifier(decl.id) && decl.init) {
                exports[decl.id.value] = extractValue(decl.init, void 0, true);
              }
            });
            break;
        }
    }
  }
  return [exports, errors];
}

const pluginConfigParsed = z.object({
  type: z.enum(["component", "function", "replace"]),
  module: z.string(),
  export: z.string(),
  ifConfig: z.union([z.string(), z.tuple([z.string(), z.unknown()])]).optional()
});
function nonNullable(value) {
  return value !== null && value !== void 0;
}
const isObject = (input) => typeof input === "object" && input !== null && !Array.isArray(input);
function parseStructure(ast, gcConfig, sourceModule) {
  const [exports, errors] = extractExports(ast);
  if (errors.length) console.error("Plugin error for", errors.join("\n"));
  const {
    config: moduleConfig,
    component,
    func,
    exported,
    ifConfig,
    plugin,
    Plugin,
    ...rest
  } = exports;
  const exportVals = Object.keys(rest);
  if (component && !moduleConfig) exportVals.push("Plugin");
  if (func && !moduleConfig) exportVals.push("plugin");
  const pluginConfigs = exportVals.map((exportVal) => {
    let config = isObject(moduleConfig) ? moduleConfig : {};
    if (!moduleConfig && component) {
      config = { type: "component", module: exported, ifConfig, export: "Plugin" };
    } else if (!moduleConfig && func) {
      config = { type: "function", module: exported, ifConfig, export: "plugin" };
    } else if (isObject(moduleConfig)) {
      config = { ...moduleConfig, export: exportVal };
    } else {
      console.error(`Plugin configuration invalid! See ${sourceModule}`);
      return null;
    }
    const parsed = pluginConfigParsed.safeParse(config);
    if (!parsed.success) {
      if (errors.length)
        console.error(parsed.error.errors.map((e) => `${e.path} ${e.message}`).join("\n"));
      return void 0;
    }
    let enabled = true;
    if (parsed.data.ifConfig) {
      if (Array.isArray(parsed.data.ifConfig)) {
        const isBoolean = typeof parsed.data.ifConfig[1] === "boolean";
        let confValue = lodash.get(gcConfig, parsed.data.ifConfig[0]);
        confValue = isBoolean ? Boolean(confValue) : confValue;
        enabled = confValue === parsed.data.ifConfig[1];
      } else {
        enabled = Boolean(lodash.get(gcConfig, parsed.data.ifConfig));
      }
    }
    const val = {
      targetExport: exports.component || exports.func || parsed.data.export,
      sourceModule,
      sourceExport: parsed.data.export,
      targetModule: parsed.data.module,
      type: parsed.data.type,
      enabled
    };
    if (parsed.data.ifConfig) val.ifConfig = parsed.data.ifConfig;
    return val;
  }).filter(nonNullable);
  const newPluginConfigs = pluginConfigs.reduce((acc, pluginConfig) => {
    if (!acc.find((accPluginConfig) => accPluginConfig.sourceExport === pluginConfig.sourceExport)) {
      acc.push(pluginConfig);
    }
    return acc;
  }, []);
  return newPluginConfigs;
}

const pluginLogs = {};
const GREEN = "\x1B[32m";
const RESET = "\x1B[0m";
function findPlugins(config, cwd = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd);
  const debug = Boolean(config.debug?.pluginStatus);
  const errors = [];
  const plugins = [];
  dependencies.forEach((filePath, packageName) => {
    const files = sync(`${filePath}/plugins/**/*.{ts,tsx}`);
    files.forEach((file) => {
      let sourceModule = file.replace(".tsx", "").replace(".ts", "");
      if (file.startsWith(filePath))
        sourceModule = `${packageName}/${sourceModule.slice(filePath.length + 1)}`;
      if (packageName === "." && !sourceModule.startsWith(".")) sourceModule = `./${sourceModule}`;
      try {
        const ast = parseFileSync(file, { syntax: "typescript", tsx: true });
        parseStructure(ast, config, sourceModule).forEach((result) => {
          plugins.push(result);
        });
      } catch (e) {
        console.error(`Error parsing ${file}`, e);
      }
    });
  });
  if (process.env.NODE_ENV === "development" && debug) {
    const byExported = plugins.reduce(
      (acc, plugin) => {
        const key = `\u{1F50C} ${GREEN}Plugins loaded for ${plugin.targetModule}#${plugin.targetExport}${RESET}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(plugin);
        return acc;
      },
      {}
    );
    const toLog = [];
    Object.entries(byExported).forEach(([key, p]) => {
      const logStr = p.filter((c) => debug || c.enabled).map((c) => {
        const ifConfigStr = c.ifConfig ? Array.isArray(c.ifConfig) ? `${c.ifConfig[0]}=${c.ifConfig[1]}` : `${c.ifConfig}` : "";
        return `${c.enabled ? "\u{1F7E2}" : "\u26AA\uFE0F"} ${c.sourceModule} ${ifConfigStr}`;
      }).join("\n");
      if (logStr && pluginLogs[key] !== logStr) {
        toLog.push(`${key}
${logStr}`);
        pluginLogs[key] = logStr;
      }
    });
    if (toLog.length) console.log(toLog.join("\n\n"));
  }
  return [plugins, errors];
}

function parseSync(src) {
  return parseSync$1(src, {
    syntax: "typescript",
    tsx: true,
    comments: true
  });
}
function printSync(m) {
  return printSync$1(m);
}

function parseAndFindExport(resolved, findExport, resolve) {
  if (!resolved?.source) return void 0;
  const ast = parseSync(resolved.source);
  for (const node of ast.body) {
    if (node.type === "ExportDeclaration") {
      switch (node.declaration.type) {
        case "ClassDeclaration":
        case "FunctionDeclaration":
          if (node.declaration.identifier.value === findExport) return resolved;
          break;
        case "VariableDeclaration":
          for (const declaration of node.declaration.declarations) {
            if (declaration.type === "VariableDeclarator") {
              if (declaration.id.type === "Identifier") {
                if (declaration.id.value === findExport) return resolved;
              } else {
                console.log(declaration);
              }
            }
          }
          break;
      }
    }
    if (node.type === "ExportNamedDeclaration") {
      for (const specifier of node.specifiers) {
        if (specifier.type === "ExportSpecifier") {
          if (specifier.exported?.value === findExport) return resolved;
        } else if (specifier.type === "ExportDefaultSpecifier") ; else if (specifier.type === "ExportNamespaceSpecifier") ;
      }
    }
  }
  const exports = ast.body.filter((node) => node.type === "ExportAllDeclaration").sort((a, b) => {
    const probablyA = a.source.value.includes(findExport);
    const probablyB = b.source.value.includes(findExport);
    return probablyA === probablyB ? 0 : probablyA ? -1 : 1;
  });
  for (const node of exports) {
    const isRelative = node.source.value.startsWith(".");
    if (isRelative) {
      const d = resolved.dependency === resolved.denormalized ? resolved.dependency.substring(0, resolved.dependency.lastIndexOf("/")) : resolved.dependency;
      const newPath = path$1.join(d, node.source.value);
      const resolveResult = resolve(newPath, { includeSources: true });
      if (!resolveResult) continue;
      const newResolved = parseAndFindExport(resolveResult, findExport, resolve);
      if (newResolved && resolved.dependency !== newResolved.dependency) return newResolved;
    }
  }
  return void 0;
}
function findOriginalSource(plug, resolved, resolve) {
  if (!resolved?.source)
    return {
      resolved: void 0,
      error: new Error(`Plugin: Can not find module ${plug.targetModule} for ${plug.sourceModule}`)
    };
  const newResolved = parseAndFindExport(resolved, plug.targetExport, resolve);
  if (!newResolved) {
    return {
      resolved: void 0,
      error: new Error(
        `Plugin target not found ${plug.targetModule}#${plug.sourceExport} for plugin ${plug.sourceModule}#${plug.sourceExport}`
      )
    };
  }
  return { resolved: newResolved, error: void 0 };
}

class Visitor {
  visitProgram(n) {
    switch (n.type) {
      case "Module":
        return this.visitModule(n);
      case "Script":
        return this.visitScript(n);
    }
  }
  visitModule(m) {
    m.body = this.visitModuleItems(m.body);
    return m;
  }
  visitScript(m) {
    m.body = this.visitStatements(m.body);
    return m;
  }
  visitModuleItems(items) {
    return items.map(this.visitModuleItem.bind(this));
  }
  visitModuleItem(n) {
    switch (n.type) {
      case "ExportDeclaration":
      case "ExportDefaultDeclaration":
      case "ExportNamedDeclaration":
      case "ExportDefaultExpression":
      case "ImportDeclaration":
      case "ExportAllDeclaration":
      case "TsImportEqualsDeclaration":
      case "TsExportAssignment":
      case "TsNamespaceExportDeclaration":
        return this.visitModuleDeclaration(n);
      default:
        return this.visitStatement(n);
    }
  }
  visitModuleDeclaration(n) {
    switch (n.type) {
      case "ExportDeclaration":
        return this.visitExportDeclaration(n);
      case "ExportDefaultDeclaration":
        return this.visitExportDefaultDeclaration(n);
      case "ExportNamedDeclaration":
        return this.visitExportNamedDeclaration(n);
      case "ExportDefaultExpression":
        return this.visitExportDefaultExpression(n);
      case "ImportDeclaration":
        return this.visitImportDeclaration(n);
      case "ExportAllDeclaration":
        return this.visitExportAllDeclaration(n);
      case "TsImportEqualsDeclaration":
        return this.visitTsImportEqualsDeclaration(n);
      case "TsExportAssignment":
        return this.visitTsExportAssignment(n);
      case "TsNamespaceExportDeclaration":
        return this.visitTsNamespaceExportDeclaration(n);
    }
  }
  visitTsNamespaceExportDeclaration(n) {
    n.id = this.visitBindingIdentifier(n.id);
    return n;
  }
  visitTsExportAssignment(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsImportEqualsDeclaration(n) {
    n.id = this.visitBindingIdentifier(n.id);
    n.moduleRef = this.visitTsModuleReference(n.moduleRef);
    return n;
  }
  visitTsModuleReference(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "TsExternalModuleReference":
        return this.visitTsExternalModuleReference(n);
      case "TsQualifiedName":
        return this.visitTsQualifiedName(n);
    }
  }
  visitTsExternalModuleReference(n) {
    n.expression = this.visitStringLiteral(n.expression);
    return n;
  }
  visitExportAllDeclaration(n) {
    n.source = this.visitStringLiteral(n.source);
    return n;
  }
  visitExportDefaultExpression(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitExportNamedDeclaration(n) {
    n.specifiers = this.visitExportSpecifiers(n.specifiers);
    n.source = this.visitOptionalStringLiteral(n.source);
    return n;
  }
  visitExportSpecifiers(nodes) {
    return nodes.map(this.visitExportSpecifier.bind(this));
  }
  visitExportSpecifier(n) {
    switch (n.type) {
      case "ExportDefaultSpecifier":
        return this.visitExportDefaultSpecifier(n);
      case "ExportNamespaceSpecifier":
        return this.visitExportNamespaceSpecifier(n);
      case "ExportSpecifier":
        return this.visitNamedExportSpecifier(n);
    }
  }
  visitNamedExportSpecifier(n) {
    if (n.exported) {
      n.exported = this.visitModuleExportName(n.exported);
    }
    n.orig = this.visitModuleExportName(n.orig);
    return n;
  }
  visitModuleExportName(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifier(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
    }
  }
  visitExportNamespaceSpecifier(n) {
    n.name = this.visitModuleExportName(n.name);
    return n;
  }
  visitExportDefaultSpecifier(n) {
    n.exported = this.visitBindingIdentifier(n.exported);
    return n;
  }
  visitOptionalStringLiteral(n) {
    if (n) {
      return this.visitStringLiteral(n);
    }
  }
  visitExportDefaultDeclaration(n) {
    n.decl = this.visitDefaultDeclaration(n.decl);
    return n;
  }
  visitDefaultDeclaration(n) {
    switch (n.type) {
      case "ClassExpression":
        return this.visitClassExpression(n);
      case "FunctionExpression":
        return this.visitFunctionExpression(n);
      case "TsInterfaceDeclaration":
        return this.visitTsInterfaceDeclaration(n);
    }
  }
  visitFunctionExpression(n) {
    n = this.visitFunction(n);
    if (n.identifier) {
      n.identifier = this.visitBindingIdentifier(n.identifier);
    }
    return n;
  }
  visitClassExpression(n) {
    n = this.visitClass(n);
    if (n.identifier) {
      n.identifier = this.visitBindingIdentifier(n.identifier);
    }
    return n;
  }
  visitExportDeclaration(n) {
    n.declaration = this.visitDeclaration(n.declaration);
    return n;
  }
  visitArrayExpression(e) {
    if (e.elements) {
      e.elements = e.elements.map(this.visitArrayElement.bind(this));
    }
    return e;
  }
  visitArrayElement(e) {
    if (e) {
      return this.visitExprOrSpread(e);
    }
  }
  visitExprOrSpread(e) {
    return {
      ...e,
      expression: this.visitExpression(e.expression)
    };
  }
  visitExprOrSpreads(nodes) {
    return nodes.map(this.visitExprOrSpread.bind(this));
  }
  visitSpreadElement(e) {
    e.arguments = this.visitExpression(e.arguments);
    return e;
  }
  visitOptionalExpression(e) {
    if (e) {
      return this.visitExpression(e);
    }
  }
  visitArrowFunctionExpression(e) {
    e.body = this.visitArrowBody(e.body);
    e.params = this.visitPatterns(e.params);
    e.returnType = this.visitTsTypeAnnotation(e.returnType);
    e.typeParameters = this.visitTsTypeParameterDeclaration(e.typeParameters);
    return e;
  }
  visitArrowBody(body) {
    switch (body.type) {
      case "BlockStatement":
        return this.visitBlockStatement(body);
      default:
        return this.visitExpression(body);
    }
  }
  visitBlockStatement(block) {
    block.stmts = this.visitStatements(block.stmts);
    return block;
  }
  visitStatements(stmts) {
    return stmts.map(this.visitStatement.bind(this));
  }
  visitStatement(stmt) {
    switch (stmt.type) {
      case "ClassDeclaration":
      case "FunctionDeclaration":
      case "TsEnumDeclaration":
      case "TsInterfaceDeclaration":
      case "TsModuleDeclaration":
      case "TsTypeAliasDeclaration":
      case "VariableDeclaration":
        return this.visitDeclaration(stmt);
      case "BreakStatement":
        return this.visitBreakStatement(stmt);
      case "BlockStatement":
        return this.visitBlockStatement(stmt);
      case "ContinueStatement":
        return this.visitContinueStatement(stmt);
      case "DebuggerStatement":
        return this.visitDebuggerStatement(stmt);
      case "DoWhileStatement":
        return this.visitDoWhileStatement(stmt);
      case "EmptyStatement":
        return this.visitEmptyStatement(stmt);
      case "ForInStatement":
        return this.visitForInStatement(stmt);
      case "ForOfStatement":
        return this.visitForOfStatement(stmt);
      case "ForStatement":
        return this.visitForStatement(stmt);
      case "IfStatement":
        return this.visitIfStatement(stmt);
      case "LabeledStatement":
        return this.visitLabeledStatement(stmt);
      case "ReturnStatement":
        return this.visitReturnStatement(stmt);
      case "SwitchStatement":
        return this.visitSwitchStatement(stmt);
      case "ThrowStatement":
        return this.visitThrowStatement(stmt);
      case "TryStatement":
        return this.visitTryStatement(stmt);
      case "WhileStatement":
        return this.visitWhileStatement(stmt);
      case "WithStatement":
        return this.visitWithStatement(stmt);
      case "ExpressionStatement":
        return this.visitExpressionStatement(stmt);
      default:
        throw new Error(`Unknown statement type: ${stmt.type}`);
    }
  }
  visitSwitchStatement(stmt) {
    stmt.discriminant = this.visitExpression(stmt.discriminant);
    stmt.cases = this.visitSwitchCases(stmt.cases);
    return stmt;
  }
  visitSwitchCases(cases) {
    return cases.map(this.visitSwitchCase.bind(this));
  }
  visitSwitchCase(c) {
    c.test = this.visitOptionalExpression(c.test);
    c.consequent = this.visitStatements(c.consequent);
    return c;
  }
  visitIfStatement(stmt) {
    stmt.test = this.visitExpression(stmt.test);
    stmt.consequent = this.visitStatement(stmt.consequent);
    stmt.alternate = this.visitOptionalStatement(stmt.alternate);
    return stmt;
  }
  visitOptionalStatement(stmt) {
    if (stmt) {
      return this.visitStatement(stmt);
    }
  }
  visitBreakStatement(stmt) {
    if (stmt.label) {
      stmt.label = this.visitLabelIdentifier(stmt.label);
    }
    return stmt;
  }
  visitWhileStatement(stmt) {
    stmt.test = this.visitExpression(stmt.test);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitTryStatement(stmt) {
    stmt.block = this.visitBlockStatement(stmt.block);
    stmt.handler = this.visitCatchClause(stmt.handler);
    if (stmt.finalizer) {
      stmt.finalizer = this.visitBlockStatement(stmt.finalizer);
    }
    return stmt;
  }
  visitCatchClause(handler) {
    if (handler) {
      if (handler.param) {
        handler.param = this.visitPattern(handler.param);
      }
      handler.body = this.visitBlockStatement(handler.body);
    }
    return handler;
  }
  visitThrowStatement(stmt) {
    stmt.argument = this.visitExpression(stmt.argument);
    return stmt;
  }
  visitReturnStatement(stmt) {
    if (stmt.argument) {
      stmt.argument = this.visitExpression(stmt.argument);
    }
    return stmt;
  }
  visitLabeledStatement(stmt) {
    stmt.label = this.visitLabelIdentifier(stmt.label);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitForStatement(stmt) {
    if (stmt.init) {
      if (stmt.init.type === "VariableDeclaration") {
        stmt.init = this.visitVariableDeclaration(stmt.init);
      } else {
        stmt.init = this.visitOptionalExpression(stmt.init);
      }
    }
    stmt.test = this.visitOptionalExpression(stmt.test);
    stmt.update = this.visitOptionalExpression(stmt.update);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitForOfStatement(stmt) {
    if (stmt.left.type === "VariableDeclaration") {
      stmt.left = this.visitVariableDeclaration(stmt.left);
    } else {
      stmt.left = this.visitPattern(stmt.left);
    }
    stmt.right = this.visitExpression(stmt.right);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitForInStatement(stmt) {
    if (stmt.left.type === "VariableDeclaration") {
      stmt.left = this.visitVariableDeclaration(stmt.left);
    } else {
      stmt.left = this.visitPattern(stmt.left);
    }
    stmt.right = this.visitExpression(stmt.right);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitEmptyStatement(stmt) {
    return stmt;
  }
  visitDoWhileStatement(stmt) {
    stmt.body = this.visitStatement(stmt.body);
    stmt.test = this.visitExpression(stmt.test);
    return stmt;
  }
  visitDebuggerStatement(stmt) {
    return stmt;
  }
  visitWithStatement(stmt) {
    stmt.object = this.visitExpression(stmt.object);
    stmt.body = this.visitStatement(stmt.body);
    return stmt;
  }
  visitDeclaration(decl) {
    switch (decl.type) {
      case "ClassDeclaration":
        return this.visitClassDeclaration(decl);
      case "FunctionDeclaration":
        return this.visitFunctionDeclaration(decl);
      case "TsEnumDeclaration":
        return this.visitTsEnumDeclaration(decl);
      case "TsInterfaceDeclaration":
        return this.visitTsInterfaceDeclaration(decl);
      case "TsModuleDeclaration":
        return this.visitTsModuleDeclaration(decl);
      case "TsTypeAliasDeclaration":
        return this.visitTsTypeAliasDeclaration(decl);
      case "VariableDeclaration":
        return this.visitVariableDeclaration(decl);
    }
  }
  visitVariableDeclaration(n) {
    n.declarations = this.visitVariableDeclarators(n.declarations);
    return n;
  }
  visitVariableDeclarators(nodes) {
    return nodes.map(this.visitVariableDeclarator.bind(this));
  }
  visitVariableDeclarator(n) {
    n.id = this.visitPattern(n.id);
    n.init = this.visitOptionalExpression(n.init);
    return n;
  }
  visitTsTypeAliasDeclaration(n) {
    n.id = this.visitBindingIdentifier(n.id);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    n.typeParams = this.visitTsTypeParameterDeclaration(n.typeParams);
    return n;
  }
  visitTsModuleDeclaration(n) {
    n.id = this.visitTsModuleName(n.id);
    if (n.body) {
      n.body = this.visitTsNamespaceBody(n.body);
    }
    return n;
  }
  visitTsModuleName(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
    }
  }
  visitTsNamespaceBody(n) {
    if (n) {
      switch (n.type) {
        case "TsModuleBlock":
          return this.visitTsModuleBlock(n);
        case "TsNamespaceDeclaration":
          return this.visitTsNamespaceDeclaration(n);
      }
    }
  }
  visitTsNamespaceDeclaration(n) {
    const body = this.visitTsNamespaceBody(n.body);
    if (body) {
      n.body = body;
    }
    n.id = this.visitBindingIdentifier(n.id);
    return n;
  }
  visitTsModuleBlock(n) {
    n.body = this.visitModuleItems(n.body);
    return n;
  }
  visitTsInterfaceDeclaration(n) {
    n.id = this.visitBindingIdentifier(n.id);
    n.typeParams = this.visitTsTypeParameterDeclaration(n.typeParams);
    n.extends = this.visitTsExpressionsWithTypeArguments(n.extends);
    n.body = this.visitTsInterfaceBody(n.body);
    return n;
  }
  visitTsInterfaceBody(n) {
    n.body = this.visitTsTypeElements(n.body);
    return n;
  }
  visitTsTypeElements(nodes) {
    return nodes.map(this.visitTsTypeElement.bind(this));
  }
  visitTsTypeElement(n) {
    switch (n.type) {
      case "TsCallSignatureDeclaration":
        return this.visitTsCallSignatureDeclaration(n);
      case "TsConstructSignatureDeclaration":
        return this.visitTsConstructSignatureDeclaration(n);
      case "TsPropertySignature":
        return this.visitTsPropertySignature(n);
      case "TsGetterSignature":
        return this.visitTsGetterSignature(n);
      case "TsSetterSignature":
        return this.visitTsSetterSignature(n);
      case "TsMethodSignature":
        return this.visitTsMethodSignature(n);
      case "TsIndexSignature":
        return this.visitTsIndexSignature(n);
    }
  }
  visitTsCallSignatureDeclaration(n) {
    n.params = this.visitTsFnParameters(n.params);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsConstructSignatureDeclaration(n) {
    n.params = this.visitTsFnParameters(n.params);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsPropertySignature(n) {
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsGetterSignature(n) {
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsSetterSignature(n) {
    n.param = this.visitTsFnParameter(n.param);
    return n;
  }
  visitTsMethodSignature(n) {
    n.params = this.visitTsFnParameters(n.params);
    n.typeAnn = this.visitTsTypeAnnotation(n.typeAnn);
    return n;
  }
  visitTsEnumDeclaration(n) {
    n.id = this.visitIdentifier(n.id);
    n.members = this.visitTsEnumMembers(n.members);
    return n;
  }
  visitTsEnumMembers(nodes) {
    return nodes.map(this.visitTsEnumMember.bind(this));
  }
  visitTsEnumMember(n) {
    n.id = this.visitTsEnumMemberId(n.id);
    n.init = this.visitOptionalExpression(n.init);
    return n;
  }
  visitTsEnumMemberId(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
    }
  }
  visitFunctionDeclaration(decl) {
    decl.identifier = this.visitIdentifier(decl.identifier);
    decl = this.visitFunction(decl);
    return decl;
  }
  visitClassDeclaration(decl) {
    decl = this.visitClass(decl);
    decl.identifier = this.visitIdentifier(decl.identifier);
    return decl;
  }
  visitClassBody(members) {
    return members.map(this.visitClassMember.bind(this));
  }
  visitClassMember(member) {
    switch (member.type) {
      case "ClassMethod":
        return this.visitClassMethod(member);
      case "ClassProperty":
        return this.visitClassProperty(member);
      case "Constructor":
        return this.visitConstructor(member);
      case "PrivateMethod":
        return this.visitPrivateMethod(member);
      case "PrivateProperty":
        return this.visitPrivateProperty(member);
      case "TsIndexSignature":
        return this.visitTsIndexSignature(member);
      case "EmptyStatement":
        return this.visitEmptyStatement(member);
      case "StaticBlock":
        return this.visitStaticBlock(member);
    }
  }
  visitTsIndexSignature(n) {
    n.params = this.visitTsFnParameters(n.params);
    if (n.typeAnnotation) n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitTsFnParameters(params) {
    return params.map(this.visitTsFnParameter.bind(this));
  }
  visitTsFnParameter(n) {
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitPrivateProperty(n) {
    n.decorators = this.visitDecorators(n.decorators);
    n.key = this.visitPrivateName(n.key);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    n.value = this.visitOptionalExpression(n.value);
    return n;
  }
  visitPrivateMethod(n) {
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.function = this.visitFunction(n.function);
    n.key = this.visitPrivateName(n.key);
    return n;
  }
  visitPrivateName(n) {
    return n;
  }
  visitConstructor(n) {
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.key = this.visitPropertyName(n.key);
    n.params = this.visitConstructorParameters(n.params);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    return n;
  }
  visitConstructorParameters(nodes) {
    return nodes.map(this.visitConstructorParameter.bind(this));
  }
  visitConstructorParameter(n) {
    switch (n.type) {
      case "TsParameterProperty":
        return this.visitTsParameterProperty(n);
      default:
        return this.visitParameter(n);
    }
  }
  visitStaticBlock(n) {
    n.body = this.visitBlockStatement(n.body);
    return n;
  }
  visitTsParameterProperty(n) {
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.decorators = this.visitDecorators(n.decorators);
    n.param = this.visitTsParameterPropertyParameter(n.param);
    return n;
  }
  visitTsParameterPropertyParameter(n) {
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitPropertyName(key) {
    switch (key.type) {
      case "Identifier":
        return this.visitBindingIdentifier(key);
      case "StringLiteral":
        return this.visitStringLiteral(key);
      case "NumericLiteral":
        return this.visitNumericLiteral(key);
      case "BigIntLiteral":
        return this.visitBigIntLiteral(key);
      default:
        return this.visitComputedPropertyKey(key);
    }
  }
  visitAccessibility(n) {
    return n;
  }
  visitClassProperty(n) {
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.decorators = this.visitDecorators(n.decorators);
    n.key = this.visitPropertyName(n.key);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    n.value = this.visitOptionalExpression(n.value);
    return n;
  }
  visitClassMethod(n) {
    n.accessibility = this.visitAccessibility(n.accessibility);
    n.function = this.visitFunction(n.function);
    n.key = this.visitPropertyName(n.key);
    return n;
  }
  visitComputedPropertyKey(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitClass(n) {
    n.decorators = this.visitDecorators(n.decorators);
    n.superClass = this.visitOptionalExpression(n.superClass);
    n.superTypeParams = this.visitTsTypeParameterInstantiation(n.superTypeParams);
    if (n.implements) {
      n.implements = this.visitTsExpressionsWithTypeArguments(n.implements);
    }
    n.body = this.visitClassBody(n.body);
    return n;
  }
  visitFunction(n) {
    n.decorators = this.visitDecorators(n.decorators);
    n.params = this.visitParameters(n.params);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    n.returnType = this.visitTsTypeAnnotation(n.returnType);
    n.typeParameters = this.visitTsTypeParameterDeclaration(n.typeParameters);
    return n;
  }
  visitTsExpressionsWithTypeArguments(nodes) {
    return nodes.map(this.visitTsExpressionWithTypeArguments.bind(this));
  }
  visitTsExpressionWithTypeArguments(n) {
    n.expression = this.visitExpression(n.expression);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    return n;
  }
  visitTsTypeParameterInstantiation(n) {
    if (n) {
      n.params = this.visitTsTypes(n.params);
    }
    return n;
  }
  visitTsTypes(nodes) {
    return nodes.map(this.visitTsType.bind(this));
  }
  visitTsEntityName(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "TsQualifiedName":
        return this.visitTsQualifiedName(n);
    }
  }
  visitTsQualifiedName(n) {
    n.left = this.visitTsEntityName(n.left);
    n.right = this.visitIdentifier(n.right);
    return n;
  }
  visitDecorators(nodes) {
    if (nodes) {
      return nodes.map(this.visitDecorator.bind(this));
    }
  }
  visitDecorator(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitExpressionStatement(stmt) {
    stmt.expression = this.visitExpression(stmt.expression);
    return stmt;
  }
  visitContinueStatement(stmt) {
    if (stmt.label) {
      stmt.label = this.visitLabelIdentifier(stmt.label);
    }
    return stmt;
  }
  visitExpression(n) {
    switch (n.type) {
      case "ArrayExpression":
        return this.visitArrayExpression(n);
      case "ArrowFunctionExpression":
        return this.visitArrowFunctionExpression(n);
      case "AssignmentExpression":
        return this.visitAssignmentExpression(n);
      case "AwaitExpression":
        return this.visitAwaitExpression(n);
      case "BigIntLiteral":
        return this.visitBigIntLiteral(n);
      case "BinaryExpression":
        return this.visitBinaryExpression(n);
      case "BooleanLiteral":
        return this.visitBooleanLiteral(n);
      case "CallExpression":
        return this.visitCallExpression(n);
      case "ClassExpression":
        return this.visitClassExpression(n);
      case "ConditionalExpression":
        return this.visitConditionalExpression(n);
      case "FunctionExpression":
        return this.visitFunctionExpression(n);
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXElement":
        return this.visitJSXElement(n);
      case "JSXEmptyExpression":
        return this.visitJSXEmptyExpression(n);
      case "JSXFragment":
        return this.visitJSXFragment(n);
      case "JSXMemberExpression":
        return this.visitJSXMemberExpression(n);
      case "JSXNamespacedName":
        return this.visitJSXNamespacedName(n);
      case "JSXText":
        return this.visitJSXText(n);
      case "MemberExpression":
        return this.visitMemberExpression(n);
      case "SuperPropExpression":
        return this.visitSuperPropExpression(n);
      case "MetaProperty":
        return this.visitMetaProperty(n);
      case "NewExpression":
        return this.visitNewExpression(n);
      case "NullLiteral":
        return this.visitNullLiteral(n);
      case "NumericLiteral":
        return this.visitNumericLiteral(n);
      case "ObjectExpression":
        return this.visitObjectExpression(n);
      case "ParenthesisExpression":
        return this.visitParenthesisExpression(n);
      case "PrivateName":
        return this.visitPrivateName(n);
      case "RegExpLiteral":
        return this.visitRegExpLiteral(n);
      case "SequenceExpression":
        return this.visitSequenceExpression(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
      case "TaggedTemplateExpression":
        return this.visitTaggedTemplateExpression(n);
      case "TemplateLiteral":
        return this.visitTemplateLiteral(n);
      case "ThisExpression":
        return this.visitThisExpression(n);
      case "TsAsExpression":
        return this.visitTsAsExpression(n);
      case "TsSatisfiesExpression":
        return this.visitTsSatisfiesExpression(n);
      case "TsNonNullExpression":
        return this.visitTsNonNullExpression(n);
      case "TsTypeAssertion":
        return this.visitTsTypeAssertion(n);
      case "TsConstAssertion":
        return this.visitTsConstAssertion(n);
      case "TsInstantiation":
        return this.visitTsInstantiation(n);
      case "UnaryExpression":
        return this.visitUnaryExpression(n);
      case "UpdateExpression":
        return this.visitUpdateExpression(n);
      case "YieldExpression":
        return this.visitYieldExpression(n);
      case "OptionalChainingExpression":
        return this.visitOptionalChainingExpression(n);
      case "Invalid":
        return n;
    }
  }
  visitOptionalChainingExpression(n) {
    n.base = this.visitMemberExpressionOrOptionalChainingCall(n.base);
    return n;
  }
  visitMemberExpressionOrOptionalChainingCall(n) {
    switch (n.type) {
      case "MemberExpression":
        return this.visitMemberExpression(n);
      case "CallExpression":
        return this.visitOptionalChainingCall(n);
    }
  }
  visitOptionalChainingCall(n) {
    n.callee = this.visitExpression(n.callee);
    n.arguments = this.visitExprOrSpreads(n.arguments);
    if (n.typeArguments) n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    return n;
  }
  visitAssignmentExpression(n) {
    n.left = this.visitPatternOrExpression(n.left);
    n.right = this.visitExpression(n.right);
    return n;
  }
  visitPatternOrExpression(n) {
    switch (n.type) {
      case "ObjectPattern":
      case "ArrayPattern":
      case "Identifier":
      case "AssignmentPattern":
      case "RestElement":
        return this.visitPattern(n);
      default:
        return this.visitExpression(n);
    }
  }
  visitYieldExpression(n) {
    n.argument = this.visitOptionalExpression(n.argument);
    return n;
  }
  visitUpdateExpression(n) {
    n.argument = this.visitExpression(n.argument);
    return n;
  }
  visitUnaryExpression(n) {
    n.argument = this.visitExpression(n.argument);
    return n;
  }
  visitTsTypeAssertion(n) {
    n.expression = this.visitExpression(n.expression);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    return n;
  }
  visitTsConstAssertion(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsInstantiation(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsNonNullExpression(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitTsAsExpression(n) {
    n.expression = this.visitExpression(n.expression);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    return n;
  }
  visitTsSatisfiesExpression(n) {
    n.expression = this.visitExpression(n.expression);
    n.typeAnnotation = this.visitTsType(n.typeAnnotation);
    return n;
  }
  visitThisExpression(n) {
    return n;
  }
  visitTemplateLiteral(n) {
    n.expressions = n.expressions.map(this.visitExpression.bind(this));
    return n;
  }
  visitParameters(n) {
    return n.map(this.visitParameter.bind(this));
  }
  visitParameter(n) {
    n.pat = this.visitPattern(n.pat);
    return n;
  }
  visitTaggedTemplateExpression(n) {
    n.tag = this.visitExpression(n.tag);
    const template = this.visitTemplateLiteral(n.template);
    if (template.type === "TemplateLiteral") {
      n.template = template;
    }
    return n;
  }
  visitSequenceExpression(n) {
    n.expressions = n.expressions.map(this.visitExpression.bind(this));
    return n;
  }
  visitRegExpLiteral(n) {
    return n;
  }
  visitParenthesisExpression(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitObjectExpression(n) {
    if (n.properties) {
      n.properties = this.visitObjectProperties(n.properties);
    }
    return n;
  }
  visitObjectProperties(nodes) {
    return nodes.map(this.visitObjectProperty.bind(this));
  }
  visitObjectProperty(n) {
    switch (n.type) {
      case "SpreadElement":
        return this.visitSpreadElement(n);
      default:
        return this.visitProperty(n);
    }
  }
  visitProperty(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifier(n);
      case "AssignmentProperty":
        return this.visitAssignmentProperty(n);
      case "GetterProperty":
        return this.visitGetterProperty(n);
      case "KeyValueProperty":
        return this.visitKeyValueProperty(n);
      case "MethodProperty":
        return this.visitMethodProperty(n);
      case "SetterProperty":
        return this.visitSetterProperty(n);
    }
  }
  visitSetterProperty(n) {
    n.key = this.visitPropertyName(n.key);
    n.param = this.visitPattern(n.param);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    return n;
  }
  visitMethodProperty(n) {
    n.key = this.visitPropertyName(n.key);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    n.decorators = this.visitDecorators(n.decorators);
    n.params = this.visitParameters(n.params);
    n.returnType = this.visitTsTypeAnnotation(n.returnType);
    n.typeParameters = this.visitTsTypeParameterDeclaration(n.typeParameters);
    return n;
  }
  visitKeyValueProperty(n) {
    n.key = this.visitPropertyName(n.key);
    n.value = this.visitExpression(n.value);
    return n;
  }
  visitGetterProperty(n) {
    n.key = this.visitPropertyName(n.key);
    if (n.body) {
      n.body = this.visitBlockStatement(n.body);
    }
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitAssignmentProperty(n) {
    n.key = this.visitIdentifier(n.key);
    n.value = this.visitExpression(n.value);
    return n;
  }
  visitNullLiteral(n) {
    return n;
  }
  visitNewExpression(n) {
    n.callee = this.visitExpression(n.callee);
    if (n.arguments) {
      n.arguments = this.visitArguments(n.arguments);
    }
    n.typeArguments = this.visitTsTypeArguments(n.typeArguments);
    return n;
  }
  visitTsTypeArguments(n) {
    if (n) {
      n.params = this.visitTsTypes(n.params);
    }
    return n;
  }
  visitArguments(nodes) {
    return nodes.map(this.visitArgument.bind(this));
  }
  visitArgument(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitMetaProperty(n) {
    return n;
  }
  visitMemberExpression(n) {
    n.object = this.visitExpression(n.object);
    switch (n.property.type) {
      case "Computed": {
        n.property = this.visitComputedPropertyKey(n.property);
        return n;
      }
      case "Identifier": {
        n.property = this.visitIdentifier(n.property);
        return n;
      }
      case "PrivateName": {
        n.property = this.visitPrivateName(n.property);
        return n;
      }
    }
  }
  visitSuperPropExpression(n) {
    switch (n.property.type) {
      case "Computed": {
        n.property = this.visitComputedPropertyKey(n.property);
        return n;
      }
      case "Identifier": {
        n.property = this.visitIdentifier(n.property);
        return n;
      }
    }
  }
  visitCallee(n) {
    if (n.type === "Super" || n.type === "Import") {
      return n;
    }
    return this.visitExpression(n);
  }
  visitJSXText(n) {
    return n;
  }
  visitJSXNamespacedName(n) {
    n.namespace = this.visitIdentifierReference(n.namespace);
    n.name = this.visitIdentifierReference(n.name);
    return n;
  }
  visitJSXMemberExpression(n) {
    n.object = this.visitJSXObject(n.object);
    n.property = this.visitIdentifierReference(n.property);
    return n;
  }
  visitJSXObject(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXMemberExpression":
        return this.visitJSXMemberExpression(n);
    }
  }
  visitJSXFragment(n) {
    n.opening = this.visitJSXOpeningFragment(n.opening);
    if (n.children) {
      n.children = this.visitJSXElementChildren(n.children);
    }
    n.closing = this.visitJSXClosingFragment(n.closing);
    return n;
  }
  visitJSXClosingFragment(n) {
    return n;
  }
  visitJSXElementChildren(nodes) {
    return nodes.map(this.visitJSXElementChild.bind(this));
  }
  visitJSXElementChild(n) {
    switch (n.type) {
      case "JSXElement":
        return this.visitJSXElement(n);
      case "JSXExpressionContainer":
        return this.visitJSXExpressionContainer(n);
      case "JSXFragment":
        return this.visitJSXFragment(n);
      case "JSXSpreadChild":
        return this.visitJSXSpreadChild(n);
      case "JSXText":
        return this.visitJSXText(n);
    }
  }
  visitJSXExpressionContainer(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitJSXSpreadChild(n) {
    n.expression = this.visitExpression(n.expression);
    return n;
  }
  visitJSXOpeningFragment(n) {
    return n;
  }
  visitJSXEmptyExpression(n) {
    return n;
  }
  visitJSXElement(n) {
    n.opening = this.visitJSXOpeningElement(n.opening);
    n.children = this.visitJSXElementChildren(n.children);
    n.closing = this.visitJSXClosingElement(n.closing);
    return n;
  }
  visitJSXClosingElement(n) {
    if (n) {
      n.name = this.visitJSXElementName(n.name);
    }
    return n;
  }
  visitJSXElementName(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXMemberExpression":
        return this.visitJSXMemberExpression(n);
      case "JSXNamespacedName":
        return this.visitJSXNamespacedName(n);
    }
  }
  visitJSXOpeningElement(n) {
    n.name = this.visitJSXElementName(n.name);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    n.attributes = this.visitJSXAttributeOrSpreads(n.attributes);
    return n;
  }
  visitJSXAttributes(attrs) {
    if (attrs) return attrs.map(this.visitJSXAttributeOrSpread.bind(this));
  }
  visitJSXAttributeOrSpread(n) {
    switch (n.type) {
      case "JSXAttribute":
        return this.visitJSXAttribute(n);
      case "SpreadElement":
        return this.visitSpreadElement(n);
    }
  }
  visitJSXAttributeOrSpreads(nodes) {
    return nodes.map(this.visitJSXAttributeOrSpread.bind(this));
  }
  visitJSXAttribute(n) {
    n.name = this.visitJSXAttributeName(n.name);
    n.value = this.visitJSXAttributeValue(n.value);
    return n;
  }
  visitJSXAttributeValue(n) {
    if (!n) return n;
    switch (n.type) {
      case "BooleanLiteral":
        return this.visitBooleanLiteral(n);
      case "NullLiteral":
        return this.visitNullLiteral(n);
      case "NumericLiteral":
        return this.visitNumericLiteral(n);
      case "JSXText":
        return this.visitJSXText(n);
      case "StringLiteral":
        return this.visitStringLiteral(n);
      case "JSXElement":
        return this.visitJSXElement(n);
      case "JSXExpressionContainer":
        return this.visitJSXExpressionContainer(n);
      case "JSXFragment":
        return this.visitJSXFragment(n);
    }
    return n;
  }
  visitJSXAttributeName(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitIdentifierReference(n);
      case "JSXNamespacedName":
        return this.visitJSXNamespacedName(n);
    }
  }
  visitConditionalExpression(n) {
    n.test = this.visitExpression(n.test);
    n.consequent = this.visitExpression(n.consequent);
    n.alternate = this.visitExpression(n.alternate);
    return n;
  }
  visitCallExpression(n) {
    n.callee = this.visitCallee(n.callee);
    n.typeArguments = this.visitTsTypeParameterInstantiation(n.typeArguments);
    if (n.arguments) {
      n.arguments = this.visitArguments(n.arguments);
    }
    return n;
  }
  visitBooleanLiteral(n) {
    return n;
  }
  visitBinaryExpression(n) {
    n.left = this.visitExpression(n.left);
    n.right = this.visitExpression(n.right);
    return n;
  }
  visitAwaitExpression(n) {
    n.argument = this.visitExpression(n.argument);
    return n;
  }
  visitTsTypeParameterDeclaration(n) {
    if (n) {
      n.parameters = this.visitTsTypeParameters(n.parameters);
    }
    return n;
  }
  visitTsTypeParameters(nodes) {
    return nodes.map(this.visitTsTypeParameter.bind(this));
  }
  visitTsTypeParameter(n) {
    if (n.constraint) {
      n.constraint = this.visitTsType(n.constraint);
    }
    if (n.default) {
      n.default = this.visitTsType(n.default);
    }
    n.name = this.visitIdentifierReference(n.name);
    return n;
  }
  visitTsTypeAnnotation(a) {
    if (a) {
      a.typeAnnotation = this.visitTsType(a.typeAnnotation);
    }
    return a;
  }
  visitTsType(n) {
    return n;
  }
  visitPatterns(nodes) {
    return nodes.map(this.visitPattern.bind(this));
  }
  visitImportDeclaration(n) {
    n.source = this.visitStringLiteral(n.source);
    n.specifiers = this.visitImportSpecifiers(n.specifiers || []);
    return n;
  }
  visitImportSpecifiers(nodes) {
    return nodes.map(this.visitImportSpecifier.bind(this));
  }
  visitImportSpecifier(node) {
    switch (node.type) {
      case "ImportDefaultSpecifier":
        return this.visitImportDefaultSpecifier(node);
      case "ImportNamespaceSpecifier":
        return this.visitImportNamespaceSpecifier(node);
      case "ImportSpecifier":
        return this.visitNamedImportSpecifier(node);
    }
  }
  visitNamedImportSpecifier(node) {
    node.local = this.visitBindingIdentifier(node.local);
    if (node.imported) {
      node.imported = this.visitModuleExportName(node.imported);
    }
    return node;
  }
  visitImportNamespaceSpecifier(node) {
    node.local = this.visitBindingIdentifier(node.local);
    return node;
  }
  visitImportDefaultSpecifier(node) {
    node.local = this.visitBindingIdentifier(node.local);
    return node;
  }
  visitBindingIdentifier(i) {
    if (i.typeAnnotation) {
      i.typeAnnotation = this.visitTsTypeAnnotation(i.typeAnnotation);
    }
    return this.visitIdentifier(i);
  }
  visitIdentifierReference(i) {
    return this.visitIdentifier(i);
  }
  visitLabelIdentifier(label) {
    return this.visitIdentifier(label);
  }
  visitIdentifier(n) {
    return n;
  }
  visitStringLiteral(n) {
    return n;
  }
  visitNumericLiteral(n) {
    return n;
  }
  visitBigIntLiteral(n) {
    return n;
  }
  visitPattern(n) {
    switch (n.type) {
      case "Identifier":
        return this.visitBindingIdentifier(n);
      case "ArrayPattern":
        return this.visitArrayPattern(n);
      case "ObjectPattern":
        return this.visitObjectPattern(n);
      case "AssignmentPattern":
        return this.visitAssignmentPattern(n);
      case "RestElement":
        return this.visitRestElement(n);
      default:
        return this.visitExpression(n);
    }
  }
  visitRestElement(n) {
    n.argument = this.visitPattern(n.argument);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitAssignmentPattern(n) {
    n.left = this.visitPattern(n.left);
    n.right = this.visitExpression(n.right);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitObjectPattern(n) {
    n.properties = this.visitObjectPatternProperties(n.properties || []);
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    return n;
  }
  visitObjectPatternProperties(nodes) {
    return nodes.map(this.visitObjectPatternProperty.bind(this));
  }
  visitObjectPatternProperty(n) {
    switch (n.type) {
      case "AssignmentPatternProperty":
        return this.visitAssignmentPatternProperty(n);
      case "KeyValuePatternProperty":
        return this.visitKeyValuePatternProperty(n);
      case "RestElement":
        return this.visitRestElement(n);
    }
  }
  visitKeyValuePatternProperty(n) {
    n.key = this.visitPropertyName(n.key);
    n.value = this.visitPattern(n.value);
    return n;
  }
  visitAssignmentPatternProperty(n) {
    n.key = this.visitBindingIdentifier(n.key);
    n.value = this.visitOptionalExpression(n.value);
    return n;
  }
  visitArrayPattern(n) {
    n.typeAnnotation = this.visitTsTypeAnnotation(n.typeAnnotation);
    n.elements = this.visitArrayPatternElements(n.elements);
    return n;
  }
  visitArrayPatternElements(nodes) {
    return nodes.map(this.visitArrayPatternElement.bind(this));
  }
  visitArrayPatternElement(n) {
    if (n) {
      n = this.visitPattern(n);
    }
    return n;
  }
}

class RenameVisitor extends Visitor {
  constructor(replace, suffix) {
    super();
    this.replace = replace;
    this.suffix = suffix;
  }
  visitIdentifier(n) {
    if (this.replace.includes(n.value)) n.value = this.suffix(n.value);
    return n;
  }
}

function isPluginBaseConfig(plugin) {
  return typeof plugin.type === "string" && typeof plugin.sourceModule === "string" && typeof plugin.enabled === "boolean" && typeof plugin.targetExport === "string";
}
function isReactPluginConfig(plugin) {
  if (!isPluginBaseConfig(plugin)) return false;
  return plugin.type === "component";
}
function isMethodPluginConfig(plugin) {
  if (!isPluginBaseConfig(plugin)) return false;
  return plugin.type === "function";
}
function isReplacePluginConfig(plugin) {
  if (!isPluginBaseConfig(plugin)) return false;
  return plugin.type === "replace";
}
function isPluginConfig(plugin) {
  return isPluginBaseConfig(plugin);
}
const SOURCE_START = "/** SOURCE_START */";
const SOURCE_END = "/** SOURCE_END */";
const originalSuffix = "Original";
const interceptorSuffix = "Interceptor";
const disabledSuffix = "Disabled";
const name = (plugin) => `${plugin.sourceExport}${plugin.sourceModule.split("/")[plugin.sourceModule.split("/").length - 1].replace(/[^a-zA-Z0-9]/g, "")}`;
const fileName = (plugin) => `${plugin.sourceModule}#${plugin.sourceExport}`;
const originalName = (n) => `${n}${originalSuffix}`;
const sourceName = (n) => `${n}`;
const interceptorName = (n) => `${n}${interceptorSuffix}`;
const interceptorPropsName = (n) => `${n}Props`;
function moveRelativeDown(plugins) {
  return [...plugins].sort((a, b) => {
    if (a.sourceModule.startsWith(".") && !b.sourceModule.startsWith(".")) return 1;
    if (!a.sourceModule.startsWith(".") && b.sourceModule.startsWith(".")) return -1;
    return 0;
  });
}
const generateIdentifyer = (s) => Math.abs(
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0)
).toString();
function extractIdentifier(source) {
  if (!source) return null;
  const match = source.match(/\/\* hash:(\d+) \*\//);
  if (!match) return null;
  return match[1];
}
async function generateInterceptor(interceptor, config, oldInterceptorSource) {
  const identifer = generateIdentifyer(JSON.stringify(interceptor) + JSON.stringify(config));
  const { dependency, targetExports, source } = interceptor;
  if (oldInterceptorSource && identifer === extractIdentifier(oldInterceptorSource))
    return { ...interceptor, template: oldInterceptorSource };
  const pluginConfigs = [...Object.entries(targetExports)].map(([, plugins]) => plugins).flat();
  const duplicateImports = /* @__PURE__ */ new Set();
  const pluginImports = moveRelativeDown(
    [...pluginConfigs].sort((a, b) => a.sourceModule.localeCompare(b.sourceModule))
  ).map(
    (plugin) => `import { ${plugin.sourceExport} as ${sourceName(name(plugin))} } from '${plugin.sourceModule}'`
  ).filter((str) => {
    if (duplicateImports.has(str)) return false;
    duplicateImports.add(str);
    return true;
  }).join("\n");
  const ast = parseSync(source);
  new RenameVisitor(Object.keys(targetExports), (s) => originalName(s)).visitModule(ast);
  const pluginExports = Object.entries(targetExports).map(([base, plugins]) => {
    const duplicateInterceptors = /* @__PURE__ */ new Set();
    let carry = originalName(base);
    let carryProps = [];
    const pluginSee = [];
    pluginSee.push(
      `@see {@link file://${interceptor.sourcePathRelative}} for original source file`
    );
    const pluginStr = plugins.reverse().filter((p) => {
      if (duplicateInterceptors.has(name(p))) return false;
      duplicateInterceptors.add(name(p));
      return true;
    }).map((p) => {
      let result;
      const wrapChain = plugins.reverse().map((pl) => name(pl)).join(" wrapping ");
      if (isReplacePluginConfig(p)) {
        new RenameVisitor(
          [originalName(p.targetExport)],
          (s) => s.replace(originalSuffix, disabledSuffix)
        ).visitModule(ast);
        carryProps.push(`React.ComponentProps<typeof ${sourceName(name(p))}>`);
        pluginSee.push(
          `@see {${sourceName(name(p))}} for replacement of the original source (original source not used)`
        );
      }
      if (isReactPluginConfig(p)) {
        const withBraces = config.pluginStatus || process.env.NODE_ENV === "development";
        result = `
              type ${interceptorPropsName(name(p))} = ${carryProps.join(" & ")} & OmitPrev<React.ComponentProps<typeof ${sourceName(name(p))}>, 'Prev'>
              
              const ${interceptorName(name(p))} = (props: ${interceptorPropsName(name(p))}) => ${withBraces ? "{" : "("}
                ${config.pluginStatus ? `logOnce(\`\u{1F50C} Rendering ${base} with plugin(s): ${wrapChain} wrapping <${base}/>\`)` : ""}

                ${process.env.NODE_ENV === "development" ? `if(!props['data-plugin'])
                  logOnce('${fileName(p)} does not spread props to prev: <Prev {...props}/>. This will cause issues if multiple plugins are applied to this component.')` : ""}
                ${withBraces ? "return" : ""} <${sourceName(name(p))} {...props} Prev={${carry}} />
              ${withBraces ? "}" : ")"}`;
        carryProps = [interceptorPropsName(name(p))];
        pluginSee.push(`@see {${sourceName(name(p))}} for source of applied plugin`);
      }
      if (isMethodPluginConfig(p)) {
        result = `const ${interceptorName(name(p))}: typeof ${carry} = (...args) => {
                ${config.pluginStatus ? `logOnce(\`\u{1F50C} Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`)` : ""}
                return ${sourceName(name(p))}(${carry}, ...args)
              }`;
        pluginSee.push(`@see {${sourceName(name(p))}} for source of applied plugin`);
      }
      carry = p.type === "replace" ? sourceName(name(p)) : interceptorName(name(p));
      return result;
    }).filter((v) => !!v).join("\n");
    const isComponent = plugins.every((p) => isReactPluginConfig(p));
    if (isComponent && plugins.some((p) => isMethodPluginConfig(p))) {
      throw new Error(`Cannot mix React and Method plugins for ${base} in ${dependency}.`);
    }
    const seeString = `
      /**
       * Here you see the 'interceptor' that is applying all the configured plugins.
       *
       * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
       * 
       ${pluginSee.map((s) => `* ${s}`).join("\n")}
       */`;
    if (process.env.NODE_ENV === "development" && isComponent) {
      return `${pluginStr}
          ${seeString}
          export const ${base}: typeof ${carry} = (props) => {
            return <${carry} {...props} data-plugin />
          }`;
    }
    return `
        ${pluginStr}
        ${seeString}
        export const ${base} = ${carry}
      `;
  }).join("\n");
  const logOnce = config.pluginStatus || process.env.NODE_ENV === "development" ? `
        const logged: Set<string> = new Set();
        const logOnce = (log: string, ...additional: unknown[]) => {
          if (logged.has(log)) return
          logged.add(log)
          console.warn(log, ...additional)
        }
        ` : "";
  const template = `/* hash:${identifer} */
    /* eslint-disable */
    /* This file is automatically generated for ${dependency} */
    ${Object.values(targetExports).some((t) => t.some((p) => p.type === "component")) ? "import type { DistributedOmit as OmitPrev } from 'type-fest'" : ""}

    ${pluginImports}

    /** @see {@link file://${interceptor.sourcePathRelative}} for source of original */
    ${SOURCE_START}
    ${printSync(ast).code}
    ${SOURCE_END}
    ${logOnce}${pluginExports}
  `;
  let templateFormatted;
  try {
    templateFormatted = await prettier.format(template, { ...prettierConf, parser: "typescript" });
  } catch (e) {
    console.log("Error formatting interceptor: ", e, "using raw template.");
    templateFormatted = template;
  }
  return { ...interceptor, template: templateFormatted };
}

async function generateInterceptors(plugins, resolve, config, force) {
  const byTargetModuleAndExport = moveRelativeDown(plugins).reduce(
    (acc, plug) => {
      let { sourceModule: pluginPath } = plug;
      if (!isPluginConfig(plug) || !plug.enabled) return acc;
      const result = resolve(plug.targetModule, { includeSources: true });
      const { error, resolved } = findOriginalSource(plug, result, resolve);
      if (error) {
        console.error(error.message);
        return acc;
      }
      const { fromRoot } = resolved;
      if (pluginPath.startsWith(".")) {
        const resolvedPlugin = resolve(pluginPath);
        if (resolvedPlugin) {
          pluginPath = path.relative(
            resolved.fromRoot.split("/").slice(0, -1).join("/"),
            resolvedPlugin.fromRoot
          );
        }
      }
      if (!acc[resolved.fromRoot]) {
        acc[resolved.fromRoot] = {
          ...resolved,
          target: `${resolved.fromRoot}.interceptor`,
          targetExports: {}
        };
      }
      if (!acc[fromRoot].targetExports[plug.targetExport])
        acc[fromRoot].targetExports[plug.targetExport] = [];
      acc[fromRoot].targetExports[plug.targetExport].push({ ...plug, sourceModule: pluginPath });
      return acc;
    },
    {}
  );
  return Object.fromEntries(
    await Promise.all(
      Object.entries(byTargetModuleAndExport).map(async ([target, interceptor]) => {
        const file = `${interceptor.fromRoot}.interceptor.tsx`;
        const originalSource = !force && await fs$1.access(file, fs$1.constants.F_OK).then(() => true).catch(() => false) ? (await fs$1.readFile(file)).toString() : void 0;
        return [
          target,
          await generateInterceptor(interceptor, config ?? {}, originalSource)
        ];
      })
    )
  );
}

function checkFileExists(file) {
  return fs$1.access(file, fs$1.constants.F_OK).then(() => true).catch(() => false);
}
async function writeInterceptors(interceptors, cwd = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd);
  const existing = /* @__PURE__ */ new Set();
  dependencies.forEach((dependency) => {
    const files = sync(
      [`${dependency}/**/*.interceptor.tsx`, `${dependency}/**/*.interceptor.ts`],
      { cwd }
    );
    files.forEach((file) => existing.add(file));
  });
  const written = Object.entries(interceptors).map(async ([, plugin]) => {
    const extension = plugin.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
    const relativeFile = `${plugin.fromRoot}.interceptor${extension}`;
    if (existing.has(relativeFile)) {
      existing.delete(relativeFile);
    }
    if (existing.has(`./${relativeFile}`)) {
      existing.delete(`./${relativeFile}`);
    }
    const fileToWrite = path$1.join(cwd, relativeFile);
    const isSame = await checkFileExists(fileToWrite) && (await fs$1.readFile(fileToWrite, "utf8")).toString() === plugin.template;
    if (!isSame) await fs$1.writeFile(fileToWrite, plugin.template);
  });
  const cleaned = [...existing].map(
    async (file) => await checkFileExists(file) && await fs$1.unlink(file)
  );
  await Promise.all(written);
  await Promise.all(cleaned);
}

let interceptors;
let interceptorByDepependency;
let generating = false;
class InterceptorPlugin {
  constructor(config, regenerate = false) {
    this.config = config;
    this.regenerate = regenerate;
    this.resolveDependency = resolveDependency();
    if (regenerate) this.#generateInterceptors();
  }
  resolveDependency;
  #generateInterceptors = async () => {
    if (generating) return {};
    generating = true;
    const [plugins] = findPlugins(this.config);
    const generatedInterceptors = await generateInterceptors(
      plugins,
      this.resolveDependency,
      this.config.debug
    );
    await writeInterceptors(generatedInterceptors);
    interceptors = generatedInterceptors;
    interceptorByDepependency = Object.fromEntries(
      Object.values(interceptors).map((i) => [i.dependency, i])
    );
    generating = false;
    return generatedInterceptors;
  };
  /** @public */
  apply(compiler) {
    const logger = compiler.getInfrastructureLogger("InterceptorPlugin");
    if (this.regenerate) {
      compiler.hooks.afterCompile.tap("InterceptorPlugin", (compilation) => {
        const [plugins, errors] = findPlugins(this.config);
        plugins.forEach((p) => {
          const source = this.resolveDependency(p.sourceModule);
          if (source) {
            const absoluteFilePath = `${path$1.join(process.cwd(), source.fromRoot)}.tsx`;
            compilation.fileDependencies.add(absoluteFilePath);
          }
        });
        this.#generateInterceptors().then((i) => {
          Object.entries(i).forEach(([, { sourcePath }]) => {
            const absoluteFilePath = path$1.join(process.cwd(), sourcePath);
            compilation.fileDependencies.add(absoluteFilePath);
          });
        });
      });
    }
    compiler.hooks.normalModuleFactory.tap("InterceptorPlugin", (nmf) => {
      nmf.hooks.beforeResolve.tap("InterceptorPlugin", (resource) => {
        const issuer = resource.contextInfo.issuer ?? "";
        const requestPath = path$1.relative(
          process.cwd(),
          path$1.resolve(resource.context, resource.request)
        );
        if (!interceptors || !interceptorByDepependency) {
          return;
        }
        const split = requestPath.split("/");
        const targets = [
          `${split[split.length - 1]}.interceptor.tsx`,
          `${split[split.length - 1]}.interceptor.ts`
        ];
        if (targets.some((target) => issuer.endsWith(target)) && interceptors[requestPath]) {
          logger.log(`Interceptor ${issuer} is requesting the original ${requestPath}`);
          return;
        }
        const interceptorForRequest = interceptorByDepependency[resource.request];
        if (interceptorForRequest) {
          const extension = interceptorForRequest.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
          resource.request = `${interceptorForRequest.denormalized}.interceptor${extension}`;
          logger.log(`Intercepting dep... ${interceptorForRequest.dependency}`, resource.request);
        }
        const interceptorForPath = interceptors[requestPath];
        if (interceptorForPath) {
          const extension = interceptorForPath.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
          resource.request = `${resource.request}.interceptor${extension}`;
          logger.log(`Intercepting fromRoot... ${interceptorForPath.dependency}`, resource.request);
        }
      });
    });
  }
}

let graphcommerceConfig;
function domains(config) {
  return Object.values(
    config.storefront.reduce(
      (acc, loc) => {
        if (!loc.domain) return acc;
        acc[loc.domain] = {
          defaultLocale: loc.locale,
          locales: [...acc[loc.domain]?.locales ?? [], loc.locale],
          domain: loc.domain,
          http: process.env.NODE_ENV === "development" || void 0
        };
        return acc;
      },
      {}
    )
  );
}
function withGraphCommerce(nextConfig, cwd = process.cwd()) {
  graphcommerceConfig ??= loadConfig(cwd);
  const importMetaPaths = configToImportMeta(graphcommerceConfig);
  const { storefront } = graphcommerceConfig;
  const transpilePackages = [
    ...[...resolveDependenciesSync().keys()].slice(1),
    ...nextConfig.transpilePackages ?? []
  ];
  return {
    ...nextConfig,
    bundlePagesRouterDependencies: true,
    experimental: {
      ...nextConfig.experimental,
      scrollRestoration: true,
      swcPlugins: [...nextConfig.experimental?.swcPlugins ?? [], ["@lingui/swc-plugin", {}]]
    },
    i18n: {
      ...nextConfig.i18n,
      defaultLocale: storefront.find((locale) => locale.defaultLocale)?.locale ?? storefront[0].locale,
      locales: storefront.map((locale) => locale.locale),
      domains: [...domains(graphcommerceConfig), ...nextConfig.i18n?.domains ?? []]
    },
    images: {
      ...nextConfig.images,
      remotePatterns: [
        "magentoEndpoint" in graphcommerceConfig ? {
          hostname: new URL(graphcommerceConfig.magentoEndpoint).hostname
        } : void 0,
        { hostname: "**.graphassets.com" },
        { hostname: "*.graphcommerce.org" },
        ...nextConfig.images?.remotePatterns ?? []
      ].filter((v) => !!v)
    },
    rewrites: async () => {
      let rewrites = await nextConfig.rewrites?.() ?? [];
      if (Array.isArray(rewrites)) {
        rewrites = { beforeFiles: rewrites, afterFiles: [], fallback: [] };
      }
      if ("productRoute" in graphcommerceConfig && typeof graphcommerceConfig.productRoute === "string" && graphcommerceConfig.productRoute !== "/p/") {
        rewrites.beforeFiles.push({
          source: `${graphcommerceConfig.productRoute ?? "/p/"}:path*`,
          destination: "/p/:path*"
        });
      }
      return rewrites;
    },
    transpilePackages,
    webpack: (config, options) => {
      if (!config.module) config.module = { rules: [] };
      config.module = {
        ...config.module,
        rules: [
          ...config.module.rules ?? [],
          // Allow importing yml/yaml files for graphql-mesh
          { test: /\.ya?ml$/, use: "js-yaml-loader" },
          // @lingui .po file support
          { test: /\.po/, use: "@lingui/loader" }
        ],
        exprContextCritical: false
      };
      if (!config.plugins) config.plugins = [];
      config.plugins.push(new webpack.DefinePlugin(importMetaPaths));
      config.plugins.push(new webpack.DefinePlugin({ "globalThis.__DEV__": options.dev }));
      if (!options.isServer) ;
      config.snapshot = {
        ...config.snapshot ?? {},
        managedPaths: [
          new RegExp(`^(.+?[\\/]node_modules[\\/])(?!${transpilePackages.join("|")})`)
        ]
      };
      config.watchOptions = {
        ...config.watchOptions ?? {},
        ignored: new RegExp(
          `^((?:[^/]*(?:/|$))*)(.(git|next)|(node_modules[\\/](?!${transpilePackages.join(
            "|"
          )})))(/((?:[^/]*(?:/|$))*)(?:$|/))?`
        )
      };
      if (!config.resolve) config.resolve = {};
      if (!options.isServer && !options.dev) {
        config.resolve.alias = {
          ...config.resolve.alias,
          "@mui/base": "@mui/base/modern",
          "@mui/lab": "@mui/lab/modern",
          "@mui/material": "@mui/material/modern",
          "@mui/styled-engine": "@mui/styled-engine/modern",
          "@mui/system": "@mui/system/modern"
        };
      }
      config.plugins.push(new InterceptorPlugin(graphcommerceConfig, !options.isServer));
      return typeof nextConfig.webpack === "function" ? nextConfig.webpack(config, options) : config;
    }
  };
}

dotenv.config();
const packages = [...resolveDependenciesSync().values()].filter((p) => p !== ".");
const resolve = resolveDependency();
const schemaLocations = packages.map((p) => `${p}/**/Config.graphqls`);
async function generateConfig() {
  const resolved = resolve("@graphcommerce/next-config");
  if (!resolved) throw Error("Could not resolve @graphcommerce/next-config");
  const targetTs = `${resolved.root}/src/generated/config.ts`;
  const targetJs = `${resolved.root}/dist/generated/config.js`;
  await generate({
    silent: true,
    schema: ["graphql/**/Config.graphqls", ...schemaLocations],
    generates: {
      [targetTs]: {
        plugins: ["typescript", "typescript-validation-schema"],
        config: {
          // enumsAsTypes: true,
          schema: "zod",
          notAllowEmptyString: true,
          strictScalars: true,
          enumsAsTypes: true,
          scalarSchemas: {
            Domain: "z.string()",
            DateTime: "z.date()",
            RichTextAST: "z.object.json()"
          }
        }
      },
      ...findParentPath(process.cwd()) && {
        "../../docs/framework/config.md": {
          plugins: ["@graphcommerce/graphql-codegen-markdown-docs"]
        }
      }
    }
  });
  writeFileSync(
    targetTs,
    await prettier.format(readFileSync(targetTs, "utf-8"), {
      ...prettierConf,
      parser: "typescript",
      plugins: prettierConf.plugins?.filter(
        (p) => typeof p === "string" && !p.includes("prettier-plugin-sort-imports")
      )
    })
  );
  const result = transformFileSync(targetTs, {
    module: { type: "nodenext" },
    env: { targets: { node: "18" } }
  });
  writeFileSync(targetJs, result.code);
}

const fmt = (value) => {
  let formattedValue = value;
  if (typeof formattedValue === "boolean") {
    formattedValue = formattedValue ? "1" : "0";
  }
  if (typeof formattedValue === "object") {
    formattedValue = JSON.stringify(formattedValue);
  }
  if (typeof formattedValue === "number") {
    formattedValue = String(formattedValue);
  }
  return formattedValue;
};
function exportConfigToEnv(config) {
  let env = "";
  Object.entries(config).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val, idx) => {
        env += `${toEnvStr([key, `${idx}`])}='${fmt(val)}'
`;
      });
    } else {
      env += `${toEnvStr([key])}='${fmt(value)}'
`;
    }
  });
  return env;
}

dotenv.config();
async function exportConfig() {
  const conf = loadConfig(process.cwd());
  console.log(exportConfigToEnv(conf));
}

dotenv.config();
async function codegenInterceptors() {
  const conf = loadConfig(process.cwd());
  const [plugins] = findPlugins(conf);
  const generatedInterceptors = await generateInterceptors(
    plugins,
    resolveDependency(),
    conf.debug,
    true
  );
  await writeInterceptors(generatedInterceptors);
}

const debug = (...args) => {
  if (process.env.DEBUG) console.info("[copy-files]", ...args);
};
const MANAGED_BY_GC = "// managed by: graphcommerce";
const MANAGED_LOCALLY = "// managed by: local";
const GITIGNORE_SECTION_START = "# managed by: graphcommerce";
const GITIGNORE_SECTION_END = "# end managed by: graphcommerce";
async function updateGitignore(managedFiles) {
  const escapedFiles = managedFiles.map(
    (file) => (
      // Escape special characters in file names
      file.replace(/[*+?^${}()|[\]\\]/g, "\\$&")
    )
  ).sort();
  const gitignorePath = path$1.join(process.cwd(), ".gitignore");
  let content;
  try {
    content = await fs$2.readFile(gitignorePath, "utf-8");
    debug("Reading existing .gitignore");
  } catch (err) {
    debug(".gitignore not found, creating new file");
    content = "";
  }
  const sectionRegex = new RegExp(
    `${GITIGNORE_SECTION_START}[\\s\\S]*?${GITIGNORE_SECTION_END}\\n?`,
    "g"
  );
  content = content.replace(sectionRegex, "");
  if (escapedFiles.length > 0) {
    const newSection = [
      GITIGNORE_SECTION_START,
      ...escapedFiles,
      GITIGNORE_SECTION_END,
      ""
      // Empty line at the end
    ].join("\n");
    content = `${content.trim()}

${newSection}`;
    debug(`Updated .gitignore with ${managedFiles.length} managed files`);
  } else {
    content = `${content.trim()}
`;
    debug("Cleaned up .gitignore managed section");
  }
  await fs$2.writeFile(gitignorePath, content);
}
function getFileManagement(content) {
  if (!content) return "graphcommerce";
  const contentStr = content.toString();
  if (contentStr.startsWith(MANAGED_LOCALLY)) return "local";
  if (contentStr.startsWith(MANAGED_BY_GC)) return "graphcommerce";
  return "unmanaged";
}
async function copyFiles() {
  const startTime = performance.now();
  debug("Starting copyFiles");
  const cwd = process.cwd();
  const deps = resolveDependenciesSync();
  const packages = [...deps.values()].filter((p) => p !== ".");
  const fileMap = /* @__PURE__ */ new Map();
  const managedFiles = /* @__PURE__ */ new Set();
  const existingManagedFiles = /* @__PURE__ */ new Set();
  const scanStart = performance.now();
  try {
    const gitignorePatterns = [
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/.git/**",
      "**/node_modules/**"
    ];
    const allFiles = await fg("**/*", {
      cwd,
      dot: true,
      ignore: gitignorePatterns,
      onlyFiles: true
    });
    debug(
      `Found ${allFiles.length} project files in ${(performance.now() - scanStart).toFixed(0)}ms`
    );
    const readStart = performance.now();
    await Promise.all(
      allFiles.map(async (file) => {
        const filePath = path$1.join(cwd, file);
        try {
          const content = await fs$2.readFile(filePath);
          if (getFileManagement(content) === "graphcommerce") {
            existingManagedFiles.add(file);
            debug(`Found existing managed file: ${file}`);
          }
        } catch (err) {
          debug(`Error reading file ${file}:`, err);
        }
      })
    );
    debug(
      `Read ${existingManagedFiles.size} managed files in ${(performance.now() - readStart).toFixed(0)}ms`
    );
  } catch (err) {
    debug("Error scanning project files:", err);
  }
  const collectStart = performance.now();
  await Promise.all(
    packages.map(async (pkg) => {
      const copyDir = path$1.join(pkg, "copy");
      try {
        const files = await fg("**/*", { cwd: copyDir, dot: true, suppressErrors: true });
        if (files.length > 0) {
          debug(`Found files in ${pkg}:`, files);
          for (const file of files) {
            const sourcePath = path$1.join(copyDir, file);
            const existing = fileMap.get(file);
            if (existing) {
              console.error(`Error: File conflict detected for '${file}'
Found in packages:
  - ${existing.packagePath} -> ${existing.sourcePath}
  - ${pkg} -> ${sourcePath}`);
              process.exit(1);
            }
            fileMap.set(file, { sourcePath, packagePath: pkg });
          }
        }
      } catch (err) {
        if (err.code === "ENOENT") return;
        console.error(
          `Error scanning directory ${copyDir}: ${err.message}
Path: ${copyDir}`
        );
        process.exit(1);
      }
    })
  );
  debug(`Collected ${fileMap.size} files in ${(performance.now() - collectStart).toFixed(0)}ms`);
  const copyStart = performance.now();
  await Promise.all(
    Array.from(fileMap.entries()).map(async ([file, { sourcePath }]) => {
      const targetPath = path$1.join(cwd, file);
      debug(`Processing file: ${file}`);
      try {
        await fs$2.mkdir(path$1.dirname(targetPath), { recursive: true });
        const sourceContent = await fs$2.readFile(sourcePath);
        const contentWithComment = Buffer.concat([
          Buffer.from(
            `${MANAGED_BY_GC}
// to modify this file, change it to managed by: local

`
          ),
          sourceContent
        ]);
        let targetContent;
        try {
          targetContent = await fs$2.readFile(targetPath);
          const management = getFileManagement(targetContent);
          if (management === "local") {
            debug(`File ${file} is managed locally, skipping`);
            return;
          }
          if (management === "unmanaged") {
            console.info(
              `Note: File ${file} has been modified. Add '${MANAGED_LOCALLY.trim()}' at the top to manage it locally.`
            );
            debug(`File ${file} doesn't have management comment, skipping`);
            return;
          }
          debug(`File ${file} is managed by graphcommerce, will update if needed`);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.error(`Error reading file ${file}: ${err.message}
Source: ${sourcePath}`);
            process.exit(1);
          }
          console.info(`Creating new file: ${file}
Source: ${sourcePath}`);
          debug("File does not exist yet");
        }
        if (targetContent && Buffer.compare(contentWithComment, targetContent) === 0) {
          debug(`File ${file} content is identical to source, skipping`);
          managedFiles.add(file);
          return;
        }
        await fs$2.writeFile(targetPath, contentWithComment);
        if (targetContent) {
          console.info(`Updated managed file: ${file}`);
          debug(`Overwrote existing file: ${file}`);
        }
        if (!targetContent || targetContent.toString().startsWith(MANAGED_BY_GC)) {
          managedFiles.add(file);
          debug("Added managed file:", file);
        }
      } catch (err) {
        console.error(`Error copying file ${file}: ${err.message}
Source: ${sourcePath}`);
        process.exit(1);
      }
    })
  );
  debug(`Copied ${managedFiles.size} files in ${(performance.now() - copyStart).toFixed(0)}ms`);
  const removeStart = performance.now();
  const filesToRemove = Array.from(existingManagedFiles).filter((file) => !managedFiles.has(file));
  debug(`Files to remove: ${filesToRemove.length}`);
  async function cleanupEmptyDirs(startPath) {
    let currentDir = startPath;
    while (currentDir !== cwd) {
      try {
        const dirContents = await fs$2.readdir(currentDir);
        if (dirContents.length === 0) {
          await fs$2.rmdir(currentDir);
          debug(`Removed empty directory: ${currentDir}`);
          currentDir = path$1.dirname(currentDir);
        } else {
          break;
        }
      } catch (err) {
        if (err.code === "EACCES") {
          console.error(`Error cleaning up directory ${currentDir}: ${err.message}`);
          process.exit(1);
        }
        break;
      }
    }
  }
  await Promise.all(
    filesToRemove.map(async (file) => {
      const filePath = path$1.join(cwd, file);
      const dirPath = path$1.dirname(filePath);
      try {
        await fs$2.readdir(dirPath);
        try {
          await fs$2.unlink(filePath);
          console.info(`Removed managed file: ${file}`);
          debug(`Removed file: ${file}`);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.error(`Error removing file ${file}: ${err.message}`);
            process.exit(1);
          }
        }
        await cleanupEmptyDirs(dirPath);
      } catch (err) {
        if (err.code === "EACCES") {
          console.error(`Error accessing directory ${dirPath}: ${err.message}`);
          process.exit(1);
        }
      }
    })
  );
  debug(`Removed files in ${(performance.now() - removeStart).toFixed(0)}ms`);
  if (managedFiles.size > 0) {
    debug("Found managed files:", Array.from(managedFiles));
    await updateGitignore(Array.from(managedFiles));
  } else {
    debug("No managed files found, cleaning up .gitignore section");
    await updateGitignore([]);
  }
  debug(`Total execution time: ${(performance.now() - startTime).toFixed(0)}ms`);
}

async function codegen() {
  console.info("\u{1F504} Copying files from packages to project...");
  await copyFiles();
  console.info("\u2699\uFE0F  Generating GraphCommerce config types...");
  await generateConfig();
  console.info("\u{1F50C} Generating interceptors...");
  await codegenInterceptors();
}

export { GraphCommerceConfigSchema, codegen, codegenInterceptors, configToImportMeta, copyFiles, exportConfig, findParentPath, g, generateConfig, loadConfig, packageRoots, replaceConfigInString, resolveDependenciesSync, sig, sortDependencies, withGraphCommerce };
