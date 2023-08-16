import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client'
import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { fetch } from '@whatwg-node/fetch'

export const readSchema = async (config: GraphCommerceConfig) => {
  if (!config.hygraphProjectId) {
    throw new Error('Please provide GC_HYGRAPH_PROJECT_ID in your env file')
  }

  if (!config.hygraphWriteAccessToken) {
    throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file')
  }

  const projectId = config.hygraphProjectId

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

  return data
}
