import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'path';
import { glob, sync } from 'glob';
import { findParentPath } from './utils/findParentPath.js';
import { l as loadConfig, t as toEnvStr } from './loadConfig-C9xRVdWx.js';
export { r as replaceConfigInString } from './loadConfig-C9xRVdWx.js';
import { parseFileSync, parseSync as parseSync$1, transformFileSync } from '@swc/core';
import fs$1 from 'node:fs';
import path$1 from 'node:path';
import assert from 'assert';
import crypto from 'crypto';
import lodash from 'lodash';
import { z } from 'zod';
import prettierConf from '@graphcommerce/prettier-config-pwa';
import prettier from 'prettier';
import fs$2 from 'fs/promises';
import fg from 'fast-glob';
import { writeFileSync, readFileSync, existsSync, rmSync, mkdirSync } from 'fs';
import { generate } from '@graphql-codegen/cli';
import { GraphCommerceConfigSchema } from './generated/config.js';
export { GraphCommerceDebugConfigSchema, GraphCommerceStorefrontConfigSchema } from './generated/config.js';
import 'cosmiconfig';
import '@apollo/client/utilities/index.js';
import 'chalk';

async function fsExists(file) {
  try {
    await fs.access(file, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
async function fsRealpath(file) {
  return await fsExists(file) ? fs.realpath(file) : file;
}
async function restoreOriginalFile(fileWithOriginalInTheName) {
  const restoredPath = fileWithOriginalInTheName.replace(/\.original\.(tsx?)$/, ".$1");
  if (await fsExists(fileWithOriginalInTheName)) {
    if (await fsExists(restoredPath)) {
      await fs.unlink(restoredPath);
    }
    await fs.rename(fileWithOriginalInTheName, restoredPath);
    return true;
  }
  return false;
}
async function findDotOriginalFiles(cwd) {
  let parentPath = findParentPath(process.cwd());
  while (parentPath) {
    const p = findParentPath(parentPath);
    if (p) parentPath = p;
    else break;
  }
  return Promise.all(
    (await glob([`${parentPath}/**/*.original.tsx`, `${parentPath}/**/*.original.ts`], { cwd })).map((file) => fs.realpath(file))
  );
}
async function writeInterceptors(interceptors, cwd = process.cwd()) {
  const processedFiles = [];
  const existingDotOriginalFiles = findDotOriginalFiles(cwd);
  const written = Object.entries(interceptors).map(async ([, plugin]) => {
    const extension = plugin.sourcePath.endsWith(".tsx") ? ".tsx" : ".ts";
    const targetFileName = `${plugin.fromRoot}${extension}`;
    const fileNameDotOriginal = `${plugin.fromRoot}.original${extension}`;
    const targetFilePath = await fsRealpath(path.resolve(cwd, targetFileName));
    const dotOriginalPath = await fsRealpath(path.resolve(cwd, fileNameDotOriginal));
    processedFiles.push(dotOriginalPath);
    const targetSource = await fsExists(targetFilePath) ? await fs.readFile(targetFilePath, "utf8") : null;
    const dotOriginalSource = await fsExists(dotOriginalPath) ? await fs.readFile(dotOriginalPath, "utf8") : null;
    const isPreviouslyApplied = dotOriginalSource !== null && targetSource?.includes("/* hash:");
    let status = "";
    if (isPreviouslyApplied) {
      if (targetSource === plugin.template) {
        status = "\u2705 Unchanged interceptor";
      } else {
        status = "\u{1F504} Updating interceptor";
        await fs.writeFile(targetFilePath, plugin.template);
      }
    } else {
      status = "\u{1F195} Creating interceptor";
      await fs.rename(targetFilePath, dotOriginalPath);
      await fs.writeFile(targetFilePath, plugin.template);
    }
    console.log(`${status} ${plugin.dependency}`);
    Object.entries(plugin.targetExports).forEach(([target, plugins]) => {
      plugins.forEach((plugin2) => {
        console.log(`  \u{1F50C} ${target} <- ${plugin2.sourceModule}`);
      });
    });
  });
  await Promise.all(written);
  const toRestore = (await existingDotOriginalFiles).filter(
    (file) => !processedFiles.includes(file)
  );
  await Promise.all(
    toRestore.map((file) => {
      console.log(`\u21A9 Removing old interceptor ${file}`);
      return restoreOriginalFile(file);
    })
  );
}

dotenv.config();
async function cleanupInterceptors(cwd = process.cwd()) {
  console.info("\u{1F9F9} Starting interceptor cleanup...");
  let restoredCount = 0;
  let removedCount = 0;
  const originalFiles = await findDotOriginalFiles(cwd);
  console.info(`\u{1F4C2} Found ${originalFiles.length} .original files to restore`);
  for (const originalFile of originalFiles) {
    try {
      await restoreOriginalFile(originalFile);
      removedCount++;
    } catch (error) {
      console.error(`\u274C Failed to restore ${originalFile}:`, error);
    }
  }
  console.info("\u2705 Interceptor cleanup completed!");
  console.info(`\u{1F4CA} ${restoredCount} files restored from .original`);
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
  let dir = id.startsWith("/") ? id : import.meta.resolve(id);
  if (dir.startsWith("file://")) dir = new URL(dir).pathname;
  let packageJsonLocation = path$1.join(dir, "package.json");
  while (!fs$1.existsSync(packageJsonLocation)) {
    dir = path$1.dirname(dir);
    if (dir === root) throw Error(`Can't find package.json for ${id}`);
    packageJsonLocation = path$1.join(dir, "package.json");
  }
  return packageJsonLocation;
}
function resolveRecursivePackageJson(dependencyPath, dependencyStructure, root, additionalDependencies = []) {
  const isRoot = dependencyPath === root;
  const fileName = findPackageJson(dependencyPath, root);
  if (!fileName) throw Error(`Can't find package.json for ${dependencyPath}`);
  const packageJsonFile = fs$1.readFileSync(fileName, "utf-8").toString();
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
    dirName: path$1.dirname(path$1.relative(process.cwd(), fileName)),
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
  const exports$1 = {};
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
            exports$1[moduleItem.declaration.identifier.value] = RUNTIME_VALUE;
            break;
          case "VariableDeclaration":
            moduleItem.declaration.declarations.forEach((decl) => {
              if (isIdentifier(decl.id) && decl.init) {
                exports$1[decl.id.value] = extractValue(decl.init, void 0, true);
              }
            });
            break;
        }
    }
  }
  return [exports$1, errors];
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
  const [exports$1, errors] = extractExports(ast);
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
  } = exports$1;
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
      targetExport: exports$1.component || exports$1.func || parsed.data.export,
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
  const exports$1 = ast.body.filter((node) => node.type === "ExportAllDeclaration").sort((a, b) => {
    const probablyA = a.source.value.includes(findExport);
    const probablyB = b.source.value.includes(findExport);
    return probablyA === probablyB ? 0 : probablyA ? -1 : 1;
  });
  for (const node of exports$1) {
    const isRelative = node.source.value.startsWith(".");
    if (isRelative) {
      const d = resolved.dependency === resolved.denormalized ? resolved.dependency.substring(0, resolved.dependency.lastIndexOf("/")) : resolved.dependency;
      const newPath = path.join(d, node.source.value);
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
const stableStringify = (obj) => {
  if (obj === null || obj === void 0) return String(obj);
  if (typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(",")}]`;
  const keys = Object.keys(obj).sort();
  const pairs = keys.map((key) => `${JSON.stringify(key)}:${stableStringify(obj[key])}`);
  return `{${pairs.join(",")}}`;
};
async function generateInterceptor(interceptor, config, oldInterceptorSource) {
  const hashInput = {
    dependency: interceptor.dependency,
    targetExports: interceptor.targetExports,
    // Only include config properties that affect the output
    debugConfig: config.pluginStatus ? { pluginStatus: config.pluginStatus } : {}
  };
  const identifer = generateIdentifyer(stableStringify(hashInput));
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
          pluginPath = path$1.relative(
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
            const exists = fs$1.existsSync(candidatePath);
            if (includeSources && exists) {
              source = fs$1.readFileSync(candidatePath, "utf-8");
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

async function updatePackageExports(plugins, cwd = process.cwd()) {
  const deps = resolveDependenciesSync();
  const packages = [...deps.values()].filter((p) => p !== ".");
  const roots = packageRoots(packages);
  console.log(`\u{1F50D} Scanning ${roots.length} package roots for plugins...`);
  const pluginsByPackage = /* @__PURE__ */ new Map();
  for (const root of roots) {
    const packageDirs = sync(`${root}/*/package.json`).map((pkgPath) => path$1.dirname(pkgPath));
    for (const packagePath of packageDirs) {
      const pluginFiles = sync(`${packagePath}/plugins/**/*.{ts,tsx}`);
      if (pluginFiles.length > 0) {
        const exportPaths = /* @__PURE__ */ new Set();
        pluginFiles.forEach((file) => {
          const relativePath = path$1.relative(packagePath, file);
          const exportPath = `./${relativePath.replace(/\.(ts|tsx)$/, "")}`;
          exportPaths.add(exportPath);
        });
        if (exportPaths.size > 0) {
          const packageJsonPath = path$1.join(packagePath, "package.json");
          try {
            const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
            const packageJson = JSON.parse(packageJsonContent);
            const packageName = packageJson.name || path$1.basename(packagePath);
            pluginsByPackage.set(packagePath, exportPaths);
          } catch (error) {
            console.warn(`\u26A0\uFE0F  Could not read package.json for ${packagePath}:`, error);
          }
        }
      }
    }
  }
  console.log(`\u{1F4E6} Total packages with plugins: ${pluginsByPackage.size}`);
  const updatePromises = Array.from(pluginsByPackage.entries()).map(
    async ([packagePath, exportPaths]) => {
      const packageJsonPath = path$1.join(packagePath, "package.json");
      try {
        const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(packageJsonContent);
        if (!packageJson.exports) {
          packageJson.exports = { ".": "./index.ts" };
        }
        if (typeof packageJson.exports === "object" && !packageJson.exports["."]) {
          packageJson.exports["."] = "./index.ts";
        }
        let hasChanges = false;
        exportPaths.forEach((exportPath) => {
          const exportKey = exportPath.startsWith("./") ? exportPath : `./${exportPath}`;
          const filePath = `${exportPath}.tsx`;
          const tsFilePath = `${exportPath}.ts`;
          const targetFile = sync(path$1.join(packagePath, `${exportPath.slice(2)}.{ts,tsx}`))[0];
          if (targetFile) {
            const extension = targetFile.endsWith(".tsx") ? ".tsx" : ".ts";
            const targetPath = `${exportPath}${extension}`;
            if (packageJson.exports && !packageJson.exports[exportKey]) {
              packageJson.exports[exportKey] = targetPath;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          const sortedExports = {};
          if (packageJson.exports["."]) {
            sortedExports["."] = packageJson.exports["."];
          }
          Object.keys(packageJson.exports).filter((key) => key !== ".").sort().forEach((key) => {
            sortedExports[key] = packageJson.exports[key];
          });
          packageJson.exports = sortedExports;
          const updatedContent = JSON.stringify(packageJson, null, 2) + "\n";
          await fs.writeFile(packageJsonPath, updatedContent);
          console.log(`\u2705 Updated exports in ${packageJson.name}`);
          const newExports = Object.keys(packageJson.exports).filter((key) => key !== ".");
          if (newExports.length > 0) {
            console.log(`   Added exports: ${newExports.join(", ")}`);
          }
        } else {
        }
      } catch (error) {
        console.error(`\u274C Failed to update package.json for ${packagePath}:`, error);
      }
    }
  );
  await Promise.all(updatePromises);
}

dotenv.config();
async function codegenInterceptors() {
  const conf = loadConfig(process.cwd());
  const [plugins] = findPlugins(conf);
  console.info("\u{1F504} Updating package.json exports for plugins...");
  await updatePackageExports();
  const generatedInterceptors = await generateInterceptors(
    plugins,
    resolveDependency(),
    conf.debug);
  await writeInterceptors(generatedInterceptors);
  console.info("\u2705 Generated interceptors and moved original files");
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
  const gitignorePath = path.join(process.cwd(), ".gitignore");
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
        const filePath = path.join(cwd, file);
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
      const copyDir = path.join(pkg, "copy");
      try {
        const files = await fg("**/*", { cwd: copyDir, dot: true, suppressErrors: true });
        if (files.length > 0) {
          debug(`Found files in ${pkg}:`, files);
          for (const file of files) {
            const sourcePath = path.join(copyDir, file);
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
      const targetPath = path.join(cwd, file);
      debug(`Processing file: ${file}`);
      try {
        await fs$2.mkdir(path.dirname(targetPath), { recursive: true });
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
          currentDir = path.dirname(currentDir);
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
      const filePath = path.join(cwd, file);
      const dirPath = path.dirname(filePath);
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

const packages = [...resolveDependenciesSync().values()].filter((p) => p !== ".");
const resolve$1 = resolveDependency();
dotenv.config();
async function generateConfig() {
  const resolved = resolve$1("@graphcommerce/next-config");
  if (!resolved) throw Error("Could not resolve @graphcommerce/next-config");
  const targetTs = `${resolved.root}/src/generated/config.ts`;
  const targetJs = `${resolved.root}/dist/generated/config.js`;
  const schemaLocations = [
    "graphql/Config.graphqls",
    ...packages.flatMap((p) => [`${p}/Config.graphqls`, `${p}/graphql/Config.graphqls`])
  ];
  await generate({
    silent: true,
    schema: schemaLocations,
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
    env: { targets: { node: "20" } }
  });
  writeFileSync(targetJs, result.code);
}

dotenv.config();
const resolve = resolveDependency();
function toFileName(key) {
  return key;
}
function generateValueLiteral(value) {
  if (value === null) return "null";
  if (value === void 0) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (Array.isArray(value) || typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return JSON.stringify(value);
}
function shouldCreateFile(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getSectionSchemaKeys(configKey) {
  try {
    const mainSchema = GraphCommerceConfigSchema();
    const sectionSchema = mainSchema.shape[configKey];
    if (!sectionSchema) return [];
    let unwrappedSchema = sectionSchema;
    while (unwrappedSchema && typeof unwrappedSchema === "object") {
      if ("_def" in unwrappedSchema) {
        const def = unwrappedSchema._def;
        if ("innerType" in def && def.innerType) {
          unwrappedSchema = def.innerType;
          continue;
        }
        if ("typeName" in def && def.typeName === "ZodObject" && "shape" in def && def.shape) {
          return Object.keys(def.shape());
        }
        break;
      } else {
        break;
      }
    }
    if (unwrappedSchema && "shape" in unwrappedSchema) {
      const shape = typeof unwrappedSchema.shape === "function" ? unwrappedSchema.shape() : unwrappedSchema.shape;
      return Object.keys(shape || {});
    }
  } catch {
  }
  return [];
}
async function createConfigSectionFile(sectionName, sectionValue, targetDir, targetDistDir, configKey) {
  const fileName = `${toFileName(sectionName)}.ts`;
  const filePath = path.join(targetDir, fileName);
  const distFileName = `${toFileName(sectionName)}.js`;
  const distFilePath = path.join(targetDistDir, distFileName);
  const schemaKeys = getSectionSchemaKeys(configKey);
  const completeSectionValue = {};
  for (const key of schemaKeys) {
    completeSectionValue[key] = sectionValue[key];
  }
  const exports$1 = Object.entries(completeSectionValue).map(([key, value]) => {
    const valueStr = generateValueLiteral(value);
    const propertyPath = `'${sectionName}.${key}'`;
    const typeAnnotation = `: Get<GraphCommerceConfig, ${propertyPath}>`;
    return `export const ${key}${typeAnnotation} = ${valueStr}`;
  }).join("\n\n");
  const imports = `import type { GraphCommerceConfig } from '../config'
import type { Get } from 'type-fest'` ;
  const content = `// Auto-generated by 'yarn graphcommerce codegen-config-values'
${imports}

${exports$1}
`;
  const formattedContent = await prettier.format(content, {
    ...prettierConf,
    parser: "typescript",
    plugins: prettierConf.plugins?.filter(
      (p) => typeof p === "string" && !p.includes("prettier-plugin-sort-imports")
    )
  });
  writeFileSync(filePath, formattedContent);
  const result = transformFileSync(filePath, {
    module: { type: "nodenext" },
    env: { targets: { node: "18" } }
  });
  writeFileSync(distFilePath, result.code);
}
async function generateConfigValues() {
  const resolved = resolve("@graphcommerce/next-config");
  if (!resolved) throw Error("Could not resolve @graphcommerce/next-config");
  const config = loadConfig(process.cwd());
  const targetDir = `${resolved.root}/src/generated/configValues`;
  const targetDistDir = `${resolved.root}/dist/generated/configValues`;
  if (existsSync(targetDir)) {
    rmSync(targetDir, { recursive: true, force: true });
  }
  if (existsSync(targetDistDir)) {
    rmSync(targetDistDir, { recursive: true, force: true });
  }
  mkdirSync(targetDir, { recursive: true });
  mkdirSync(targetDistDir, { recursive: true });
  const schema = GraphCommerceConfigSchema();
  const schemaKeys = Object.keys(schema.shape);
  const completeConfig = {};
  for (const key of schemaKeys) {
    completeConfig[key] = config[key];
  }
  const configEntries = Object.entries(completeConfig);
  const nestedObjects = [];
  const rootExports = [];
  for (const [key, value] of configEntries) {
    if (shouldCreateFile(value)) {
      nestedObjects.push([key, value, key]);
      rootExports.push(`export * as ${key} from './${toFileName(key)}'`);
    } else {
      const valueStr = generateValueLiteral(value);
      const typeAnnotation = `: Get<GraphCommerceConfig, '${key}'>`;
      rootExports.push(`export const ${key}${typeAnnotation} = ${valueStr}`);
    }
  }
  await Promise.all(
    nestedObjects.map(
      ([sectionName, sectionValue, configKey]) => createConfigSectionFile(sectionName, sectionValue, targetDir, targetDistDir, configKey)
    )
  );
  const rootImports = `import type { GraphCommerceConfig } from '../config'
import type { Get } from 'type-fest'` ;
  const indexContent = `// Auto-generated by 'yarn graphcommerce codegen-config-values'
${rootImports}

${rootExports.join("\n")}
`;
  const formattedIndexContent = await prettier.format(indexContent, {
    ...prettierConf,
    parser: "typescript",
    plugins: prettierConf.plugins?.filter(
      (p) => typeof p === "string" && !p.includes("prettier-plugin-sort-imports")
    )
  });
  const indexPath = path.join(targetDir, "index.ts");
  const distIndexPath = path.join(targetDistDir, "index.js");
  writeFileSync(indexPath, formattedIndexContent);
  const indexResult = transformFileSync(indexPath, {
    module: { type: "nodenext" },
    env: { targets: { node: "20" } }
  });
  writeFileSync(distIndexPath, indexResult.code);
  console.log(`\u2705 Generated config values in ${targetDir} and ${targetDistDir}`);
  console.log(`\u{1F4C1} Created ${nestedObjects.length} nested object files + index.ts/.js`);
  console.log(`\u{1F4DD} Root exports: ${configEntries.length - nestedObjects.length}`);
}

async function codegen() {
  console.info("\u{1F504} Copying files from packages to project...");
  await copyFiles();
  console.info("\u2699\uFE0F  Generating GraphCommerce config types...");
  await generateConfig();
  console.info("\u{1F4E6} Generating treeshakable config values...");
  await generateConfigValues();
  console.info("\u{1F50C} Generating interceptors...");
  await codegenInterceptors();
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
  const { storefront } = graphcommerceConfig;
  const transpilePackages = [
    ...[...resolveDependenciesSync().keys()].slice(1),
    ...nextConfig.transpilePackages ?? []
  ];
  return {
    ...nextConfig,
    bundlePagesRouterDependencies: true,
    turbopack: {
      ...nextConfig.turbopack ?? {},
      rules: {
        ...nextConfig.turbopack?.rules ?? {},
        "*.yaml": { loaders: [{ loader: "js-yaml-loader", options: {} }], as: "*.js" },
        "*.yml": { loaders: [{ loader: "js-yaml-loader", options: {} }], as: "*.js" },
        "*.po": { loaders: [{ loader: "@lingui/loader", options: {} }], as: "*.js" }
      }
    },
    experimental: {
      ...nextConfig.experimental,
      scrollRestoration: true,
      swcPlugins: [...nextConfig.experimental?.swcPlugins ?? [], ["@lingui/swc-plugin", {}]],
      optimizePackageImports: [
        ...transpilePackages,
        ...nextConfig.experimental?.optimizePackageImports ?? []
      ]
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
        rewrites.beforeFiles?.push({
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

export { GraphCommerceConfigSchema, PackagesSort, TopologicalSort, cleanupInterceptors, codegen, codegenInterceptors, copyFiles, exportConfig, findParentPath, g, generateConfig, generateConfigValues, loadConfig, packageRoots, resolveDependenciesSync, resolveDependency, sig, sortDependencies, withGraphCommerce };
