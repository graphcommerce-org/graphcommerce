import { SitemapStream, SitemapItemLoose } from 'sitemap'
import { NextApiRequest, NextApiResponse } from 'next'
import { createGzip } from 'zlib'
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

  try {
    const sm = new SitemapStream({
      hostname: `${getProtocol(req)}://${req.headers.host}`,
      xslUrl: `${getProtocol(req)}://${req.headers.host}/sitemap.xsl`,
    })
    const pipeline = sm.pipe(createGzip())

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
      const item: SitemapItemLoose = { url: page!.url! }
      if (page!.urlEN) item.links = [{ url: page!.urlEN, lang: 'en' }]

      sm.write(item)

      resultEn.pages = resultEn.pages.filter(pageEN => pageEN?.url !== page?.urlEN)
    })

    // Add other EN pages
    resultEn.pages.forEach(page => {
      sm.write({ url: page!.url! })
    })

    sm.end()

    res.status(200)
    res.setHeader('Content-Encoding', 'gzip')
    pipeline.pipe(res).on('error', e => {
      throw e
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }

  return Promise.resolve()
}
