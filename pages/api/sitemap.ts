import { SitemapStream, SitemapItemLoose } from 'sitemap'
import { NextApiRequest, NextApiResponse } from 'next'
import { createGzip } from 'zlib'
import { GetStaticPathsDocument } from 'generated/apollo'
import apolloClientInit from 'node/apolloClient'

function getProtocol(req: NextApiRequest) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

    const apolloClient = await apolloClientInit()
    const { data: resultNl } = await apolloClient.query<
      GQLGetStaticPathsQuery,
      GQLGetStaticPathsQueryVariables
    >({ query: GetStaticPathsDocument, variables: { startsWith: '', locale: 'nl' } })

    const { data: resultEn } = await apolloClient.query<
      GQLGetStaticPathsQuery,
      GQLGetStaticPathsQueryVariables
    >({ query: GetStaticPathsDocument, variables: { startsWith: '', locale: 'en' } })

    let pagesEn = resultEn.pages

    // Add NL Pages with hreflang alternative
    resultNl.pages.forEach((page) => {
      const item: SitemapItemLoose = { url: page.url, links: [] }

      page.localizations.forEach((localization) => {
        if (item.links) {
          item.links.push({
            url: localization.url,
            lang: localization.locale,
          })

          pagesEn = pagesEn.filter((pageEn) => pageEn.url !== localization.url)
        }
      })

      sm.write(item)
    })

    // Add other EN pages
    pagesEn.forEach((page) => sm.write({ url: page.url }))

    sm.end()

    res.status(200)
    res.setHeader('Content-Encoding', 'gzip')
    pipeline.pipe(res).on('error', (e) => {
      throw e
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }

  return Promise.resolve()
}
