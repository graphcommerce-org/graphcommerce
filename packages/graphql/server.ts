import 'server-only'

// Server-safe exports from @graphcommerce/graphql
// These don't use React hooks

export { default as fragments } from './generated/fragments.json'
export * from './generated/types'
export * from './config'
export * from './utils/getPreviewData'
export * from './utils/cachePolicy'

// Server-side context functions (without the hooks)
export { getPrivateQueryContextMesh, getPrivateQueryContext } from './hooks/usePrivateQueryContext'

// Performance measurement (server-safe, only uses console/Map)
export { flushMeasurePerf } from './components/GraphQLProvider/measurePerformanceLink'

// Re-export server-safe Apollo utilities
export type { TypedDocumentNode } from '@graphql-typed-document-node/core'
export type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
export { gql } from '@apollo/client'
export { cloneDeep, mergeDeep } from '@apollo/client/utilities/internal'
