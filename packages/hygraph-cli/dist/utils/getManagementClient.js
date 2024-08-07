"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagementClient = getManagementClient;
const client_1 = require("@apollo/client");
function getManagementClient(config) {
    const { authToken: accessToken, uri } = config;
    return new client_1.ApolloClient({
        link: new client_1.HttpLink({
            uri,
            fetch,
            headers: { Authorization: `Bearer ${accessToken}` },
        }),
        cache: new client_1.InMemoryCache(),
    });
}
