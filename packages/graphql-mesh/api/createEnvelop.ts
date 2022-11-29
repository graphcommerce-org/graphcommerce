import { createServer as createYogaServer } from '@graphql-yoga/node'
import { NextApiRequest, NextApiResponse } from 'next'
import { getBuiltMesh, rawServeConfig } from '../.mesh'

/** @deprecated Use `createBuiltMeshHTTPHandler` instead */
export async function createServer(endpoint: string) {
  console.warn('createServer() is deprecated. Use .mesh/createBuiltMeshHTTPHandler() instead.')
  // retrieve the mesh instance (with configured Envelop plugins)
  const mesh = await getBuiltMesh()

  const { cors, playgroundTitle } = rawServeConfig ?? {}

  // pass the Mesh instance to Yoga and configure GraphiQL
  return createYogaServer<{
    req: NextApiRequest
    res: NextApiResponse
  }>({
    plugins: [...mesh.plugins],
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
}
