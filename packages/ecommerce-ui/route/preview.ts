import { PreviewData } from '@graphcommerce/graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import { draftModeDefaults } from '../components/DraftMode/draftModeDefaults'

//http://localhost:3000/api/preview?action=enable&secret=UzI1NiIsI
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action } = req.query

  if (!action) {
    res.status(400).json({ message: 'No action provided' })
    res.end()
    return
  }

  if (action === 'enable') {
    if (!req.query.secret) {
      res.setDraftMode({ enable: false })
      res.clearPreviewData()
      res.writeHead(307, { Location: req.headers.referer ?? `/` })
      res.end()
      return
    }

    if (req.query.secret !== import.meta.graphCommerce.previewSecret) {
      // This secret should only be known to this API route and the CMS
      res.status(401).json({ message: 'Invalid token' })
      res.end()
      return
    }

    res.setDraftMode({ enable: true })
    res.setPreviewData(draftModeDefaults())
  }

  if (action === 'exit') {
    res.setDraftMode({ enable: false })
    res.clearPreviewData()
  }

  if (action === 'revalidate') {
    const { referer } = req.headers
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

  res.writeHead(307, { Location: req.headers.referer ?? `/` })
  res.end()
}
