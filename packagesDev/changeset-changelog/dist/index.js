"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const changelog_github_1 = __importDefault(require("@changesets/changelog-github"));
const changelogFunctions = {
    getDependencyReleaseLine: () => Promise.resolve(''),
    getReleaseLine: changelog_github_1.default.getReleaseLine,
};
exports.default = changelogFunctions;
