import { MeshInstance } from '@graphql-mesh/runtime'
import { YamlConfig } from '@graphql-mesh/types'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-micro'
import '@graphql-mesh/transform-filter-schema'
import '@graphql-mesh/graphql'
import '@graphql-mesh/merger-stitching'
import '@graphql-mesh/transform-cache'
import 'ts-tiny-invariant'
import 'micro'
import cors from 'micro-cors'

export function injectEnv(json: YamlConfig.Config & { $schema?: string }): YamlConfig.Config {
  delete json.$schema
  let content = JSON.stringify(json)

  if (typeof process === 'undefined' || 'env' in process === false) {
    throw new Error('Process process.env not available')
  }

  content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
    let varName = variable
    let defaultValue = ''

    if (variable.includes(':')) {
      const spl = variable.split(':')
      varName = spl.shift()
      defaultValue = spl.join(':')
    }

    if (!process.env[varName]) {
      throw new Error(`Env variable ${varName} not defined`)
    }

    return process.env[varName] || defaultValue
  })

  return JSON.parse(content)
}

export async function createHandler(meshInstance: MeshInstance, path: string) {
  const apolloServer = new ApolloServer({
    context: meshInstance.contextBuilder,
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
      'Authorization',
      'Store',
      'Preview-Version',
      'Content-Currency',
      'X-Captcha',
      'x-apollo-tracing',
      'apollographql-client-name',
    ],
  })

  const apolloHandler = apolloServer.createHandler({ path })
  return corsHandler((req, res) => (req.method === 'OPTIONS' ? res.end() : apolloHandler(req, res)))
}
