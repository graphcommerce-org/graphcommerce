import type { NextApiRequest, NextApiResponse } from 'next'
import { createBuiltMeshHTTPHandler } from '../.mesh'

const handler = createBuiltMeshHTTPHandler()

// eslint-disable-next-line @typescript-eslint/require-await
export const createServer = async (endpoint: string) => {
  if (endpoint !== '/api/graphql')
    throw Error('Moving the GraphQL Endpoint is not supported at the moment')
  return (req: NextApiRequest, res: NextApiResponse) => {
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

    handler(req, res)
  }
}
