#!/usr/bin/env node
import { promises } from 'node:fs';
import path$1 from 'node:path';
import { exit } from 'node:process';
import { loadConfig, resolveDependenciesSync, packageRoots, replaceConfigInString } from '@graphcommerce/next-config';
import { DEFAULT_CLI_PARAMS, graphqlMesh } from '@graphql-mesh/cli';
import { DefaultLogger, loadYaml, defaultImportFn, fileURLToPath } from '@graphql-mesh/utils';
import dotenv from 'dotenv';
import yaml from 'yaml';
import path from 'path';
import { cosmiconfig, defaultLoaders } from 'cosmiconfig';
import 'tsx/cjs';
import 'tsx/esm';

function customLoader(ext, importFn = defaultImportFn, initialLoggerPrefix = "\u{1F578}\uFE0F  Mesh") {
  const logger = new DefaultLogger(initialLoggerPrefix).child("config");
  function loader(filepath, content) {
    if (process.env) {
      content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
        let varName = variable;
        let defaultValue = "";
        if (variable.includes(":")) {
          const spl = variable.split(":");
          varName = spl.shift();
          defaultValue = spl.join(":");
        }
        return process.env[varName] || defaultValue;
      });
    }
    if (ext === "json") {
      return defaultLoaders[".json"](filepath, content);
    }
    if (ext === "yaml") {
      return loadYaml(filepath, content, logger);
    }
    if (ext === "js") {
      return importFn(filepath);
    }
  }
  return loader;
}
async function findConfig(options) {
  const { configName = "mesh", dir: configDir = "", initialLoggerPrefix } = options || {};
  const dir = path.isAbsolute(configDir) ? configDir : path.join(process.cwd(), configDir);
  const explorer = cosmiconfig(configName, {
    searchPlaces: [
      "package.json",
      `.${configName}rc`,
      `.${configName}rc.json`,
      `.${configName}rc.yaml`,
      `.${configName}rc.yml`,
      `.${configName}rc.js`,
      `.${configName}rc.ts`,
      `.${configName}rc.cjs`,
      `${configName}.config.js`,
      `${configName}.config.cjs`
    ],
    loaders: {
      ".json": customLoader("json", options?.importFn, initialLoggerPrefix),
      ".yaml": customLoader("yaml", options?.importFn, initialLoggerPrefix),
      ".yml": customLoader("yaml", options?.importFn, initialLoggerPrefix),
      ".js": customLoader("js", options?.importFn, initialLoggerPrefix),
      ".ts": customLoader("js", options?.importFn, initialLoggerPrefix),
      noExt: customLoader("yaml", options?.importFn, initialLoggerPrefix)
    }
  });
  const results = await explorer.search(dir);
  if (!results) {
    throw new Error(`No ${configName} config file found in "${dir}"!`);
  }
  const { config } = results;
  return config;
}

dotenv.config();
function resolvePath(pathStr) {
  return fileURLToPath(import.meta.resolve(pathStr));
}
function handleFatalError(e, logger = new DefaultLogger("\u25C8")) {
  logger.error(e.stack || e.message);
  console.log(e);
  if (process.env.JEST == null) exit(1);
}
const root = process.cwd();
const meshDir = path$1.dirname(resolvePath("@graphcommerce/graphql-mesh"));
const relativePath = path$1.join(path$1.relative(meshDir, root), "/");
const cliParams = {
  ...DEFAULT_CLI_PARAMS,
  playgroundTitle: "GraphCommerce\xAE Mesh"
};
const tmpMesh = `_tmp_mesh`;
const tmpMeshLocation = path$1.join(root, `.${tmpMesh}rc.yml`);
async function cleanup() {
  try {
    await promises.stat(tmpMeshLocation).then((r) => {
      if (r.isFile()) return promises.unlink(tmpMeshLocation);
      return void 0;
    });
  } catch (e) {
  }
  return void 0;
}
const main = async () => {
  const baseConf = await findConfig({});
  const graphCommerce = loadConfig(root);
  const meshConfigf = await import('@graphcommerce/graphql-mesh/meshConfig.interceptor');
  const conf = meshConfigf.default.meshConfig(baseConf, graphCommerce);
  conf.customFetch = "@graphcommerce/graphql-mesh/customFetch";
  conf.serve = { ...conf.serve, endpoint: "/api/graphql" };
  conf.additionalResolvers = conf.additionalResolvers ?? [];
  conf.additionalResolvers = conf.additionalResolvers?.map((additionalResolver) => {
    if (typeof additionalResolver !== "string") return additionalResolver;
    if (additionalResolver.startsWith("@"))
      return path$1.relative(root, resolvePath(additionalResolver));
    return additionalResolver;
  });
  conf.sources = conf.sources.map((source) => {
    const definedHandlers = Object.entries(source.handler);
    return {
      ...source,
      handler: Object.fromEntries(
        definedHandlers.map(([key, value]) => {
          if (key === "openapi" && value) {
            const openapi = value;
            if (openapi.source.startsWith("@")) {
              return [key, { ...openapi, source: path$1.relative(root, resolvePath(openapi.source)) }];
            }
          }
          return [key, value];
        })
      )
    };
  });
  if (!conf.additionalTypeDefs) conf.additionalTypeDefs = [];
  conf.additionalTypeDefs = (Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]).map((additionalTypeDef) => {
    if (typeof additionalTypeDef === "string" && additionalTypeDef.startsWith("@"))
      return path$1.relative(root, resolvePath(additionalTypeDef));
    return additionalTypeDef;
  });
  conf.additionalTypeDefs.push("graphql/**/*.graphqls");
  conf.additionalTypeDefs.push("components/**/*.graphqls");
  conf.additionalTypeDefs.push("lib/**/*.graphqls");
  conf.additionalTypeDefs.push("app/**/*.graphqls");
  const deps = resolveDependenciesSync();
  const packages = [...deps.values()].filter((p) => p !== ".");
  const mV = graphCommerce.magentoVersion ?? 246;
  packageRoots(packages).forEach((r) => {
    const alsoScan = [245, 246, 247, 248, 249, 250, 251, 252, 253, 254].filter((v) => v > mV).map((v) => `${r}/*/schema-${v}/**/*.graphqls`);
    conf.additionalTypeDefs.push(`${r}/*/schema/**/*.graphqls`);
    conf.additionalTypeDefs.push(...alsoScan);
  });
  if (!conf.serve) conf.serve = {};
  if (!conf.serve.playgroundTitle) conf.serve.playgroundTitle = "GraphCommerce\xAE Mesh";
  conf.plugins = [
    ...conf.plugins ?? [],
    {
      httpDetailsExtensions: {
        if: "env.NODE_ENV === 'development'"
      }
    }
  ];
  const yamlString = replaceConfigInString(yaml.stringify(conf), graphCommerce);
  await promises.writeFile(tmpMeshLocation, yamlString);
  await promises.writeFile(
    `${meshDir}/.mesh.ts`,
    `export * from '${relativePath.split(path$1.sep).join("/")}.mesh'`,
    { encoding: "utf8" }
  );
  await graphqlMesh({ ...cliParams, configName: tmpMesh });
  await cleanup();
};
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
main().catch((e) => {
  cleanup();
  if (e instanceof Error) {
    handleFatalError(e, new DefaultLogger(DEFAULT_CLI_PARAMS.initialLoggerPrefix));
  }
});

export { handleFatalError };
