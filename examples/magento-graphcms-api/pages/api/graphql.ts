import { createHandler, config } from '@graphcommerce/graphql-mesh'
import { NextApiRequest, NextApiResponse } from 'next'
import { getBuiltMesh } from '../../.mesh'

const handler = (async () => createHandler(await getBuiltMesh(), '/api/graphql'))()

export { config }

export default async (req: NextApiRequest, res: NextApiResponse) => (await handler)(req, res)
