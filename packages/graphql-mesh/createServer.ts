import { processConfig } from '@graphql-mesh/config'
import { getMesh as getGraphQLMesh, MeshInstance } from '@graphql-mesh/runtime'
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
import { plugin as apolloTracingPlugin } from 'apollo-tracing'
import cors from 'micro-cors'

export async function getMesh(config: unknown): Promise<MeshInstance> {
  return getGraphQLMesh(await processConfig(config as YamlConfig.Config, { dir: process.cwd() }))
}

export async function createServer(mesh: Promise<MeshInstance>, path: string) {
  const meshInstance = await mesh
  const apolloServer = new ApolloServer({
    context: ({ req }) => req,
    introspection: true,
    ...meshInstance,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // @ts-expect-error https://github.com/graphql/graphql-playground/issues/1289
        shareEnabled: true,
      }),
      // @ts-expect-error apolloTracingPlugin is not officially supported anymore
      apolloTracingPlugin(),
    ],
  })
  await apolloServer.start()

  const apolloHandler = apolloServer.createHandler({ path })

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
