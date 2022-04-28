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
exports.findConfig = void 0;
/* eslint-disable import/no-extraneous-dependencies */
var path_1 = __importDefault(require("path"));
var utils_1 = require("@graphql-mesh/utils");
var cosmiconfig_1 = require("cosmiconfig");
function customLoader(ext, importFn) {
    if (importFn === void 0) { importFn = utils_1.defaultImportFn; }
    // eslint-disable-next-line consistent-return
    function loader(filepath, content) {
        if (process.env) {
            // eslint-disable-next-line no-param-reassign
            content = content.replace(/\$\{(.*?)\}/g, function (_, variable) {
                var varName = variable;
                var defaultValue = '';
                if (variable.includes(':')) {
                    var spl = variable.split(':');
                    varName = spl.shift();
                    defaultValue = spl.join(':');
                }
                return process.env[varName] || defaultValue;
            });
        }
        if (ext === 'json') {
            return cosmiconfig_1.defaultLoaders['.json'](filepath, content);
        }
        if (ext === 'yaml') {
            return (0, utils_1.loadYaml)(filepath, content);
        }
        if (ext === 'js') {
            return importFn(filepath);
        }
    }
    return loader;
}
function findConfig(options) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, configName, _c, configDir, dir, explorer, results, config;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = options || {}, _b = _a.configName, configName = _b === void 0 ? 'mesh' : _b, _c = _a.dir, configDir = _c === void 0 ? '' : _c;
                    dir = path_1.default.isAbsolute(configDir) ? configDir : path_1.default.join(process.cwd(), configDir);
                    explorer = (0, cosmiconfig_1.cosmiconfig)(configName, {
                        searchPlaces: [
                            'package.json',
                            ".".concat(configName, "rc"),
                            ".".concat(configName, "rc.json"),
                            ".".concat(configName, "rc.yaml"),
                            ".".concat(configName, "rc.yml"),
                            ".".concat(configName, "rc.js"),
                            ".".concat(configName, "rc.ts"),
                            ".".concat(configName, "rc.cjs"),
                            "".concat(configName, ".config.js"),
                            "".concat(configName, ".config.cjs"),
                        ],
                        loaders: {
                            '.json': customLoader('json', options === null || options === void 0 ? void 0 : options.importFn),
                            '.yaml': customLoader('yaml', options === null || options === void 0 ? void 0 : options.importFn),
                            '.yml': customLoader('yaml', options === null || options === void 0 ? void 0 : options.importFn),
                            '.js': customLoader('js', options === null || options === void 0 ? void 0 : options.importFn),
                            '.ts': customLoader('js', options === null || options === void 0 ? void 0 : options.importFn),
                            noExt: customLoader('yaml', options === null || options === void 0 ? void 0 : options.importFn),
                        },
                    });
                    return [4 /*yield*/, explorer.search(dir)];
                case 1:
                    results = _d.sent();
                    if (!results) {
                        throw new Error("No ".concat(configName, " config file found in \"").concat(dir, "\"!"));
                    }
                    config = results.config;
                    return [2 /*return*/, config];
            }
        });
    });
}
exports.findConfig = findConfig;
