import { processConfig } from '@graphql-mesh/config'
import { getMesh as getGraphQLMesh, MeshInstance } from '@graphql-mesh/runtime'
import { MeshStore, InMemoryStoreStorageAdapter } from '@graphql-mesh/store'
import { YamlConfig } from '@graphql-mesh/types'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-micro'
import '@graphql-mesh/transform-filter-schema'
import '@graphql-mesh/graphql'
import '@graphql-mesh/merger-stitching'
import '@graphql-mesh/transform-cache'
import '@graphql-mesh/cache-inmemory-lru'
import '@vue/compiler-sfc'
import 'ts-tiny-invariant'
import 'micro'
import cors from 'micro-cors'

export async function createApolloHandlerForMesh(meshInstance: MeshInstance, path: string) {
  const apolloServer = new ApolloServer({
    context: ({ req }) => req,
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // @ts-expect-error https://github.com/graphql/graphql-playground/issues/1289
        shareEnabled: true,
      }),
    ],
    ...meshInstance,
  })
  await apolloServer.start()

  const apolloHandler = apolloServer.createHandler({ path })

  return apolloHandler
}

export async function getMesh(config: unknown): Promise<MeshInstance> {
  const meshConfig = config as YamlConfig.Config

  const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), {
    validate: true,
    readonly: false,
  })

  return getGraphQLMesh(await processConfig(meshConfig, { dir: process.cwd(), store }))
}

export async function createServer(config: unknown, path: string) {
  const meshConfig = config as YamlConfig.Config

  const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), {
    validate: true,
    readonly: false,
  })
  const mesh = await getGraphQLMesh(await processConfig(meshConfig, { dir: process.cwd(), store }))
  const apolloHandler = await createApolloHandlerForMesh(mesh, path)

  const corsHandler = cors({
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version',
      'Access-Control-Allow-Origin',
      'X-HTTP-Method-Override',
      'x-apollo-tracing',
      'apollographql-client-name',

      // Magento 2 related headers
      'Authorization',
      'Store',
      'Preview-Version',
      'Content-Currency',
      'X-ReCaptcha',
    ],
  })
  return corsHandler((req, res) => (req.method === 'OPTIONS' ? res.end() : apolloHandler(req, res)))
}
