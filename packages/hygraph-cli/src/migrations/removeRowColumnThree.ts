import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { initClient } from '../client'

export const removeRowColumnThree = async (
  name: string | undefined,
  config: GraphCommerceConfig,
) => {
  const client = initClient(config, name)

  client.deleteModel({ apiId: 'RowColumnThree' })

  return client.run(true)
}
