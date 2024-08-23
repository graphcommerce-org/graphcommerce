import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { Schema } from './types'

export const readSchema = async (
  managementClient: ApolloClient<NormalizedCacheObject>,
  projectId: string,
) => {
  const { data } = await managementClient.query({
    query: gql`
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
  })

  return data as {
    viewer: {
      project: {
        environment: {
          contentModel: Schema
        }
      }
    }
  }
}
