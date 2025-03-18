import type { KeyValueCache } from '@graphql-mesh/types'
import { isPromise, mapMaybePromise } from '@graphql-tools/utils'
import type { UseResponseCacheParameter } from '@graphql-yoga/plugin-response-cache'
import { handleMaybePromise } from '@whatwg-node/promise-helpers'
import type { Resolvers } from '../.mesh'

/**
 * This is a copy of
 * https://github.com/ardatan/graphql-mesh/blob/master/packages/plugins/response-cache/src/index.ts
 *
 * @param meshCache
 * @returns
 */
function getCacheForResponseCache(
  meshCache: KeyValueCache,
): NonNullable<UseResponseCacheParameter['cache']> {
  return {
    get(responseId) {
      return meshCache.get(`response-cache:${responseId}`)
    },
    set(responseId, data, entities, ttl) {
      const ttlConfig = Number.isFinite(ttl) ? { ttl: ttl / 1000 } : undefined
      const jobs: PromiseLike<void>[] = []
      const job = meshCache.set(`response-cache:${responseId}`, data, ttlConfig)
      if (isPromise(job)) {
        jobs.push(job)
      }
      for (const { typename, id } of entities) {
        const entryId = `${typename}.${id}`
        const job1 = meshCache.set(`response-cache:${entryId}:${responseId}`, {}, ttlConfig)
        const job2 = meshCache.set(`response-cache:${responseId}:${entryId}`, {}, ttlConfig)
        if (isPromise(job1)) {
          jobs.push(job1)
        }
        if (isPromise(job2)) {
          jobs.push(job2)
        }
      }
      if (jobs.length === 0) {
        return undefined
      }
      if (jobs.length === 1) {
        return jobs[0] as Promise<void>
      }
      return Promise.all(jobs).then(() => undefined)
    },
    invalidate(entitiesToRemove) {
      const responseIdsToCheck = new Set<string>()
      const entitiesToRemoveJobs: PromiseLike<any>[] = []
      for (const { typename, id } of entitiesToRemove) {
        const entryId = `${typename}.${id}`

        const job = handleMaybePromise(
          () => meshCache.getKeysByPrefix(`response-cache:${entryId}:`),
          (cacheEntriesToDelete) => {
            console.log(cacheEntriesToDelete)
            const jobs: PromiseLike<any>[] = []
            for (const cacheEntryName of cacheEntriesToDelete) {
              const [, , responseId] = cacheEntryName.split(':')
              responseIdsToCheck.add(responseId)
              const job = meshCache.delete(cacheEntryName)
              if (isPromise(job)) {
                jobs.push(job)
              }
            }
            if (jobs.length === 0) {
              return undefined
            }
            if (jobs.length === 1) {
              return jobs[0]
            }
            return Promise.all(jobs)
          },
        )
        if (isPromise(job)) {
          entitiesToRemoveJobs.push(job)
        }
      }
      let promiseAllJob: PromiseLike<any> | undefined
      if (entitiesToRemoveJobs.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        promiseAllJob = entitiesToRemoveJobs[0]
      } else if (entitiesToRemoveJobs.length > 0) {
        promiseAllJob = Promise.all(entitiesToRemoveJobs)
      }
      return handleMaybePromise(
        () => promiseAllJob,
        () => {
          const responseIdsToCheckJobs: PromiseLike<any>[] = []
          for (const responseId of responseIdsToCheck) {
            const job = handleMaybePromise(
              () => meshCache.getKeysByPrefix(`response-cache:${responseId}:`),
              (cacheEntries) => {
                console.log({ cacheEntries })

                cacheEntries.forEach((cacheEntry) => {
                  meshCache.delete(cacheEntry)
                })

                if (cacheEntries.length !== 0) {
                  return meshCache.delete(`response-cache:${responseId}`)
                }

                return undefined
              },
            )
            if (isPromise(job)) {
              responseIdsToCheckJobs.push(job)
            }
          }
          if (responseIdsToCheckJobs.length === 0) {
            return undefined
            // eslint-disable-next-line no-else-return
          } else if (responseIdsToCheckJobs.length === 1) {
            return responseIdsToCheckJobs[0]
          }
          return Promise.all(responseIdsToCheckJobs)
        },
      )
    },
  }
}

export const resolvers: Resolvers = {
  Mutation: {
    invalidateCacheEntities: async (root, args, context, info) => {
      // console.log(await context.cache.getKeysByPrefix('response-cache:'))
      const cacheForResponseCache = getCacheForResponseCache(context.cache)

      await cacheForResponseCache.invalidate(
        args.entities.map((e) => ({ typename: e.typename, id: e.id ?? '' })),
      )
      await context.cache.delete('default')
      return true
    },
  },
}
