import { AlgoliaindexSettings, MeshContext } from '@graphcommerce/graphql-mesh'
import { getIndexName } from './getIndexName'

export async function getAlgoliaSettings(context: MeshContext): Promise<AlgoliaindexSettings> {
  const settings = await context.algolia.Query.algolia_getSettings({
    args: { indexName: getIndexName(context) },
    selectionSet: /* GraphQL */ `
      {
        replicas
      }
    `,
    context,
  })

  if (!settings) {
    throw new Error('No settings found')
  }

  return settings
}
