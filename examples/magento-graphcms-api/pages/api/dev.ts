import { cwd } from 'process'
import { processConfig } from '@graphql-mesh/config'
import { getMesh } from '@graphql-mesh/runtime'
import { createHandler, config, injectEnv } from '@graphcommerce/graphql-mesh'
import { NextApiRequest, NextApiResponse } from 'next'
import meshConfig from '../../.meshrc.json'

const handler = (async () =>
  createHandler(
    await getMesh(await processConfig(injectEnv(meshConfig), { dir: cwd() })),
    '/api/dev',
  ))()

export { config }

export default async (req: NextApiRequest, res: NextApiResponse) => (await handler)(req, res)
