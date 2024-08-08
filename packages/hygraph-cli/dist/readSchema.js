"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSchema = void 0;
const client_1 = require("@apollo/client");
const readSchema = async (managementClient, projectId) => {
    const { data } = await managementClient.query({
        query: (0, client_1.gql) `
      query getSchema($projectId: ID!) {
        viewer {
          project(id: $projectId) {
            environment(name: "master") {
              contentModel {
                locales {
                  id
                  apiId
                }
                stages {
                  id
                  apiId
                }
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
