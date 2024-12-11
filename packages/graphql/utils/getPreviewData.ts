import type { ApolloClient } from '@apollo/client'
import type { PreviewConfig } from '../config'

export function getPreviewData(client: ApolloClient<object>): PreviewConfig | undefined {
  if ('preview' in client.defaultOptions) return client.defaultOptions.preview as PreviewConfig
  return undefined
}
