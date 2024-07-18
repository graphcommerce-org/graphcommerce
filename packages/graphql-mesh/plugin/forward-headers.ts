import { isAsyncIterable } from '@envelop/core'
import { MeshPlugin, MeshPluginOptions } from '@graphql-mesh/types'
import type { MeshContext } from '../.mesh'

interface ForwardHeaderConfig {
  forwardHeaders?: string[]
}

/**
 * Configure in your meshrc.yaml:
 *
 * ```yaml
 * plugins:
 *   - '@graphcommerce/graphql-mesh/plugin/forward-headers':
 *     forwardHeaders:
 *       - X-Magento-Cache-Id
 * ```
 *
 * On your GraphQL response, you will have a new `forwardedHeaders` field in the `extensions` object (always lower case).
 *
 * ```json
 * {
 *   "data": {},
 *   "extensions": {
 *     "forwardedHeaders": {
 *       "x-magento-cache-id": "homeHash"
 *     }
 *   }
 * }
 * ```
 */
export default function useForwardHeadersPlugin(
  config: MeshPluginOptions<ForwardHeaderConfig>,
): MeshPlugin<MeshContext> {
  const forwardHeaders = config.forwardHeaders?.map((header) => header.toLowerCase())

  const store = new WeakMap<any, Map<string, string>>()
  function getStoredForContext(context: MeshContext) {
    let stored = store.get(context)
    if (!stored) {
      stored = new Map()
      store.set(context, stored)
    }
    return stored
  }

  return {
    onFetch({ context }) {
      if (!context) return undefined
      return ({ response }) => {
        const stored = getStoredForContext(context)
        response.headers.forEach((value, headerName) => {
          if (forwardHeaders?.includes(headerName)) stored.set(headerName, value)
        })
      }
    },

    onExecute({ args: { contextValue } }) {
      return {
        onExecuteDone({ result, setResult }) {
          if (isAsyncIterable(result)) return
          const stored = store.get(contextValue)
          if (stored) {
            setResult({
              ...result,
              extensions: { ...result.extensions, forwardedHeaders: Object.fromEntries(stored) },
            })
          }
        },
      }
    },
  }
}
