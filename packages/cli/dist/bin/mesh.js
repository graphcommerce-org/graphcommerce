#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFatalError = void 0;
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var process_1 = require("process");
var cli_1 = require("@graphql-mesh/cli");
var utils_1 = require("@graphql-mesh/utils");
var dotenv_1 = __importDefault(require("dotenv"));
var yaml_1 = __importDefault(require("yaml"));
var findConfig_1 = require("../mesh/findConfig");
dotenv_1.default.config();
function handleFatalError(e, logger) {
    if (logger === void 0) { logger = new utils_1.DefaultLogger('◈'); }
    logger.error(e.stack || e.message);
    // eslint-disable-next-line no-console
    console.log(e);
    if (process.env.JEST == null)
        (0, process_1.exit)(1);
}
exports.handleFatalError = handleFatalError;
var root = process.cwd();
var meshDir = path_1.default.dirname(require.resolve('@graphcommerce/graphql-mesh'));
var relativePath = path_1.default.join(path_1.default.relative(meshDir, root), '/');
var isMonoRepo = relativePath.startsWith('../../examples');
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conf;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, findConfig_1.findConfig)({})];
            case 1:
                conf = (_c.sent());
                // Rewrite additionalResolvers so we can use module resolution more easily
                conf.additionalResolvers = (_a = conf.additionalResolvers) !== null && _a !== void 0 ? _a : [];
                conf.additionalResolvers = (_b = conf.additionalResolvers) === null || _b === void 0 ? void 0 : _b.map(function (additionalResolver) {
                    if (typeof additionalResolver !== 'string')
                        return additionalResolver;
                    if (additionalResolver.startsWith('@'))
                        return path_1.default.relative(meshDir, require.resolve(additionalResolver));
                    return "".concat(relativePath).concat(additionalResolver);
                });
                // Rewrite additionalTypeDefs so we can use module resolution more easily
                if (!conf.additionalTypeDefs)
                    conf.additionalTypeDefs = [];
                conf.additionalTypeDefs = (Array.isArray(conf.additionalTypeDefs) ? conf.additionalTypeDefs : [conf.additionalTypeDefs]).map(function (additionalTypeDef) {
                    if (additionalTypeDef.startsWith('@'))
                        return path_1.default.relative(meshDir, require.resolve(additionalTypeDef));
                    return additionalTypeDef;
                });
                conf.additionalTypeDefs.push('../../**/*.graphqls');
                if (isMonoRepo) {
                    conf.additionalTypeDefs.push('../../packages/**/*.graphqls');
                    conf.additionalTypeDefs.push('../../packagesDev/**/*.graphqls');
                }
                else {
                    conf.additionalTypeDefs.push('../../@graphcommerce/**/*.graphqls');
                }
                // if (isMonoRepo) {
                console.log(isMonoRepo, yaml_1.default.stringify(conf));
                // }
                fs_1.default.writeFileSync(path_1.default.join(meshDir, '.meshrc.yml'), yaml_1.default.stringify(conf));
                (0, cli_1.graphqlMesh)(cli_1.DEFAULT_CLI_PARAMS, undefined, "".concat(meshDir, "/")).catch(function (e) {
                    return handleFatalError(e, new utils_1.DefaultLogger(cli_1.DEFAULT_CLI_PARAMS.initialLoggerPrefix));
                });
                return [2 /*return*/];
        }
    });
}); };
main().catch(console.error);
