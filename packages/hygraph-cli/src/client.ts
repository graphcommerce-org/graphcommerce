import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { Client } from '@hygraph/management-sdk'

export const initClient = (config: GraphCommerceConfig, name: string | undefined) => {
  if (!config.hygraphWriteAccessEndpoint) {
    throw new Error(
      'Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env file',
    )
  }
  if (!config.hygraphWriteAccessToken) {
    throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file')
  }

  return new Client({
    authToken: config.hygraphWriteAccessToken,
    endpoint: config.hygraphWriteAccessEndpoint,
    name,
  })
}
