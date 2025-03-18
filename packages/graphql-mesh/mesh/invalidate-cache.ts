import type { KeyValueCache } from '@graphql-mesh/types'
import { type MaybePromise } from '@whatwg-node/promise-helpers'
import type { Resolvers } from '../.mesh'

/**
 * This is inspired by
 * https://github.com/ardatan/graphql-mesh/blob/master/packages/plugins/response-cache/src/index.ts
 *
 * @param meshCache
 * @returns
 */
async function removeFromCache(
  meshCache: KeyValueCache,
  entitiesToRemove: { typename: string; id: string | null }[],
) {
  const responseIdsToCheck = new Set<string>()

  const waitForDeletes: MaybePromise<any>[] = []

  await Promise.all(
    entitiesToRemove.map(async (entity) => {
      const entityKey = entity.id ? `${entity.typename}.${entity.id}:` : `${entity.typename}`
      const entityToRemove = await meshCache.getKeysByPrefix(`response-cache:${entityKey}`)
      entityToRemove.forEach((cacheEntryName) => {
        const [, , responseId] = cacheEntryName.split(':')
        responseIdsToCheck.add(responseId)
        waitForDeletes.push(meshCache.delete(cacheEntryName))
      })
    }),
  )

  await Promise.all(
    [...responseIdsToCheck.values()].map(async (responseId) => {
      const cacheEntries = await meshCache.getKeysByPrefix(`response-cache:${responseId}:`)
      cacheEntries.forEach((cacheEntry) => {
        waitForDeletes.push(meshCache.delete(cacheEntry))
      })

      if (cacheEntries.length !== 0) {
        waitForDeletes.push(meshCache.delete(`response-cache:${responseId}`))
      }
    }),
  )

  return Promise.all(waitForDeletes)
}

export const resolvers: Resolvers = {
  Mutation: {
    invalidateCacheEntities: async (root, args, context, info) => {
      await removeFromCache(
        context.cache,
        args.entities.map((e) => ({ typename: e.typename, id: e.id ?? null })),
      )
      return true
    },
  },
}
