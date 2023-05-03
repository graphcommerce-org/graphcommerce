import type { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { hygraphDynamicRows } from '../lib/hygraphDynamicRows'

export const func = 'hygraphPageContent'
export const exported = '@graphcommerce/graphcms-ui/server'

const hygraphDynamicRowsPageContent: MethodPlugin<typeof hygraphPageContent> = (
  prev,

  url,
  additionalProperties,
  cached = false,
) => {
  const pageQuery = prev(url, additionalProperties, cached)
  return hygraphDynamicRows(pageQuery, url, cached, additionalProperties)
}

export const plugin = hygraphDynamicRowsPageContent
