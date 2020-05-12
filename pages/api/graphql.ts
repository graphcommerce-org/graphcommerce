import { getMesh, findAndParseConfig } from '@graphql-mesh/runtime'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'

const createHandler = async () => {
  const meshConfig = await findAndParseConfig()
  const { schema } = await getMesh(meshConfig)
  const apolloServer = new ApolloServer({ schema })
  return apolloServer.createHandler({ path: '/api/graphql' })
}
const handler = createHandler()

export const config = { api: { bodyParser: false } }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return (await handler)(req, res)
}
