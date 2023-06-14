import { GraphCommerceConfig } from '@graphcommerce/next-config'
import { VisibilityTypes } from '@hygraph/management-sdk'
import { initClient } from '../client'

export const removeRowLinks = async (name: string | undefined, config: GraphCommerceConfig) => {
  const client = initClient(config, name)

  client.deleteEnumeration({ apiId: 'RowLinksVariants' })

  client.deleteModel({ apiId: 'RowLinks' })

  return client.run(true)
}
