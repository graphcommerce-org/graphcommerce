import { hashSHA256 } from '@envelop/response-cache'
import type { GatewayContext, GatewayPlugin } from '@graphql-hive/gateway-runtime'
import { process } from '@graphql-mesh/cross-helpers'
import type { KeyValueCache, YamlConfig } from '@graphql-mesh/types'
import { getOperationASTFromDocument, isPromise } from '@graphql-tools/utils'
import type { UseResponseCacheParameter } from '@graphql-yoga/plugin-response-cache'
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'
import { type MaybePromise } from '@whatwg-node/promise-helpers'
import CacheControlParser from 'cache-control-parser'
import jsonStableStringify from 'fast-json-stable-stringify'
import { Kind, OperationTypeNode, parse, type OperationDefinitionNode } from 'graphql'
import { MeshContext } from '../.mesh'

export function getCacheForResponseCache(
  meshCache: KeyValueCache,
): UseResponseCacheParameter['cache'] {
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
    invalidate: async (entitiesToRemove) => {
      const responseIdsToCheck = new Set<string>()

      const waitForDeletes: MaybePromise<any>[] = []

      await Promise.all(
        Array.from(entitiesToRemove).map(async (entity) => {
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

      await Promise.all(waitForDeletes)
    },
  }
}

export type ResponseCacheConfig = Omit<UseResponseCacheParameter, 'cache'> & {
  cache: KeyValueCache
}

export default function useMeshResponseCache(
  options: YamlConfig.ResponseCacheConfig & { cache: KeyValueCache },
): GatewayPlugin {
  const ttlPerType: Record<string, number> = { ...(options as ResponseCacheConfig).ttlPerType }
  const ttlPerSchemaCoordinate: Record<string, number | undefined> = {
    ...(options as ResponseCacheConfig).ttlPerSchemaCoordinate,
  }

  const { ttlPerCoordinate } = options as YamlConfig.ResponseCacheConfig
  if (ttlPerCoordinate) {
    for (const ttlConfig of ttlPerCoordinate) {
      ttlPerSchemaCoordinate[ttlConfig.coordinate] = ttlConfig.ttl
    }
  }

  // @ts-expect-error - GatewayPlugin types
  const plugin: GatewayPlugin = useResponseCache<MeshContext>({
    includeExtensionMetadata: true,
    session: (session) => session.headers.get('authorization'),
    enabled: (request) => {
      console.log(request)

      return true
    },
    buildResponseCacheKey: (params) => {
      console.log('params', params)
      const { documentString, operationName, variableValues, sessionId, request, context } = params
      const variables = variableValues ? jsonStableStringify(variableValues) : undefined
      return hashSHA256(
        [documentString, operationName, variables, sessionId, request.headers.get('store')]
          .filter((v) => !!v)
          .join('|'),
      )
    },
    shouldCacheResult: () => true,
    cache: getCacheForResponseCache(options.cache),
    ttlPerType,
    ttlPerSchemaCoordinate,
    ttl: 0,
    onTtl({ ttl, context }) {
      const query = (context as any)?.params?.query as string | undefined

      /**
       * QUERY @cacheControl support
       *
       * Extract the maxAge from the @cacheConrol directive applied on the QUERY. Query will start
       * with something like query QuerySideCacheControl @cacheControl(maxAge: 1000)
       */
      if (typeof query === 'string' && query?.includes('@cacheControl')) {
        const ast = parse(query)

        const maxAge = ast.definitions
          .filter(
            (def): def is OperationDefinitionNode =>
              def.kind === Kind.OPERATION_DEFINITION && def.operation === OperationTypeNode.QUERY,
          )
          .map(
            (def) =>
              def.directives
                ?.find((directive) => directive.name.value === 'cacheControl')
                ?.arguments?.find((arg) => arg.name.value === 'maxAge')?.value,
          )
          .map((v) => v?.kind === Kind.INT && v.value)
          .map((v) => Number(v))
          .at(0)

        if (maxAge != null) return maxAge
      }

      return ttl
    },
  })

  // plugin.onFetch = function OnFetch({ executionRequest, context }) {
  //   // Only if it is a subgraph request
  //   if (executionRequest && context) {
  //     return function onFetchDone({ response }) {
  //       const cacheControlHeader = response.headers.get('cache-control')
  //       if (cacheControlHeader != null) {
  //         const parsedCacheControl = CacheControlParser.parse(cacheControlHeader)
  //         if (parsedCacheControl['max-age'] != null) {
  //           const maxAgeInSeconds = parsedCacheControl['max-age']
  //           const maxAgeInMs = maxAgeInSeconds * 1000
  //           checkTtl(context, maxAgeInMs)
  //         }
  //         if (parsedCacheControl['s-maxage'] != null) {
  //           const sMaxAgeInSeconds = parsedCacheControl['s-maxage']
  //           const sMaxAgeInMs = sMaxAgeInSeconds * 1000
  //           checkTtl(context, sMaxAgeInMs)
  //         }
  //       }
  //     }
  //   }
  // }

  return plugin
}
