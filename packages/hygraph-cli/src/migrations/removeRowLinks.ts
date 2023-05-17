import { VisibilityTypes } from '@hygraph/management-sdk'
import { initClient } from '../client'

export const removeRowLinks = async (name: string | undefined) => {
  const client = initClient(name)

  client.deleteEnumeration({ apiId: 'RowLinksVariants' })

  client.deleteModel({ apiId: 'RowLinks' })

  return client.run(true)
}
