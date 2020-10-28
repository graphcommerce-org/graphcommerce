import createHandler, { config } from '@reachdigital/graphql-mesh'
import { NextApiRequest, NextApiResponse } from 'next'
import meshConfig from '../../.meshrc.json'

const handler = createHandler(meshConfig, '/api/graphql')

export { config }
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )
  return (await handler)(req, res)
}
