import type { hygraphPageContent } from '@graphcommerce/graphcms-ui'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { hygraphDynamicRows } from '../lib/hygraphDynamicRows'

export const func = 'hygraphPageContent'
export const exported = '@graphcommerce/graphcms-ui'

const hygraphDynamicRowsPageContent: MethodPlugin<typeof hygraphPageContent> = (
  prev,
  client,
  url,
  additionalProperties,
  cached = false,
) => {
  const pageQuery = prev(client, url, additionalProperties, cached)
  return hygraphDynamicRows(client, pageQuery, url, cached, additionalProperties)
}

export const plugin = hygraphDynamicRowsPageContent
