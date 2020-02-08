import { createGzip } from 'zlib'
import { Sitemap, ISitemapItemOptionsLoose } from 'sitemap'
import { NextApiRequest, NextApiResponse } from 'next'
import { getStaticPaths } from '../../graphcms/ssg'
import { GQLLocale } from '../../generated/graphql'

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

    const paths = await getStaticPaths('', GQLLocale.Nl)
    paths.forEach(url => {
      sm.add({ url })
    })
    res.send(sm.toGzip())
  } catch (e) {
    console.error(e)
    res.status(500).end()
    return Promise.resolve()
  }
}
