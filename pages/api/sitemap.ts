import { Sitemap, ISitemapItemOptionsLoose } from 'sitemap'
import { NextApiRequest, NextApiResponse } from 'next'
import { handleRootUrl } from '../../graphcms/ssg'
import {
  GQLGetStaticPathsNlQuery,
  GQLGetStaticPathsNlQueryVariables,
  GetStaticPathsNlDocument,
  GQLGetStaticPathsEnQuery,
  GQLGetStaticPathsEnQueryVariables,
  GetStaticPathsEnDocument,
} from '../../generated/graphql'
import { initApolloClient } from '../../lib/apollo'

function getProtocol(req: NextApiRequest) {
  // @ts-ignore
  let proto = req.connection.encrypted ? 'https' : 'http'
  // only do this if you trust the proxy
  proto = (req.headers['x-forwarded-proto'] as string) || proto
  return proto.split(/\s*,\s*/)[0]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Encoding', 'gzip')
  res.status(200)

  try {
    const sm = new Sitemap({
      hostname: `${getProtocol(req)}://${req.headers.host}`,
      // @ts-ignore
      xslUrl: '/sitemap.xsl',
    })

    const apolloClient = initApolloClient()
    const { data: resultNl } = await apolloClient.query<
      GQLGetStaticPathsNlQuery,
      GQLGetStaticPathsNlQueryVariables
    >({ query: GetStaticPathsNlDocument, variables: { startsWith: '' } })

    const { data: resultEn } = await apolloClient.query<
      GQLGetStaticPathsEnQuery,
      GQLGetStaticPathsEnQueryVariables
    >({ query: GetStaticPathsEnDocument, variables: { startsWith: '' } })

    // Add NL Pages with hreflang alternative
    resultNl.pages.forEach(page => {
      const item: ISitemapItemOptionsLoose = {
        url: handleRootUrl(page!.url!),
      }
      if (page!.urlEN) item.links = [{ url: handleRootUrl(page!.urlEN), lang: 'en' }]
      sm.add(item)

      resultEn.pages = resultEn.pages.filter(pageEN => pageEN?.url !== page?.urlEN)
    })

    // Add other EN pages
    resultEn.pages.forEach(page => {
      sm.add({
        url: handleRootUrl(page!.url!),
      })
    })

    res.send(sm.toGzip())
  } catch (e) {
    console.error(e)
    res.status(500).end()
    return Promise.resolve()
  }
}
