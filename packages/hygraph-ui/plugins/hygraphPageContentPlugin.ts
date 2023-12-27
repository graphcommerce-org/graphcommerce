import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { Pages, pageContent } from '@graphcommerce/next-ui'
import { HygraphAllPagesDocument, HygraphPagesDocument } from '../graphql'
import { parseHygraphContent, parseHygraphContentItem } from '../lib'

export const func = 'pageContent'
export const exported = '@graphcommerce/next-ui/Page/pageContent'

const hygraphPageContentPlugin: MethodPlugin<typeof pageContent> = async (
  prev,
  url,
  client,
  cached,
) => {
  console.log(12345, 'hygraphPageContentPlugin')
  const staticClient: ApolloClient<NormalizedCacheObject> =
    client as ApolloClient<NormalizedCacheObject>

  const alwaysCache = process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined
  const fetchPolicy = cached ? alwaysCache : undefined

  const allRoutes = await staticClient.query({
    query: HygraphAllPagesDocument,
    fetchPolicy: alwaysCache,
  })

  const found = allRoutes.data.pages.some((page) => page.url === url)

  if (!found) {
    return Promise.resolve({ data: { pages: [] } })
  }

  const pagesData = (await staticClient.query({
    query: HygraphPagesDocument,
    variables: { url },
    fetchPolicy,
  })) as {
    data: Pages
  }

  // const parsedContent = parseContent(pagesData.data.pages[0].content)
  const parsedHygraphContent = parseHygraphContent(pagesData.data.pages[0].content)

  const prevData = await prev(url)

  return {
    data: {
      ...prevData.data,
      pages: [
        {
          ...pagesData[0],
          content: [...(prevData.data.pages[0]?.content ?? []), ...parsedHygraphContent],
        },
      ],
    },
  }
}

export const plugin = hygraphPageContentPlugin
