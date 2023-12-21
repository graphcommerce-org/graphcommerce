import { handlePurgeRequest } from '@graphcommerce/magento-varnish-purge'
import { storefrontAll } from '@graphcommerce/next-ui'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  storefrontAll.forEach((store) => {
    handlePurgeRequest(graphqlSsrClient(store.locale), store.locale, req, res)
  })
}
