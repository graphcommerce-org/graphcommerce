"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClient = void 0;
const next_config_1 = require("@graphcommerce/next-config");
const management_sdk_1 = require("@hygraph/management-sdk");
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initClient = (name) => {
    const config = (0, next_config_1.loadConfig)(process.cwd());
    if (!config.hygraphWriteAccessEndpoint) {
        throw new Error('Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env');
    }
    if (!config.hygraphWriteAccessToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env');
    }
    return new management_sdk_1.Client({
        authToken: config.hygraphWriteAccessToken,
        endpoint: config.hygraphWriteAccessEndpoint,
        name,
    });
};
exports.initClient = initClient;
