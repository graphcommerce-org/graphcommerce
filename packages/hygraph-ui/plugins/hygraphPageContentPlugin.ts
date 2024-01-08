import { resolveMetadata, type pageContent } from '@graphcommerce/content-areas'
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

  const page = content.data.pages?.[0]

  if (!page) return { ...prevResults, notFound: true }

  return {
    ...prevResults,
    metadata: resolveMetadata({
      metadataBase: new URL(import.meta.graphCommerce.canonicalBaseUrl),
      title: page.title,
      description: page.metaDescription,
      robots: page.metaRobots
        ? {
            index: !page.metaRobots.includes('noindex'),
            follow: !page.metaRobots.includes('nofollow'),
          }
        : { index: true, follow: true },
    }),
    hygraphPage: content.data.pages?.[0],
  }
}

export const plugin = hygraphPageContentPlugin
