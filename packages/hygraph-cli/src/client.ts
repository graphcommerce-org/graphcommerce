import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { Client } from '@hygraph/management-sdk'
import { graphcommerceLog } from './log-functions'

export const initClient = (config: GraphCommerceConfig, name: string | undefined) => {
  if (!config.hygraphWriteAccessEndpoint) {
    graphcommerceLog(
      'Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env file',
      'error',
    )

    return 0
  }
  if (!config.hygraphWriteAccessToken) {
    graphcommerceLog('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file')

    return 0
  }

  return new Client({
    authToken: config.hygraphWriteAccessToken,
    endpoint: config.hygraphWriteAccessEndpoint,
    name,
  })
}
