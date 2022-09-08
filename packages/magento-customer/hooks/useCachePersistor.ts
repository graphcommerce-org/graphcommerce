import { useApolloClient } from '@graphcommerce/graphql'
import { CachePersistor } from 'apollo-cache-persist'
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types'
import { useEffect, useRef } from 'react'

export function useCachePersistor() {
  const client = useApolloClient()
  const persistor = new CachePersistor({
    cache: client.cache,
    storage: window.localStorage as PersistentStorage<PersistedData<string>>,
  })

  return {
    persistor,
  }
}
