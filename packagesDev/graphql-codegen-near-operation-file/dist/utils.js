"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineFilepathSubfolder = defineFilepathSubfolder;
exports.appendExtensionToFilePath = appendExtensionToFilePath;
exports.extractExternalFragmentsInUse = extractExternalFragmentsInUse;
const graphql_1 = require("graphql");
const parse_filepath_1 = __importDefault(require("parse-filepath"));
const path_1 = require("path");
function defineFilepathSubfolder(baseFilePath, folder) {
    const parsedPath = (0, parse_filepath_1.default)(baseFilePath);
    return (0, path_1.join)(parsedPath.dir, folder, parsedPath.base).replace(/\\/g, '/');
}
function appendExtensionToFilePath(baseFilePath, extension) {
    const parsedPath = (0, parse_filepath_1.default)(baseFilePath);
    return (0, path_1.join)(parsedPath.dir, parsedPath.name + extension).replace(/\\/g, '/');
}
function extractExternalFragmentsInUse(documentNode, fragmentNameToFile, result = {}, level = 0) {
    const ignoreList = new Set();
    // First, take all fragments definition from the current file, and mark them as ignored
    (0, graphql_1.visit)(documentNode, {
        FragmentDefinition: (node) => {
            ignoreList.add(node.name.value);
        },
    });
    // Then, look for all used fragments in this document
    (0, graphql_1.visit)(documentNode, {
        FragmentSpread: (node) => {
            if (!ignoreList.has(node.name.value)) {
                if (result[node.name.value] === undefined ||
                    (result[node.name.value] !== undefined && level < result[node.name.value])) {
                    result[node.name.value] = level;
                    if (fragmentNameToFile[node.name.value]) {
                        extractExternalFragmentsInUse(fragmentNameToFile[node.name.value].node, fragmentNameToFile, result, level + 1);
                    }
                }
            }
        },
    });
    return result;
}
