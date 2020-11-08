import { processConfig } from '@graphql-mesh/config'
import { getMesh } from '@graphql-mesh/runtime'
import { YamlConfig } from '@graphql-mesh/types'
import { ApolloServer } from 'apollo-server-micro'
import '@graphql-mesh/transform-filter-schema'
import '@graphql-mesh/graphql'
import '@graphql-mesh/merger-stitching'
import '@graphql-mesh/transform-cache'
import '@graphql-mesh/cache-file'
import cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'

function injectEnv(json: YamlConfig.Config): YamlConfig.Config {
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

async function createMesh(config: YamlConfig.Config) {
  return getMesh(await processConfig(injectEnv(config)))
}

export default async function createHandler(config: YamlConfig.Config, path: string) {
  const mesh = await createMesh(config)

  const apolloServer = new ApolloServer({
    tracing: true,
    // engine: { reportSchema: true },
    context: mesh.contextBuilder,
    introspection: true,
    playground: true,
    ...mesh,
  })
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
    ],
  })
  const apoloHandler = apolloServer.createHandler({ path })
  return corsHandler((req, res) => {
    return req.method === 'OPTIONS' ? res.end() : apoloHandler(req, res)
  })
}
