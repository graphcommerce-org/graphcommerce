import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import { mesh } from 'lib/apolloServer'

const createHandler = async () => {
  const { schema } = await mesh
  const apolloServer = new ApolloServer({ schema })
  return apolloServer.createHandler({ path: '/api/graphql' })
}
const handler = createHandler()

export const config = { api: { bodyParser: false } }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return (await handler)(req, res)
}
