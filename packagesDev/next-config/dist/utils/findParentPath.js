import fs from 'fs';
import path from 'path';

const debug = process.env.DEBUG === "1";
const log = (message) => debug && console.log(`isMonorepo: ${message}`);
function findPackageJson(directory) {
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
    const packageJson = findPackageJson(currentDir);
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

export { findParentPath };
