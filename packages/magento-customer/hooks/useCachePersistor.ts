import { useApolloClient } from '@graphcommerce/graphql'
import { CachePersistor, PersistentStorage } from 'apollo3-cache-persist'
import { useMemo } from 'react'

export function useCachePersistor() {
  const client = useApolloClient()
  const persistor = useMemo(
    () =>
      new CachePersistor({
        cache: client.cache,
        storage: window.localStorage as PersistentStorage<string>,
      }),
    [client.cache],
  )

  return {
    persistor,
  }
}
