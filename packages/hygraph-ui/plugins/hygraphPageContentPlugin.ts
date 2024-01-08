import type { pageContent } from '@graphcommerce/content-areas'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { hygraphPageContent } from '..'

export const func = 'pageContent'
export const exported = '@graphcommerce/content-areas/server/pageContent'

const hygraphPageContentPlugin: MethodPlugin<typeof pageContent> = async (
  prev,
  client,
  url,
  additionalProperties,
  cached,
) => {
  const [prevResults, content] = await Promise.all([
    prev(client, url, additionalProperties, cached),
    hygraphPageContent(client, url, additionalProperties, cached),
  ])

  return {
    ...prevResults,
    hygraphPage: content.data.pages?.[0],
  }
}

export const plugin = hygraphPageContentPlugin
