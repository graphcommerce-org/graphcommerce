"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = copyFiles;
/* eslint-disable no-await-in-loop */
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
// Add debug logging helper
const debug = (...args) => {
    if (process.env.DEBUG)
        console.log('[copy-files]', ...args);
};
// Add constants for the magic comments
const MANAGED_BY_GC = '// managed by: graphcommerce';
const MANAGED_LOCALLY = '// managed by: local';
const GITIGNORE_SECTION_START = '# managed by: graphcommerce';
const GITIGNORE_SECTION_END = '# end managed by: graphcommerce';
/**
 * Updates the .gitignore file with a list of GraphCommerce managed files
 *
 * - Removes any existing GraphCommerce managed files section
 * - If managedFiles is not empty, adds a new section with the files
 * - If managedFiles is empty, just cleans up the existing section
 * - Ensures the file ends with a newline
 */
async function updateGitignore(managedFiles) {
    const gitignorePath = path_1.default.join(process.cwd(), '.gitignore');
    let content;
    try {
        content = await promises_1.default.readFile(gitignorePath, 'utf-8');
        debug('Reading existing .gitignore');
    }
    catch (err) {
        debug('.gitignore not found, creating new file');
        content = '';
    }
    // Remove existing GraphCommerce section if it exists
    const sectionRegex = new RegExp(`${GITIGNORE_SECTION_START}[\\s\\S]*?${GITIGNORE_SECTION_END}\\n?`, 'g');
    content = content.replace(sectionRegex, '');
    // Only add new section if there are files to manage
    if (managedFiles.length > 0) {
        const newSection = [
            GITIGNORE_SECTION_START,
            ...managedFiles.sort(),
            GITIGNORE_SECTION_END,
            '', // Empty line at the end
        ].join('\n');
        // Append the new section
        content = `${content.trim()}\n\n${newSection}`;
        debug(`Updated .gitignore with ${managedFiles.length} managed files`);
    }
    else {
        content = `${content.trim()}\n`;
        debug('Cleaned up .gitignore managed section');
    }
    await promises_1.default.writeFile(gitignorePath, content);
}
/** Determines how a file should be managed based on its content */
function getFileManagement(content) {
    if (!content)
        return 'graphcommerce';
    const contentStr = content.toString();
    if (contentStr.startsWith(MANAGED_LOCALLY))
        return 'local';
    if (contentStr.startsWith(MANAGED_BY_GC))
        return 'graphcommerce';
    return 'unmanaged';
}
/**
 * The packages are @graphcommerce/* packages and have special treatment.
 *
 * 1. Glob the `copy/**` directory for each package and generate a list of files that need to be
 *    copied. Error if a file with the same path exists in another package.
 * 2. Copy the files to the project directory (cwd).
 *
 *    1. If the file doesn't exist: Create directories and the file with "managed by: graphcommerce"
 *    2. If the file exists and starts with "managed by: local": Skip the file
 *    3. If the file exists but doesn't have a management comment: Suggest adding "managed by: local"
 *    4. If the file is managed by graphcommerce: Update if content differs
 */
async function copyFiles() {
    const startTime = performance.now();
    debug('Starting copyFiles');
    const cwd = process.cwd();
    const deps = (0, resolveDependenciesSync_1.resolveDependenciesSync)();
    const packages = [...deps.values()].filter((p) => p !== '.');
    // Track files and their source packages to detect conflicts
    const fileMap = new Map();
    const managedFiles = new Set();
    const existingManagedFiles = new Set();
    // First scan existing files to find GraphCommerce managed ones
    const scanStart = performance.now();
    try {
        // Use only default patterns for testing
        const gitignorePatterns = [
            '**/dist/**',
            '**/build/**',
            '**/.next/**',
            '**/.git/**',
            '**/node_modules/**',
        ];
        const allFiles = await (0, fast_glob_1.default)('**/*', {
            cwd,
            dot: true,
            ignore: gitignorePatterns,
            onlyFiles: true,
        });
        debug(`Found ${allFiles.length} project files in ${(performance.now() - scanStart).toFixed(0)}ms`);
        const readStart = performance.now();
        await Promise.all(allFiles.map(async (file) => {
            const filePath = path_1.default.join(cwd, file);
            try {
                const content = await promises_1.default.readFile(filePath);
                if (getFileManagement(content) === 'graphcommerce') {
                    existingManagedFiles.add(file);
                    debug(`Found existing managed file: ${file}`);
                }
            }
            catch (err) {
                debug(`Error reading file ${file}:`, err);
            }
        }));
        debug(`Read ${existingManagedFiles.size} managed files in ${(performance.now() - readStart).toFixed(0)}ms`);
    }
    catch (err) {
        debug('Error scanning project files:', err);
    }
    // First pass: collect all files and check for conflicts
    const collectStart = performance.now();
    await Promise.all(packages.map(async (pkg) => {
        const copyDir = path_1.default.join(pkg, 'copy');
        try {
            const files = await (0, fast_glob_1.default)('**/*', { cwd: copyDir, dot: true, suppressErrors: true });
            if (files.length > 0) {
                debug(`Found files in ${pkg}:`, files);
                for (const file of files) {
                    const sourcePath = path_1.default.join(copyDir, file);
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
        }
        catch (err) {
            if (err.code === 'ENOENT')
                return;
            console.error(`Error scanning directory ${copyDir}: ${err.message}\nPath: ${copyDir}`);
            process.exit(1);
        }
    }));
    debug(`Collected ${fileMap.size} files in ${(performance.now() - collectStart).toFixed(0)}ms`);
    // Second pass: copy files and handle removals
    const copyStart = performance.now();
    await Promise.all(Array.from(fileMap.entries()).map(async ([file, { sourcePath }]) => {
        const targetPath = path_1.default.join(cwd, file);
        debug(`Processing file: ${file}`);
        try {
            await promises_1.default.mkdir(path_1.default.dirname(targetPath), { recursive: true });
            const sourceContent = await promises_1.default.readFile(sourcePath);
            const contentWithComment = Buffer.concat([
                Buffer.from(`${MANAGED_BY_GC}\n// to modify this file, change it to managed by: local\n\n`),
                sourceContent,
            ]);
            let targetContent;
            try {
                targetContent = await promises_1.default.readFile(targetPath);
                const management = getFileManagement(targetContent);
                if (management === 'local') {
                    debug(`File ${file} is managed locally, skipping`);
                    return;
                }
                if (management === 'unmanaged') {
                    console.log(`Note: File ${file} has been modified. Add '${MANAGED_LOCALLY.trim()}' at the top to manage it locally.`);
                    debug(`File ${file} doesn't have management comment, skipping`);
                    return;
                }
                debug(`File ${file} is managed by graphcommerce, will update if needed`);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    console.error(`Error reading file ${file}: ${err.message}
Source: ${sourcePath}`);
                    process.exit(1);
                }
                console.log(`Creating new file: ${file}\nSource: ${sourcePath}`);
                debug('File does not exist yet');
            }
            // Skip if content is identical (including magic comment)
            if (targetContent && Buffer.compare(contentWithComment, targetContent) === 0) {
                debug(`File ${file} content is identical to source, skipping`);
                managedFiles.add(file);
                return;
            }
            // Copy the file with magic comment
            await promises_1.default.writeFile(targetPath, contentWithComment);
            if (targetContent) {
                console.log(`Updated managed file: ${file}`);
                debug(`Overwrote existing file: ${file}`);
            }
            // If the file is managed by GraphCommerce (new or updated), add it to managedFiles
            if (!targetContent || targetContent.toString().startsWith(MANAGED_BY_GC)) {
                managedFiles.add(file);
                debug('Added managed file:', file);
            }
        }
        catch (err) {
            console.error(`Error copying file ${file}: ${err.message}
Source: ${sourcePath}`);
            process.exit(1);
        }
    }));
    debug(`Copied ${managedFiles.size} files in ${(performance.now() - copyStart).toFixed(0)}ms`);
    // Remove files that are no longer provided
    const removeStart = performance.now();
    const filesToRemove = Array.from(existingManagedFiles).filter((file) => !managedFiles.has(file));
    debug(`Files to remove: ${filesToRemove.length}`);
    // Helper function to recursively clean up empty directories
    async function cleanupEmptyDirs(startPath) {
        let currentDir = startPath;
        while (currentDir !== cwd) {
            try {
                const dirContents = await promises_1.default.readdir(currentDir);
                if (dirContents.length === 0) {
                    await promises_1.default.rmdir(currentDir);
                    debug(`Removed empty directory: ${currentDir}`);
                    currentDir = path_1.default.dirname(currentDir);
                }
                else {
                    break; // Stop if directory is not empty
                }
            }
            catch (err) {
                if (err.code === 'EACCES') {
                    console.error(`Error cleaning up directory ${currentDir}: ${err.message}`);
                    process.exit(1);
                }
                break; // Stop on other errors (like ENOENT)
            }
        }
    }
    // Process file removals in parallel
    await Promise.all(filesToRemove.map(async (file) => {
        const filePath = path_1.default.join(cwd, file);
        const dirPath = path_1.default.dirname(filePath);
        try {
            // First check if the directory exists and is accessible
            await promises_1.default.readdir(dirPath);
            // Then try to remove the file
            try {
                await promises_1.default.unlink(filePath);
                console.log(`Removed managed file: ${file}`);
                debug(`Removed file: ${file}`);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    console.error(`Error removing file ${file}: ${err.message}`);
                    process.exit(1);
                }
            }
            // Finally, try to clean up empty directories
            await cleanupEmptyDirs(dirPath);
        }
        catch (err) {
            if (err.code === 'EACCES') {
                console.error(`Error accessing directory ${dirPath}: ${err.message}`);
                process.exit(1);
            }
            // Ignore ENOENT errors for directories that don't exist
        }
    }));
    debug(`Removed files in ${(performance.now() - removeStart).toFixed(0)}ms`);
    // Update .gitignore with current list of managed files
    if (managedFiles.size > 0) {
        debug('Found managed files:', Array.from(managedFiles));
        await updateGitignore(Array.from(managedFiles));
    }
    else {
        debug('No managed files found, cleaning up .gitignore section');
        await updateGitignore([]);
    }
    debug(`Total execution time: ${(performance.now() - startTime).toFixed(0)}ms`);
}
