import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.secret) {
    // Exit the current user from "Preview Mode". This function accepts no args.
    res.clearPreviewData()

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/${req.query.slug}` })
  } else {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== import.meta.graphCommerce.previewSecret) {
      res.status(401).json({ message: 'Invalid token' })
      res.end()
      return
    }

    if (!req.query.slug) {
      res.status(401).json({ message: 'Please provide a slug' })
      res.end()
    }

    // Enable Preview Mode by setting the cookies, max 60 minutes.
    res.setPreviewData({}, { maxAge: 60 * 60 })

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/${req.query.slug}` })
  }
  res.end()
}
