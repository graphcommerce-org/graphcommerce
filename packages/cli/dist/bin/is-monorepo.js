#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { isMonorepo } from '@graphcommerce/next-config';
import { detect } from 'detect-package-manager';

async function main() {
  const isMono = isMonorepo();
  const command = isMono ? process.argv.slice(2)[0] : process.argv.slice(2)[1];
  let packageManager = "yarn";
  try {
    packageManager = await detect({ cwd: isMono ? `../..` : `.` });
  } catch {
    console.error("Could not detect package manager, defaulting to yarn");
  }
  const commandArray = command.split(" ").map((arg) => arg.replace("[pkgrun]", `${packageManager} run`));
  if (isMono) commandArray.unshift("cd", "../..", "&&");
  const [cmd, ...args] = commandArray;
  const childProcess = spawn(cmd, args, { shell: true, stdio: "inherit" });
  childProcess.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
