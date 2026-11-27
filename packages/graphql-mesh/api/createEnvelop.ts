import type { NextApiRequest, NextApiResponse } from 'next'
import { createBuiltMeshHTTPHandler } from './globalThisMesh'

// eslint-disable-next-line @typescript-eslint/require-await
export const createServer = async (endpoint: string) => {
  if (endpoint !== '/api/graphql')
    throw Error('Moving the GraphQL Endpoint is not supported at the moment')

  const handler = createBuiltMeshHTTPHandler()
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.headers['content-type']?.startsWith('multipart/form-data') && req.body !== undefined) {
      // Next's pages-router bodyParser has already consumed the request stream and decoded it as
      // UTF-8 text, which corrupts binary `Upload` bytes (the multipart boundary survives, so the
      // request would otherwise be forwarded with silently mangled file contents).
      throw Error(
        "Multipart GraphQL requests require Next.js' bodyParser to be disabled. Add `bodyParser: false` to the route config in pages/api/graphql.ts: export const config = { api: { externalResolver: true, bodyParser: false } }",
      )
    }

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
