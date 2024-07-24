"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironment = getEnvironment;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
async function getEnvironment(client, config) {
    const endpoints = await client.query({
        query: (0, graphql_tag_1.default) `
      query Environments($projectId: ID!) {
        viewer {
          id
          project(id: $projectId) {
            environments {
              name
              endpoint
              migrations {
                name
                status
              }
            }
          }
        }
      }
    `,
        variables: { projectId: config.projectId },
        errorPolicy: 'all',
    });
    if (endpoints.errors) {
        const isBadInput = endpoints.errors.some((e) => e.extensions?.code === 'BAD_USER_INPUT');
        if (isBadInput) {
            throw Error(`
        Could not find environment for projectId ${config.projectId}. 
        Please check your GC_HYGRAPH_PROJECT_ID in your env file.
      `);
        }
        throw new Error(`An error occurred: ${endpoints.errors.map((e) => e.message).join('\n')}`);
    }
    const environment = endpoints.data.viewer.project.environments.find((env) => env.name === 'master') ??
        endpoints.data.viewer.project.environments?.[0];
    return environment;
}
