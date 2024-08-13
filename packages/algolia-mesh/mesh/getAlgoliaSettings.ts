import { AlgoliaindexSettings, MeshContext } from '@graphcommerce/graphql-mesh'
import { getIndexName } from './getIndexName'

let settingsCache: AlgoliaindexSettings | null = null

export async function getAlgoliaSettings(context: MeshContext): Promise<AlgoliaindexSettings> {
  if (!settingsCache) {
    settingsCache = await context.algolia.Query.algolia_getSettings({
      args: { indexName: getIndexName(context) },
      selectionSet: /* GraphQL */ `
        {
          replicas
        }
      `,
      context,
    })
  }

  if (!settingsCache) throw Error('No settings found')
  return settingsCache
}
