import { handlePurgeRequest } from '@graphcommerce/magento-varnish-purge'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await handlePurgeRequest(req, res, graphqlSsrClient)
}
