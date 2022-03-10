import { processConfig } from '@graphql-mesh/config'
import { getMesh as getGraphQLMesh, MeshInstance } from '@graphql-mesh/runtime'
import { YamlConfig } from '@graphql-mesh/types'
import { createServer as createYogaServer } from '@graphql-yoga/node'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function getMesh(config: unknown): Promise<MeshInstance> {
  return getGraphQLMesh(await processConfig(config as YamlConfig.Config, { dir: process.cwd() }))
}

export async function createServer(mesh: Promise<MeshInstance>, path: string) {
  const meshInstance = await mesh

  const server = createYogaServer({
    ...meshInstance,
    cors: false,
    graphiql: {},
    endpoint: '/api/graphql',
    logging: {
      prettyLog: false,
    },
  })

  return server.requestListener
}
