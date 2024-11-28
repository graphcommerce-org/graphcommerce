#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { isMonorepo } from '@graphcommerce/next-config';
import { detect } from 'detect-package-manager';

const debug = process.env.DEBUG === "1";
const log = (message) => debug && console.log(`is-monorepo: ${message}`);
const logError = (message) => console.error(`is-monorepo: ${message}`);
function findRootDir(startDir) {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, "package.json"), "utf8"));
      if (packageJson.name === "@graphcommerce/private") {
        log(`Found root directory at: ${currentDir}`);
        return currentDir;
      }
    } catch {
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}
async function main() {
  const isMono = isMonorepo();
  log(`Running in monorepo: ${isMono}`);
  log(`Arguments: ${process.argv.slice(2).join(" ")}`);
  const command = isMono ? process.argv.slice(2)[0] : process.argv.slice(2)[1];
  if (!command) {
    logError("No command provided");
    process.exit(1);
  }
  let packageManager = "yarn";
  try {
    packageManager = await detect({ cwd: "." });
  } catch {
    log("Could not detect package manager, defaulting to yarn");
  }
  const commandArray = command.split(" ").map(
    (arg) => arg.replace("[pkgrun]", `${packageManager}${packageManager === "npm" ? " run" : ""}`)
  );
  log(`Command: ${commandArray.join(" ")}`);
  const currentDir = process.cwd();
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, "package.json"), "utf8"));
    log(`Current package: ${packageJson.name}`);
    if (isMono && packageJson.name !== "@graphcommerce/private") {
      const rootDir = findRootDir(currentDir);
      if (rootDir && rootDir !== currentDir) {
        const relativePathToRoot = path.relative(currentDir, rootDir);
        log(`Adding cd ${relativePathToRoot}`);
        commandArray.unshift("cd", relativePathToRoot, "&&");
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      log(`Error reading package.json: ${e.message}`);
    }
  }
  const finalCommand = commandArray.join(" ");
  log(`Executing: ${finalCommand}`);
  const childProcess = spawn(finalCommand, [], { shell: true, stdio: "inherit" });
  childProcess.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
main().catch((err) => {
  if (err instanceof Error) {
    logError(err.message);
  } else {
    logError("An unknown error occurred");
  }
  process.exit(1);
});
