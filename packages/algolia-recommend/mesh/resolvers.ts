/* eslint-disable @typescript-eslint/require-await */
import fragments from '@graphcommerce/graphql/generated/fragments.json'
import type {
  MeshContext,
  ProductInterfaceResolvers,
  ResolverFn,
  Resolvers,
  ResolversParentTypes,
  ResolversTypes,
} from '@graphcommerce/graphql-mesh'
import {
  GraphCommerceAlgoliaRecommendationLocation,
  InputMaybe,
  Maybe,
} from '@graphcommerce/next-config'
import { createProductMapper } from './createProductMapper'
import { createFacetValueMapper } from './createValueFacetMapper'
import { getRecommendations } from './getRecommendations'

type ProductTypes = NonNullable<Awaited<ReturnType<ProductInterfaceResolvers['__resolveType']>>>
const productTypes = fragments.possibleTypes.ProductInterface as ProductTypes[]

const resolvers: Resolvers = {
  Query: {
    trendingProducts: async (root, args, context, info) =>
      getRecommendations(
        'Trending_items_Input',
        { threshold: 75, ...args.input },
        context,
        info,
        await createProductMapper(context),
      ),
    trendingFacetValues: (root, args, context, info) =>
      getRecommendations(
        'Trending_facet_values_Input',
        { threshold: 75, ...args.input },
        context,
        info,
        createFacetValueMapper(),
      ),
  },
}

function isEnabled(location: InputMaybe<GraphCommerceAlgoliaRecommendationLocation> | undefined) {
  return location && location !== 'DISABLED'
}

function enumToLocation(
  location: InputMaybe<GraphCommerceAlgoliaRecommendationLocation> | undefined,
) {
  if (!isEnabled(location)) throw Error('Check for isEnabled before calling this function')
  if (location === 'CROSSSELL_PRODUCTS') return 'crosssell_products' as const
  if (location === 'UPSELL_PRODUCTS') return 'upsell_products' as const
  return 'related_products' as const
}

type ProductResolver = ResolverFn<
  Maybe<Array<Maybe<ResolversTypes['ProductInterface']>>>,
  ResolversParentTypes['ProductInterface'],
  MeshContext,
  Record<string, never>
>

if (isEnabled(import.meta.graphCommerce.algolia.relatedProducts)) {
  const resolver: ProductResolver = async (root, args, context, info) => {
    if (!root.uid) return null
    return getRecommendations(
      'Related_products_Input',
      { objectID: atob(root.uid), threshold: 75 },
      context,
      info,
      await createProductMapper(context),
    )
  }

  productTypes.forEach((productType) => {
    if (!resolvers[productType]) resolvers[productType] = {}
    resolvers[productType][enumToLocation(import.meta.graphCommerce.algolia.relatedProducts)] =
      resolver
  })
}

if (isEnabled(import.meta.graphCommerce.algolia.lookingSimilar)) {
  const resolver: ProductResolver = async (root, args, context, info) => {
    if (!root.uid) return null
    return getRecommendations(
      'Looking_similar_Input',
      { objectID: atob(root.uid), threshold: 75 },
      context,
      info,
      await createProductMapper(context),
    )
  }

  productTypes.forEach((productType) => {
    if (!resolvers[productType]) resolvers[productType] = {}
    resolvers[productType][enumToLocation(import.meta.graphCommerce.algolia.lookingSimilar)] =
      resolver
  })
}

if (isEnabled(import.meta.graphCommerce.algolia.frequentlyBoughtTogether)) {
  const resolver: ProductResolver = async (root, args, context, info) => {
    if (!root.uid) return null
    return getRecommendations(
      'Frequently_bought_together_Input',
      { objectID: atob(root.uid), threshold: 75 },
      context,
      info,
      await createProductMapper(context),
    )
  }

  productTypes.forEach((productType) => {
    if (!resolvers[productType]) resolvers[productType] = {}
    resolvers[productType][
      enumToLocation(import.meta.graphCommerce.algolia.frequentlyBoughtTogether)
    ] = resolver
  })
}

export default resolvers
