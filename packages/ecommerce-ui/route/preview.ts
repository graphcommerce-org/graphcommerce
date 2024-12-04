import type { PreviewData } from '@graphcommerce/graphql'
import type { NextApiRequest, NextApiResponse } from 'next'
import { previewModeDefaults } from '../components/PreviewMode/previewModeDefaults'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action } = req.query

  // const domain = req.url ? new URL(req.url) : undefined
  const referer = req.headers.referer ? new URL(req.headers.referer) : undefined
  const redirectTo =
    req.headers.redirectTo ??
    (referer && req.headers.host === referer.host ? referer.pathname : '/')

  if (!action) {
    res.status(400).json({ message: 'No action provided' })
    res.end()
    return
  }

  if (action === 'enable' && req.query.secret) {
    if (req.query.secret !== import.meta.graphCommerce.previewSecret) {
      // This secret should only be known to this API route and the CMS
      res.status(401).json({ message: 'Invalid token' })
      res.end()
      return
    }

    res.setDraftMode({ enable: true })
    const previewData = req.query.previewDat
      ? (JSON.parse(`${req.query.previewData}`) as PreviewData)
      : previewModeDefaults()

    res.setPreviewData(previewData)
  }

  if (action === 'exit') {
    res.setDraftMode({ enable: false })
    res.clearPreviewData()
  }

  if (action === 'revalidate') {
    const url = referer ? new URL(referer) : undefined

    if (!url) {
      res.status(401).json({ message: 'No referer header found' })
      res.end()
      return
    }

    await res.revalidate(url.pathname)
  }

  if (action === 'update' && req.preview && req.query.previewData) {
    // todo we should probabaly validate this.
    res.setPreviewData(JSON.parse(`${req.query.previewData}`) as PreviewData)
  }

  res.writeHead(307, { Location: redirectTo })
  res.end()
}
