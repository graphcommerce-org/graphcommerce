import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import gql from 'graphql-tag'
import type { HygraphConfig } from './getConfig'

export async function getEnvironment(
  client: ApolloClient<NormalizedCacheObject>,
  config: HygraphConfig,
) {
  const endpoints = await client.query<
    {
      viewer: {
        id: string
        project: {
          environments: {
            name: string
            endpoint: string
            migrations: {
              name: string
              status: string
            }[]
          }[]
        }
      }
    },
    { projectId: string }
  >({
    query: gql`
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
  })

  if (endpoints.errors) {
    const isBadInput = endpoints.errors.some((e) => e.extensions?.code === 'BAD_USER_INPUT')
    if (isBadInput) {
      throw Error(`
        Could not find environment for projectId ${config.projectId}. 
        Please check your GC_HYGRAPH_PROJECT_ID in your env file.
      `)
    }

    throw new Error(`An error occurred: ${endpoints.errors.map((e) => e.message).join('\n')}`)
  }

  const environment =
    endpoints.data.viewer.project.environments.find((env) => env.name === 'master') ??
    endpoints.data.viewer.project.environments?.[0]

  return environment
}
