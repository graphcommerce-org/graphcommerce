import type { MeshContext } from '@graphcommerce/graphql-mesh'

export async function getCustomerGroup(context: MeshContext): Promise<number> {
  const customer = await context.m2rest.Query.getCustomer({
    selectionSet: `{ group_id }`,
    context,
  })
  if (!customer) {
    return 0
  } else {
    return customer.group_id ?? 0
  }
}
