import { ApolloServer } from 'apollo-server-micro'
import * as queries from 'generated/documents'
import { DocumentNode, print } from 'graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import { mesh } from 'node/meshSchema'

const tabs = Object.entries(queries)
  .filter(([name]) => name.endsWith('Document'))
  .map(([name, gql]) => ({
    name: name.replace('Document', ''),
    query: print(gql as DocumentNode),
    endpoint: '/api/graphql',
  }))
  .filter(({ query }) => query.includes('@client') === false)

const createHandler = async () => {
  const apolloServer = new ApolloServer({
    tracing: true,
    engine: { reportSchema: true },
    context: (await mesh).contextBuilder,
    introspection: true,
    playground: { tabs },
    ...(await mesh),
  })
  return apolloServer.createHandler({ path: '/api/graphql' })
}
const handler = createHandler()

export const config = { api: { bodyParser: false } }

export default async (req: NextApiRequest, res: NextApiResponse) => (await handler)(req, res)
