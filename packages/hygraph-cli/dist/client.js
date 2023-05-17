"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClient = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
const initClient = (config, name) => {
    if (!config.hygraphWriteAccessEndpoint) {
        throw new Error('Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env file');
    }
    if (!config.hygraphWriteAccessToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file');
    }
    return new management_sdk_1.Client({
        authToken: config.hygraphWriteAccessToken,
        endpoint: config.hygraphWriteAccessEndpoint,
        name,
    });
};
exports.initClient = initClient;
