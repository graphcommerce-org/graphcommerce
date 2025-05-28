import type { AlgoliasettingsResponse, MeshContext } from '@graphcommerce/graphql-mesh'
import type { GraphQLError } from 'graphql'
import { getIndexName } from './getIndexName'

function isGraphQLError(err: unknown): err is GraphQLError {
  return !!(err as GraphQLError)?.message
}

export async function getAlgoliaSettings(context: MeshContext): Promise<AlgoliasettingsResponse> {
  const cacheKey = `algolia_getSettings_${getIndexName(context)}`
  const settingsCached = context.cache.get(cacheKey)
  if (settingsCached) return settingsCached

  const settings = await context.algolia.Query.algolia_getSettings({
    args: { indexName: getIndexName(context) },
    selectionSet: /* GraphQL */ `
      {
        replicas
        attributesForFaceting
      }
    `,
    context,
  })

  if (isGraphQLError(settings)) throw settings
  if (!settings) throw Error('No settings found')

  await context.cache.set(cacheKey, settings)

  return settings
}
