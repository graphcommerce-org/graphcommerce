import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import meshSchema from 'node/meshSchema'

const createHandler = async () => {
  const apolloServer = new ApolloServer({
    schema: await meshSchema,
    tracing: true,
    engine: { reportSchema: true },
    context: ({ req }) => req,
  })
  return apolloServer.createHandler({ path: '/api/graphql' })
}
const handler = createHandler()

export const config = { api: { bodyParser: false } }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return (await handler)(req, res)
}
