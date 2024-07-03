import { PreviewData } from '@graphcommerce/graphql'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.revalidate) {
    const { referer } = req.headers
    const url = referer ? new URL(referer) : undefined

    if (!url) {
      res.status(401).json({ message: 'No referer header found' })
      res.end()
      return
    }

    await res.revalidate(url.pathname)

    res.writeHead(307, { Location: req.headers.referer ?? `/` })
    res.end()
    return
  }

  if (!req.query.secret) {
    res.setDraftMode({ enable: false })
    res.clearPreviewData()
    res.writeHead(307, { Location: req.headers.referer ?? `/` })
    res.end()
    return
  }

  if (req.query.secret) {
    if (req.query.secret !== import.meta.graphCommerce.previewSecret) {
      // This secret should only be known to this API route and the CMS
      res.status(401).json({ message: 'Invalid token' })
      res.end()
      return
    }

    res.setDraftMode({ enable: true })
    res.setPreviewData({ hygraphStage: 'DRAFT' } as PreviewData)
    res.writeHead(307, { Location: req.headers.referer ?? `/` })
    res.end()
  }
}
