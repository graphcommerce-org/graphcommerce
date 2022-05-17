/* eslint-disable react-hooks/rules-of-hooks */
import { createServer as createYogaServer, useExtendContext } from '@graphql-yoga/node'
import { getBuiltMesh, rawConfig } from '../.mesh'

export async function createServer(endpoint: string) {
  // retrieve the mesh instance (with configured Envelop plugins)
  const mesh = await getBuiltMesh()

  const { cors, playgroundTitle } = rawConfig.serve ?? {}

  // pass the Mesh instance to Yoga and configure GraphiQL
  const server = createYogaServer({
    plugins: [
      ...mesh.plugins,
      useExtendContext(({ req, res }) => ({
        ...req,
        headers: req.headers,
        cookies: req.cookies,
        res,
      })),
    ],
    context: ({ req }) => ({ ...req, ...mesh.meshContext }),
    graphiql: {
      endpoint,
      title: playgroundTitle,
    },
    maskedErrors: false,
    parserCache: false,
    validationCache: false,
    logging: mesh.logger,
    cors,
  })

  return server.requestListener
}
