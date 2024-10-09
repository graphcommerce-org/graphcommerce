#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { resolveDependenciesSync, packageRoots } from '@graphcommerce/next-config';
import { cliError, loadCodegenConfig, runCli } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
import { rimraf } from 'rimraf';
import yaml from 'yaml';

const [, , cmd] = process.argv;
dotenv.config();
const root = process.cwd();
const configLocation = path.join(root, `._tmp_codegen.yml`);
async function cleanup() {
  try {
    await fs.stat(configLocation).then((r) => {
      if (r.isFile()) return fs.unlink(configLocation);
      return void 0;
    });
  } catch (e) {
  }
  return void 0;
}
function appendDocumentLocations(conf, packages) {
  const documents = Array.isArray(conf.documents) ? conf.documents : [conf.documents];
  documents.push(...packages.map((p) => `${p}/**/*.graphql`));
  return conf;
}
async function main() {
  if (process.argv.includes("--config") || process.argv.includes("-c")) {
    throw Error("--config or -c argument is not supported, modify codegen.yml to make changes");
  }
  const deps = resolveDependenciesSync();
  const packages = [...deps.values()].filter((p) => p !== ".");
  const conf = await loadCodegenConfig({ configFilePath: root });
  const generates = Object.entries(conf.config.generates).map(([generatedPath, value]) => {
    const found = [...deps.entries()].find(
      (dep) => generatedPath.startsWith(`node_modules/${dep[0]}`)
    );
    if (!found) return [generatedPath, value];
    const newPath = generatedPath.replace(`node_modules/${found[0]}`, found[1]);
    return [newPath, value];
  });
  let extension;
  generates.forEach(([, gen]) => {
    if (Array.isArray(gen)) return;
    if (gen.presetConfig?.extension) extension = gen.presetConfig.extension;
  });
  const isWatching = process.argv.includes("--watch") || process.argv.includes("-w");
  if (!isWatching && extension) await rimraf(path.join(root, `**/*${extension}`));
  conf.config.generates = Object.fromEntries(
    generates.map(([generateTarget, generateConf]) => [
      generateTarget,
      Array.isArray(generateConf) ? generateConf : appendDocumentLocations(generateConf, packages)
    ])
  );
  packageRoots(packages).forEach((r) => {
    conf.config.generates[r] = conf.config.generates["."];
  });
  await fs.writeFile(configLocation, yaml.stringify(conf.config));
  process.argv.push("--config");
  process.argv.push(configLocation);
  const result = await runCli(cmd);
  await cleanup();
  process.exit(result);
}
main().catch((e) => {
  cleanup();
  cliError(e);
});
