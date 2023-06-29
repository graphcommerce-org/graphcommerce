/* eslint-disable no-console */

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawTags = req.headers['x-magento-tags-pattern']

  console.log(`varnish-purge: purge request from ${req.socket.remoteAddress}`)
  console.log(`varnish-purge: purge requested for: ${rawTags}`)

  res.status(200)
  res.send('OK')
  res.end()
}
