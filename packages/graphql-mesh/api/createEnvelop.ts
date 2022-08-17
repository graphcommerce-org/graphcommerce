/* eslint-disable react-hooks/rules-of-hooks */
import { createServer as createYogaServer, useExtendContext } from '@graphql-yoga/node'
import { getBuiltMesh, rawServeConfig } from '../.mesh'

export async function createServer(endpoint: string) {
  // retrieve the mesh instance (with configured Envelop plugins)
  const mesh = await getBuiltMesh()

  const { cors, playgroundTitle } = rawServeConfig ?? {}

  // pass the Mesh instance to Yoga and configure GraphiQL
  const server = createYogaServer({
    plugins: mesh.plugins,
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
