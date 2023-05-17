"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSchema = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const client_1 = require("@apollo/client");
const readSchema = async (config) => {
    const projectId = config.hygraphProjectId;
    if (!config.hygraphWriteAccessToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file');
    }
    if (!projectId) {
        throw new Error('Please provide projectId in your env file');
    }
    const hygraphClient = new client_1.ApolloClient({
        uri: 'https://management.hygraph.com/graphql',
        cache: new client_1.InMemoryCache(),
        headers: {
            Authorization: `Bearer ${config.hygraphWriteAccessToken}`,
        },
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
                  displayName
                }
                components {
                  apiId
                  apiIdPlural
                  displayName
                }
                enumerations {
                  apiId
                  displayName
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
