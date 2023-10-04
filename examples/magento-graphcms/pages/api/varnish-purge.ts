/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawTags = req.headers['x-magento-tags-pattern']

  // Based on the tags we receive, figure out which paths must be invalidated

  console.log(`varnish-purge: purge request from ${req.socket.remoteAddress}`)
  console.log(`varnish-purge: purge requested for: ${rawTags}`)

  // TODO: Purge cache tags to IDs, obtain paths to invalidate

  res.status(200)
  res.send('OK')
  res.end()
}
