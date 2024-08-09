"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
function getConfig(config) {
    let { hygraphProjectId: projectId, hygraphWriteAccessToken: authToken, hygraphManagementApi: uri, hygraphEndpoint, } = config;
    if (!authToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file.');
    }
    if (!projectId) {
        throw new Error('Please provide GC_HYGRAPH_PROJECT_ID in your env file.');
    }
    if (!uri) {
        const endpoint = new URL(hygraphEndpoint);
        endpoint.hostname = `management-${endpoint.hostname}`.replace('.cdn', '');
        endpoint.pathname = 'graphql';
        uri = endpoint.toString();
    }
    return { projectId, authToken, uri };
}
