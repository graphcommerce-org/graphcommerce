import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { initClient } from '../client'

export const removeRowColumnOne = async (name: string | undefined, config: GraphCommerceConfig) => {
  const client = initClient(config, name)

  client.deleteModel({ apiId: 'RowColumnOne' })

  return client.run(true)
}
