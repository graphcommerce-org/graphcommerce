import { cwd } from 'process'
import { createHandler, config, injectEnv } from '@graphcommerce/graphql-mesh'
import { processConfig } from '@graphql-mesh/config'
import { getMesh } from '@graphql-mesh/runtime'
import { MeshStore, InMemoryStoreStorageAdapter } from '@graphql-mesh/store'
import { YamlConfig } from '@graphql-mesh/types'
import { NextApiRequest, NextApiResponse } from 'next'
import meshConfig from '../../.meshrc.yml'

const handler = (async () => {
  const store = new MeshStore('.mesh', new InMemoryStoreStorageAdapter(), {
    validate: true,
    readonly: false,
  })
  return createHandler(
    await getMesh(
      await processConfig(injectEnv(meshConfig as YamlConfig.Config), { dir: cwd(), store }),
    ),
    '/api/graphql',
  )
})()

export { config }

export default async (req: NextApiRequest, res: NextApiResponse) => (await handler)(req, res)
