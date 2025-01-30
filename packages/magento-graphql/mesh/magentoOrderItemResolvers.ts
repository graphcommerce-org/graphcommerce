import { fragments } from '@graphcommerce/graphql'
import {
  selectionSetTemplate,
  type Maybe,
  type MeshContext,
  type OrderItemInterfaceResolvers,
  type ResolverFn,
  type Resolvers,
  type ResolversParentTypes,
  type ResolversTypes,
} from '@graphcommerce/graphql-mesh'

type OrderItemTypes = NonNullable<Awaited<ReturnType<OrderItemInterfaceResolvers['__resolveType']>>>
const orderItemTypes = fragments.possibleTypes.OrderItemInterface as OrderItemTypes[]

export const resolvers: Resolvers = {}

type ProductResolver = ResolverFn<
  Maybe<ResolversTypes['ProductInterface']>,
  ResolversParentTypes['OrderItemInterface'],
  MeshContext,
  Record<string, never>
>

const productResolver: ProductResolver = async (root, args, context, info) => {
  const { product_url_key, product } = root
  if (product || !product_url_key) return product || null

  const foundProduct = await context.m2.Query.products<string, ReturnType<ProductResolver>>({
    key: product_url_key,
    argsFromKeys: (keys) => ({ filter: { url_key: { in: keys } } }),
    selectionSet: (node) => selectionSetTemplate`{ items { uid url_key ${node} } }`,
    context,
    info,
    valuesFromResults: (results, keys) => {
      const items = (results?.items ?? []).filter((i) => !!i)
      return keys.map((key) => items.find((i) => i?.url_key === key) as ReturnType<ProductResolver>)
    },
  })

  return foundProduct
}

orderItemTypes.forEach((type) => {
  if (!resolvers[type]) resolvers[type] = {}

  resolvers[type].product = {
    selectionSet: '{ product_url_key }',
    resolve: productResolver,
  }
})
