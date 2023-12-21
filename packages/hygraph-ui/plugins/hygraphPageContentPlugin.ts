import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { Pages, pageContent } from '@graphcommerce/next-ui'
import { HygraphAllPagesDocument, HygraphPagesDocument } from '../graphql'
import { parseHygraph } from '../lib'

export const func = 'pageContent'
export const exported = '@graphcommerce/next-ui/Page/pageContent'

/**
 * Todo:
 * - hook into generic pageContent function | DONE
 * - make hygraph ggl files for rowColOne, rowLinks, rowQuote under components in this folder. | DONE
 * - inject them into the RowRenderer query | DONE
 *
 * - if hygraph-ui is installed:
 *  - parse query outcomes with parser for Hygraph | DONE
 *
 * - else
 *  - use default JSON inputs
 *
 **/

const hygraphPageContentPlugin: MethodPlugin<typeof pageContent> = async (
  prev,
  url,
  client,
  cached,
) => {
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

  const parsedContent = parseHygraph(pagesData.data.pages[0].content)

  return { data: { pages: [{ ...pagesData[0], content: parsedContent }] } }
}

export const plugin = hygraphPageContentPlugin
