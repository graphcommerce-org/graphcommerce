"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSchema = void 0;
const client_1 = require("@apollo/client");
const fetch_1 = require("@whatwg-node/fetch");
const readSchema = async (config) => {
    if (!config.hygraphProjectId) {
        throw new Error('Please provide GC_HYGRAPH_PROJECT_ID in your env file.');
    }
    if (!config.hygraphWriteAccessToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file.');
    }
    const projectId = config.hygraphProjectId;
    if (!config.hygraphManagementApi) {
        throw new Error('Please provide GC_HYGRAPH_MANAGEMENT_API in your env file.');
    }
    const hygraphClient = new client_1.ApolloClient({
        link: new client_1.HttpLink({
            uri: config.hygraphManagementApi,
            fetch: fetch_1.fetch,
            headers: { Authorization: `Bearer ${config.hygraphWriteAccessToken}` },
        }),
        cache: new client_1.InMemoryCache(),
    });
    const { data } = await hygraphClient.query({
        query: (0, client_1.gql) `
      query getSchema($projectId: ID!) {
        viewer {
          project(id: $projectId) {
            environment(name: "master") {
              contentModel {
                models {
                  apiId
                  apiIdPlural
                  fields {
                    apiId
                  }
                }
                components {
                  apiId
                  apiIdPlural
                  fields {
                    apiId
                  }
                }
                enumerations {
                  apiId
                }
              }
            }
          }
        }
      }
    `,
        variables: {
            projectId,
        },
    });
    return data;
};
exports.readSchema = readSchema;
