import type { hygraphPageContent as hygraphPageContentType } from '@graphcommerce/hygraph-ui'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { hygraphDynamicRows } from '../lib/hygraphDynamicRows'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/hygraph-ui',
}

export const hygraphPageContent: FunctionPlugin<typeof hygraphPageContentType> = (
  prev,
  client,
  url,
  additionalProperties,
  cached = false,
) => {
  const pageQuery = prev(client, url, additionalProperties, cached)
  return hygraphDynamicRows(client, pageQuery, url, cached, additionalProperties)
}
