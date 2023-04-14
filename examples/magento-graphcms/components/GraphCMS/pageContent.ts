import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AllPageRoutesDocument } from '../../graphql/AllPageRoutes.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'

/**
 * Fast path to fetch pageContent, it uses a cached allRoutes to check if a page exists, if not it
 * will return nothing.
 */
export async function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  tags: string[] = [],
  cached = false,
): Promise<Pick<ApolloQueryResult<DefaultPageQuery>, 'data'>> {
  const allRoutes = await client.query({ query: AllPageRoutesDocument, fetchPolicy: 'cache-first' })

  const found = allRoutes.data.pages.find((page) => page.url === url)

  if (!found) return { data: { pages: [] } }

  const pageQuery = await client.query({
    query: DefaultPageDocument,
    variables: { url, tags },
    fetchPolicy: cached ? 'cache-first' : undefined,
  })

  return pageQuery

  const [firstPage, ...otherPages] = pageQuery.data.pages
  const content = [...firstPage.content]

  otherPages.forEach((p) => {
    p.content.forEach((i) => {
      content.push(i)
    })
  })

  return { ...pageQuery, data: { pages: [{ ...firstPage, content }] } }

  // Returns an array of matched urls, if url is no match it will return null in the array
  // const foundUrls = urls.map((url) => {
  //   const matchedPage = allRoutes.data.pages.find((page) => page.url === url)

  //   if (!matchedPage) return null
  //   return matchedPage
  // })

  // if (foundUrls.every((item) => item === null)) {
  //   return { data: { pages: [] } }
  // }

  // Returning all query data of foundUrls
  // const promises: Promise<any>[] = []
  // for (const foundUrl of foundUrls) {
  //   if (foundUrl) {
  //     const { url } = foundUrl
  //     const promise = client.query({
  //       query: DefaultPageDocument,
  //       variables: { url }, // loop through urls if found
  //       fetchPolicy: cached ? 'network-only' : 'network-only', // Dit returned hetzelfde, undefined => cache-first (default)
  //     })
  //     promises.push(promise)
  //   }
  // }

  // const results = await Promise.all(promises)

  // let page

  // // page content is inextendible, so we need to create these new arrays
  // let newPage: any = {}
  // const newContent: any = []

  // for (const result of results) {
  //   if (result.data.pages[0].url === 'product/global') {
  //     // eslint-disable-next-line prefer-destructuring
  //     page = result.data.pages[0]
  //     // create new extendable product/global page
  //     newPage = { ...page }
  //     page.content.forEach((item) => {
  //       newContent.push(item)
  //     })
  //   } else {
  //     const { content } = result.data.pages[0]
  //     content.forEach((item) => {
  //       newContent.push(item)
  //     })
  //   }
  // }

  // newPage.content = newContent

  // console.log('FOUND: ', foundUrls)
  // console.log('RESULTS: ', results)
  // console.log('GLOBALPAGE: ', page)
  // console.log('NEWCONTENT: ', newContent)
  // console.log('NEWGLOBALPAGE: ', newPage)

  // return newPage
}
