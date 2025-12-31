import { SetContextLink } from '@graphcommerce/graphql'
import { CustomerDocument } from '@graphcommerce/magento-customer'

declare module '@apollo/client' {
  interface DefaultContext {
    headers?: Record<string, string>
  }
}

export const customerGroupIdLink = new SetContextLink((prevContext, operation) => {
  const headers: Record<string, string> = { ...prevContext.headers }
  try {
    const group_id = operation.client.cache.readQuery({ query: CustomerDocument })?.customer
      ?.group_id
    if (group_id) headers['x-magento-group-id'] = `${group_id}`
    return { headers }
  } catch {
    return { headers }
  }
})
