import{createRequire as _pkgrollCR}from"node:module";const require=_pkgrollCR(import.meta.url);import fs from 'node:fs';
import path from 'node:path';
import assert from 'assert';
import crypto from 'crypto';
import { GraphCommerceConfigSchema } from './generated/config.js';
export { GraphCommerceDebugConfigSchema, GraphCommerceStorefrontConfigSchema } from './generated/config.js';
import webpack from 'webpack';
import { cosmiconfigSync } from 'cosmiconfig';
import chalk from 'chalk';
import lodash from 'lodash';
import { z, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodObject, ZodArray, ZodNumber, ZodString, ZodEnum, ZodBoolean } from 'zod';
import { writeFileSync, readFileSync } from 'fs';
import prettierConf from '@graphcommerce/prettier-config-pwa';
import { generate } from '@graphql-codegen/cli';
import { transformFileSync, parseFileSync, parseSync as parseSync$1 } from '@swc/core';
import dotenv from 'dotenv';
import prettier from 'prettier';
import { sync } from 'glob';
import fs$1 from 'node:fs/promises';
import path$1 from 'path';
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
      return typeof nextConfig.webpack === "function" ? nextConfig.webpack(config, options) : config;
    }
  };
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

function isPluginBaseConfig(plugin) {
  return typeof plugin.type === "string" && typeof plugin.sourceModule === "string" && typeof plugin.enabled === "boolean" && typeof plugin.targetExport === "string";
}
function isPluginConfig(plugin) {
  return isPluginBaseConfig(plugin);
}
function moveRelativeDown(plugins) {
  return [...plugins].sort((a, b) => {
    if (a.sourceModule.startsWith(".") && !b.sourceModule.startsWith(".")) return 1;
    if (!a.sourceModule.startsWith(".") && b.sourceModule.startsWith(".")) return -1;
    return 0;
  });
}
const originalSuffix = "Original";
const interceptorSuffix = "Interceptor";
const name = (plugin) => `${plugin.sourceExport}${plugin.sourceModule.split("/")[plugin.sourceModule.split("/").length - 1].replace(/[^a-zA-Z0-9]/g, "")}`;
const sourceName = (n) => `${n}`;
const generateIdentifyer = (s) => Math.abs(
  s.split("").reduce((a, b) => {
    const value = (a << 5) - a + b.charCodeAt(0) & 4294967295;
    return value < 0 ? value * -2 : value;
  }, 0)
).toString();
async function generateInterceptor(interceptor, config, oldInterceptorSource) {
  const identifer = generateIdentifyer(JSON.stringify(interceptor) + JSON.stringify(config));
  const { dependency, targetExports } = interceptor;
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
  }).join("\n    ");
  const originalImports = [...Object.entries(targetExports)].filter(([targetExport, plugins]) => {
    return !plugins.some((p) => p.type === "replace");
  }).map(([targetExport]) => {
    interceptor.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
    const importPath = `./${interceptor.target.split("/").pop()}.original`;
    return `import { ${targetExport} as ${targetExport}${originalSuffix} } from '${importPath}'`;
  }).join("\n    ");
  let logOnce = "";
  const pluginExports = [...Object.entries(targetExports)].map(([targetExport, plugins]) => {
    if (plugins.some((p) => p.type === "component")) {
      const componentPlugins = plugins.filter((p) => p.type === "component");
      const replacePlugin = plugins.find((p) => p.type === "replace");
      let carry = replacePlugin ? sourceName(name(replacePlugin)) : `${targetExport}${originalSuffix}`;
      const pluginSee = [];
      if (replacePlugin) {
        pluginSee.push(
          `@see {${sourceName(name(replacePlugin))}} for source of replaced component`
        );
      } else {
        pluginSee.push(`@see {@link file://./${targetExport}.tsx} for original source file`);
      }
      const pluginInterceptors = componentPlugins.reverse().map((plugin) => {
        const pluginName = sourceName(name(plugin));
        const interceptorName2 = `${pluginName}${interceptorSuffix}`;
        const propsName = `${pluginName}Props`;
        pluginSee.push(`@see {${pluginName}} for source of applied plugin`);
        const result = `type ${propsName} = OmitPrev<
  React.ComponentProps<typeof ${pluginName}>,
  'Prev'
>

const ${interceptorName2} = (
  props: ${propsName},
) => (
  <${pluginName}
    {...props}
    Prev={${carry}}
  />
)`;
        carry = interceptorName2;
        return result;
      }).join("\n\n");
      const seeString = `/**
 * Here you see the 'interceptor' that is applying all the configured plugins.
 *
 * This file is NOT meant to be modified directly and is auto-generated if the plugins or the
 * original source changes.
 *
${pluginSee.map((s) => ` * ${s}`).join("\n")}
 */`;
      return `${pluginInterceptors}

${seeString}
export const ${targetExport} = ${carry}`;
    } else if (plugins.some((p) => p.type === "function")) {
      const functionPlugins = plugins.filter((p) => p.type === "function");
      const replacePlugin = plugins.find((p) => p.type === "replace");
      let carry = replacePlugin ? sourceName(name(replacePlugin)) : `${targetExport}${originalSuffix}`;
      const pluginSee = [];
      if (replacePlugin) {
        pluginSee.push(
          `@see {${sourceName(name(replacePlugin))}} for source of replaced function`
        );
      } else {
        pluginSee.push(`@see {@link file://./${targetExport}.ts} for original source file`);
      }
      const pluginInterceptors = functionPlugins.reverse().map((plugin) => {
        const pluginName = sourceName(name(plugin));
        const interceptorName2 = `${pluginName}${interceptorSuffix}`;
        pluginSee.push(`@see {${pluginName}} for source of applied plugin`);
        const result = `const ${interceptorName2}: typeof ${carry} = (...args) => {
  return ${pluginName}(${carry}, ...args)
}`;
        carry = interceptorName2;
        return result;
      }).join("\n");
      const seeString = `/**
 * Here you see the 'interceptor' that is applying all the configured plugins.
 *
 * This file is NOT meant to be modified directly and is auto-generated if the plugins or the
 * original source changes.
 *
${pluginSee.map((s) => ` * ${s}`).join("\n")}
 */`;
      return `${pluginInterceptors}

${seeString}
export const ${targetExport} = ${carry}`;
    } else if (plugins.some((p) => p.type === "replace")) {
      const replacePlugin = plugins.find((p) => p.type === "replace");
      if (replacePlugin) {
        return `export { ${replacePlugin.sourceExport} as ${targetExport} } from '${replacePlugin.sourceModule}'`;
      }
    }
    return "";
  }).filter(Boolean).join("\n\n    ");
  const template = `/* hash:${identifer} */
    /* eslint-disable */
    /* This file is automatically generated for ${dependency} */
    ${Object.values(targetExports).some((t) => t.some((p) => p.type === "component")) ? "import type { DistributedOmit as OmitPrev } from 'type-fest'" : ""}

    ${pluginImports}

    ${originalImports}

    // Re-export everything from the original file except the intercepted exports
    export * from './${interceptor.target.split("/").pop()}.original'

    ${logOnce}${pluginExports}
  `;
  const formatted = await prettier.format(template, {
    ...prettierConf,
    parser: "typescript"
  });
  return { ...interceptor, template: formatted };
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
          target: resolved.fromRoot,
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
        `${interceptor.fromRoot}.tsx`;
        `${interceptor.fromRoot}.ts`;
        const extension = interceptor.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
        `${interceptor.fromRoot}${extension}`;
        return [
          target,
          await generateInterceptor(interceptor, config ?? {})
        ];
      })
    )
  );
}

function checkFileExists$1(file) {
  return fs$1.access(file, fs$1.constants.F_OK).then(() => true).catch(() => false);
}
async function writeInterceptors(interceptors, cwd = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd);
  const existingInterceptors = /* @__PURE__ */ new Set();
  dependencies.forEach((dependency) => {
    if (dependency.includes("node_modules")) return;
    const files = sync(
      [`${dependency}/**/*.interceptor.tsx`, `${dependency}/**/*.interceptor.ts`],
      { cwd }
    );
    files.forEach((file) => existingInterceptors.add(file));
  });
  const existingOriginals = /* @__PURE__ */ new Set();
  dependencies.forEach((dependency) => {
    if (dependency.includes("node_modules")) return;
    const files = sync([`${dependency}/**/*.original.tsx`, `${dependency}/**/*.original.ts`], {
      cwd
    });
    files.forEach((file) => existingOriginals.add(file));
  });
  const processedFiles = /* @__PURE__ */ new Set();
  const activeInterceptorFiles = /* @__PURE__ */ new Set();
  const written = Object.entries(interceptors).map(async ([, plugin]) => {
    if (plugin.fromRoot.includes("node_modules")) {
      console.warn(`Skipping node_modules file: ${plugin.fromRoot}`);
      return;
    }
    const extension = plugin.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
    const originalFilePath = path$1.join(cwd, `${plugin.fromRoot}${extension}`);
    const originalBackupPath = path$1.join(cwd, `${plugin.fromRoot}.original${extension}`);
    processedFiles.add(`${plugin.fromRoot}.original${extension}`);
    activeInterceptorFiles.add(`${plugin.fromRoot}${extension}`);
    const originalExists = await checkFileExists$1(originalFilePath);
    if (!originalExists) {
      console.warn(`Original file not found: ${originalFilePath}`);
      return;
    }
    const backupExists = await checkFileExists$1(originalBackupPath);
    if (!backupExists) {
      try {
        await fs$1.rename(originalFilePath, originalBackupPath);
      } catch (error) {
        console.error(`Failed to move original file ${originalFilePath}:`, error);
        return;
      }
    }
    try {
      await fs$1.writeFile(originalFilePath, plugin.template);
    } catch (error) {
      console.error(`Failed to write interceptor file ${originalFilePath}:`, error);
    }
  });
  const cleanedInterceptors = [...existingInterceptors].filter((file) => !file.includes("node_modules")).map(async (file) => {
    const fullPath = path$1.join(cwd, file);
    if (await checkFileExists$1(fullPath)) {
      await fs$1.unlink(fullPath);
      console.info(`Removed old interceptor file: ${file}`);
    }
  });
  const cleanedOriginals = [...existingOriginals].filter((file) => !processedFiles.has(file) && !file.includes("node_modules")).map(async (file) => {
    const fullPath = path$1.join(cwd, file);
    const originalPath = fullPath.replace(".original.", ".");
    if (await checkFileExists$1(fullPath)) {
      const mainFileExists = await checkFileExists$1(originalPath);
      if (mainFileExists) {
        const mainFileContent = await fs$1.readFile(originalPath, "utf8");
        const isInterceptor = mainFileContent.includes("/* hash:") && mainFileContent.includes("/* This file is automatically generated");
        if (isInterceptor) {
          await fs$1.unlink(originalPath);
          await fs$1.rename(fullPath, originalPath);
          console.info(
            `Plugin deleted - restored original file: ${file.replace(".original.", ".")}`
          );
        } else {
          await fs$1.unlink(fullPath);
          console.info(`Removed orphaned original file: ${file}`);
        }
      } else {
        await fs$1.rename(fullPath, originalPath);
        console.info(`Restored original file: ${file.replace(".original.", ".")}`);
      }
    }
  });
  const orphanedInterceptors = [];
  dependencies.forEach((dependency) => {
    if (dependency.includes("node_modules") || dependency.includes("packagesDev") || dependency.includes("/packagesDev/") || dependency.startsWith("packagesDev/") || path$1.resolve(cwd, dependency).includes("packagesDev"))
      return;
    const files = sync([`${dependency}/**/*.tsx`, `${dependency}/**/*.ts`], { cwd });
    files.forEach((file) => {
      const fullPath = path$1.join(cwd, file);
      if (!activeInterceptorFiles.has(file)) {
        orphanedInterceptors.push(checkAndRestoreOrphanedInterceptor(fullPath, file));
      }
    });
  });
  await Promise.all(written);
  await Promise.all(cleanedInterceptors);
  await Promise.all(cleanedOriginals);
  await Promise.all(orphanedInterceptors);
}
async function checkAndRestoreOrphanedInterceptor(fullPath, relativePath, cwd) {
  try {
    if (!await checkFileExists$1(fullPath)) return;
    if (fullPath.includes("packagesDev") || relativePath.includes("packagesDev") || fullPath.includes("/packagesDev/")) {
      return;
    }
    const content = await fs$1.readFile(fullPath, "utf8");
    const isInterceptor = content.includes("/* hash:") && content.includes("/* This file is automatically generated");
    if (isInterceptor) {
      const originalPath = fullPath.replace(/\.(tsx?)$/, ".original.$1");
      if (await checkFileExists$1(originalPath)) {
        await fs$1.unlink(fullPath);
        await fs$1.rename(originalPath, fullPath);
        console.info(`Restored orphaned interceptor: ${relativePath}`);
      } else {
        await fs$1.unlink(fullPath);
        console.info(`Removed orphaned interceptor (no original): ${relativePath}`);
      }
    }
  } catch (error) {
    console.error(`Error checking orphaned interceptor ${relativePath}:`, error);
  }
}

dotenv.config();
async function codegenInterceptors() {
  const conf = loadConfig(process.cwd());
  const [plugins] = findPlugins(conf);
  const generatedInterceptors = await generateInterceptors(
    plugins,
    resolveDependency(),
    conf.debug);
  await writeInterceptors(generatedInterceptors);
  console.info("\u2705 Generated interceptors and moved original files");
}

dotenv.config();
function checkFileExists(file) {
  return fs$1.access(file, fs$1.constants.F_OK).then(() => true).catch(() => false);
}
async function cleanupInterceptors(cwd = process.cwd()) {
  console.info("\u{1F9F9} Starting interceptor cleanup...");
  const dependencies = resolveDependenciesSync(cwd);
  let restoredCount = 0;
  let removedCount = 0;
  const originalFiles = [];
  dependencies.forEach((dependency) => {
    if (dependency.includes("node_modules")) return;
    const files = sync([`${dependency}/**/*.original.tsx`, `${dependency}/**/*.original.ts`], {
      cwd
    });
    originalFiles.push(...files);
  });
  console.info(`\u{1F4C2} Found ${originalFiles.length} .original files to restore`);
  const restorePromises = originalFiles.map(async (originalFile) => {
    const fullOriginalPath = path.join(cwd, originalFile);
    const restoredPath = fullOriginalPath.replace(/\.original\.(tsx?)$/, ".$1");
    try {
      if (await checkFileExists(fullOriginalPath)) {
        if (await checkFileExists(restoredPath)) {
          await fs$1.unlink(restoredPath);
        }
        await fs$1.rename(fullOriginalPath, restoredPath);
        restoredCount++;
        console.info(`\u2705 Restored: ${originalFile.replace(".original.", ".")}`);
      }
    } catch (error) {
      console.error(`\u274C Failed to restore ${originalFile}:`, error);
    }
  });
  await Promise.all(restorePromises);
  const interceptorFiles = [];
  dependencies.forEach((dependency) => {
    if (dependency.includes("node_modules")) return;
    const files = sync(
      [`${dependency}/**/*.interceptor.tsx`, `${dependency}/**/*.interceptor.ts`],
      { cwd }
    );
    interceptorFiles.push(...files);
  });
  console.info(`\u{1F5D1}\uFE0F  Found ${interceptorFiles.length} .interceptor files to remove`);
  const removeInterceptorPromises = interceptorFiles.map(async (interceptorFile) => {
    const fullPath = path.join(cwd, interceptorFile);
    try {
      if (await checkFileExists(fullPath)) {
        await fs$1.unlink(fullPath);
        removedCount++;
        console.info(`\u{1F5D1}\uFE0F  Removed: ${interceptorFile}`);
      }
    } catch (error) {
      console.error(`\u274C Failed to remove ${interceptorFile}:`, error);
    }
  });
  await Promise.all(removeInterceptorPromises);
  const allFiles = [];
  dependencies.forEach((dependency) => {
    if (dependency.includes("node_modules") || dependency.includes("packagesDev") || !dependency.startsWith("packages/"))
      return;
    const files = sync([`${dependency}/**/*.tsx`, `${dependency}/**/*.ts`], {
      cwd,
      ignore: ["**/*.original.*", "**/*.interceptor.*", "**/node_modules/**"]
    });
    allFiles.push(...files);
  });
  console.info(`\u{1F50D} Checking ${allFiles.length} files for generated interceptors...`);
  const cleanupGeneratedPromises = allFiles.map(async (file) => {
    const fullPath = path.join(cwd, file);
    try {
      if (await checkFileExists(fullPath)) {
        const content = await fs$1.readFile(fullPath, "utf8");
        const hasHashComment = content.includes("/* hash:");
        const hasGeneratedComment = content.includes("/* This file is automatically generated");
        const isGeneratedInterceptor = hasHashComment && hasGeneratedComment;
        if (isGeneratedInterceptor) {
          await fs$1.unlink(fullPath);
          removedCount++;
          console.info(`\u{1F5D1}\uFE0F  Removed generated interceptor: ${file}`);
        }
      }
    } catch (error) {
      console.error(`\u274C Failed to check/remove ${file}:`, error);
    }
  });
  await Promise.all(cleanupGeneratedPromises);
  console.info("");
  console.info("\u2705 Interceptor cleanup completed!");
  console.info(`\u{1F4CA} Summary:`);
  console.info(`   - ${restoredCount} files restored from .original`);
  console.info(`   - ${removedCount} interceptor files removed`);
  console.info("");
  console.info(
    '\u{1F4A1} You can now run "yarn graphcommerce codegen-interceptors" to regenerate interceptors'
  );
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

export { GraphCommerceConfigSchema, cleanupInterceptors, codegen, codegenInterceptors, configToImportMeta, copyFiles, exportConfig, findParentPath, g, generateConfig, loadConfig, packageRoots, replaceConfigInString, resolveDependenciesSync, sig, sortDependencies, withGraphCommerce };
