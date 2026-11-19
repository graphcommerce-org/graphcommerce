import type { ApolloClient } from '@apollo/client'
import { refreshRenewSignal } from './renewSignal'

/**
 * An Apollo client for server side rendering that lives longer than one request.
 *
 * Each query waits for the renew signal. After a publish, `create` makes a new client and the
 * queries go to that client. A query that is in flight completes on the client that it started on.
 */
export function renewableSsrClient(create: () => ApolloClient): ApolloClient {
  let client = create()
  let renewedAt = Date.now()

  return new Proxy(client, {
    get(_, key) {
      if (key === 'query')
        return async (...args: Parameters<ApolloClient['query']>) => {
          const signal = await refreshRenewSignal()
          if (signal && signal > renewedAt) {
            renewedAt = signal
            client = create()
          }
          return client.query(...args)
        }

      const value: unknown = Reflect.get(client, key)
      return typeof value === 'function' ? value.bind(client) : value
    },
  })
}
