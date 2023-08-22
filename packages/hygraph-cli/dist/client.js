"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClient = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const log_functions_1 = require("./log-functions");
const initClient = (config, name) => {
    if (!config.hygraphWriteAccessEndpoint) {
        (0, log_functions_1.graphcommerceLog)('Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env file', 'error');
        return 0;
    }
    if (!config.hygraphWriteAccessToken) {
        (0, log_functions_1.graphcommerceLog)('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file');
        return 0;
    }
    return new management_sdk_1.Client({
        authToken: config.hygraphWriteAccessToken,
        endpoint: config.hygraphWriteAccessEndpoint,
        name,
    });
};
exports.initClient = initClient;
