import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AllPageRoutesDocument } from '../../graphql/AllPageRoutes.gql'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'

/**
 * Fast path to fetch pageContent, it uses a cached allRoutes to check if a page exists, if not it
 * will return nothing.
 */
export async function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  urls: string[],
  cached = false,
) {
  const allRoutes = await client.query({ query: AllPageRoutesDocument, fetchPolicy: 'cache-first' })

  const found = urls.map((url) => {
    const matchedPage = allRoutes.data.pages.find((page) => page.url === url)

    if (!matchedPage) return null
    return matchedPage
  })

  if (found.every((item) => item === null)) {
    return { data: { pages: [] } }
  }

  // Returning all query results of found urls
  const promises: Promise<any>[] = []

  for (const foundUrl of found) {
    if (foundUrl) {
      const { url } = foundUrl
      const promise = client.query({
        query: DefaultPageDocument,
        variables: { url }, // loop through urls if found
        fetchPolicy: cached ? 'cache-first' : undefined, // Dit returned hetzelfde, undefined => cache-first (default)
      })
      promises.push(promise)
    }
  }

  // an array of all the found pages with their defaultpage data
  const results = await Promise.all(promises)

  let globalPage
  let newGlobalPage: any = {}

  // globalpage content is inextendible, so we need to create a new array
  const newContent: any = []

  for (const result of results) {
    if (result.data.pages[0].url === 'product/global') {
      // eslint-disable-next-line prefer-destructuring
      globalPage = result.data.pages[0]
      // create new extendable product/global page
      newGlobalPage = { ...globalPage }
      globalPage.content.forEach((item) => {
        newContent.push(item)
      })
    }
    // if the loop index is not one, merge result.data.pages[0].content into product/global.content
    else {
      const { content } = result.data.pages[0]
      content.forEach((item) => {
        newContent.push(item)
      })
    }
  }

  newGlobalPage.content = newContent

  console.log('FOUND: ', found)
  console.log('RESULTS: ', results)
  console.log('GLOBALPAGE: ', globalPage)
  console.log('NEWCONTENT: ', newContent)
  console.log('NEWGLOBALPAGE: ', newGlobalPage)

  // we actually want to merge the content data from the aliasses into the content from the product global. And then return the whole product global defaultpage
  return newGlobalPage
}
