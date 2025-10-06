import React, { useContext } from 'react'

export type AlgoliaQueryContextType = {
  queryID?: string | null
}

export const AlgoliaQueryContext = React.createContext<AlgoliaQueryContextType>({})

export function useAlgoliaQuery() {
  return useContext(AlgoliaQueryContext)
}
