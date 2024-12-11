#!/usr/bin/env node
import { spawn } from 'node:child_process';
import path from 'node:path';
import { findParentPath } from '@graphcommerce/next-config';
import { detect } from 'detect-package-manager';

const debug = process.env.DEBUG === "1";
const log = (message) => debug && console.log(`is-monorepo: ${message}`);
const logError = (message) => console.error(`is-monorepo: ${message}`);
async function main() {
  const parentPath = findParentPath(process.cwd());
  const command = parentPath ? process.argv.slice(2)[0] : process.argv.slice(2)[1];
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
  const relativePath = parentPath ? `cd ${path.relative(process.cwd(), parentPath)}/` : "cd .";
  const commandArray = command.split(" ").map(
    (arg) => arg.replace("[pkgrun]", `${packageManager}${packageManager === "npm" ? " run" : ""}`)
  );
  log(`Command: ${commandArray.join(" ")}`);
  const finalCommand = `${relativePath} && ${commandArray.join(" ")}`;
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
