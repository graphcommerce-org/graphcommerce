import type { NextApiRequest, NextApiResponse } from 'next'
import { createBuiltMeshHTTPHandler } from './globalThisMesh'

// eslint-disable-next-line @typescript-eslint/require-await
export const createServer = async (endpoint: string) => {
  if (endpoint !== '/api/graphql')
    throw Error('Moving the GraphQL Endpoint is not supported at the moment')

  const handler = createBuiltMeshHTTPHandler()
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
    const requestedHeaders = req.headers['access-control-request-headers']
    if (requestedHeaders) {
      res.setHeader('Access-Control-Allow-Headers', requestedHeaders)
    }

    if (req.method === 'OPTIONS') {
      res.status(200)
      res.end()
      return
    }

    await handler(req, res)
  }
}
