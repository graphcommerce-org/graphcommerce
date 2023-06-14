"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSchema = void 0;
const client_1 = require("@apollo/client");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const readSchema = async (config) => {
    const projectId = config.hygraphProjectId;
    if (!config.hygraphWriteAccessToken) {
        throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file');
    }
    if (!projectId) {
        throw new Error('Please provide projectId in your env file');
    }
    const hygraphClient = new client_1.ApolloClient({
        link: new client_1.HttpLink({
            uri: 'https://management.hygraph.com/graphql',
            fetch: cross_fetch_1.default,
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
