import { loadConfig } from '@graphcommerce/next-config'
import { Client } from '@hygraph/management-sdk'
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv'

dotenv.config()

export const initClient = (name: string | undefined) => {
  const config = loadConfig(process.cwd())

  if (!config.hygraphWriteAccessEndpoint) {
    throw new Error(
      'Please provide hygraphWriteAccessEndpoint in your config or GC_HYGRAPH_WRITE_ACCESS_ENDPOINT in your env',
    )
  }
  if (!config.hygraphWriteAccessToken) {
    throw new Error('Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env')
  }

  return new Client({
    authToken: config.hygraphWriteAccessToken,
    endpoint: config.hygraphWriteAccessEndpoint,
    name,
  })
}
