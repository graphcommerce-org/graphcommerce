import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AllPageRoutesDocument } from '../../graphql/AllPageRoutes.gql'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { MyPageDocument } from '../../graphql/MyPage.gql'

/**
 * Fast path to fetch pageContent, it uses a cached allRoutes to check if a page exists, if not it
 * will return nothing.
 */
export async function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  tags: string[] = [],
  cached = false,
) {
  const allRoutes = await client.query({
    query: AllPageRoutesDocument,
    fetchPolicy: cached ? 'cache-first' : 'network-only',
  })

  const found = allRoutes.data.pages.find((page) => page.url === url)

  if (!found) {
    return 0
  }

  const page = await client.query({
    query: MyPageDocument,
    variables: { url, tags },
    fetchPolicy: 'network-only', // change to cache-first
  })

  const mutablePage = { ...page.data.pages[0] }
  const mutableContent: any = []
  page.data.pages.forEach((p) => {
    p.content.forEach((i) => {
      mutableContent.push(i)
    })
  })

  mutablePage.content = mutableContent

  return mutablePage

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
