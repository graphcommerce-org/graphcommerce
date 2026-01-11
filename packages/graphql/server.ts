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
