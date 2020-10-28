import createHandler, { config } from '@reachdigital/graphql-mesh'
import { NextApiRequest, NextApiResponse } from 'next'
import meshConfig from '../../.meshrc.json'

const handler = createHandler(meshConfig, '/api/graphql')

export { config }
export default async (req: NextApiRequest, res: NextApiResponse) => {
  return req.method === 'OPTIONS' ? res.end() : (await handler)(req, res)
}
