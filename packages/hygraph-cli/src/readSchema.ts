import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client'
import { GraphCommerceConfig } from '@graphcommerce/next-config'
import fetch from 'cross-fetch'

export const readSchema = async (config: GraphCommerceConfig) => {
  const projectId = config.hygraphProjectId

  if (!config.hygraphWriteAccessToken) {
    throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file')
  }

  if (!projectId) {
    throw new Error('Please provide projectId in your env file')
  }

  const hygraphClient = new ApolloClient({
    link: new HttpLink({
      uri: 'https://management.hygraph.com/graphql',
      fetch,
      headers: { Authorization: `Bearer ${config.hygraphWriteAccessToken}` },
    }),
    cache: new InMemoryCache(),
  })

  const { data } = await hygraphClient.query({
    query: gql`
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
  })

  return data
}
