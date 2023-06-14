import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { initClient } from '../client'

export const removeRowColumnTwo = async (name: string | undefined, config: GraphCommerceConfig) => {
  const client = initClient(config, name)

  client.deleteModel({ apiId: 'RowColumnTwo' })

  return client.run(true)
}
