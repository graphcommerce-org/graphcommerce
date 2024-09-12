/* eslint-disable @typescript-eslint/require-await */
import fragments from '@graphcommerce/graphql/generated/fragments.json'
import type {
  AlgoliaLookingSimilarInput,
  AlgoliaRelatedProductsInput,
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
import { getRecommendationsArgs } from './getRecommendationArgs'
import { getRecommendations } from './getRecommendations'

type ProductTypes = NonNullable<Awaited<ReturnType<ProductInterfaceResolvers['__resolveType']>>>
const productInterfaceTypes = fragments.possibleTypes.ProductInterface as ProductTypes[]

const resolvers: Resolvers = {
  Query: {
    trendingProducts: async (root, args, context, info) => {
      const { facetName, facetValue } = args.input
      const { threshold, fallbackParameters, maxRecommendations, queryParameters } =
        await getRecommendationsArgs(root, args, context)
      return getRecommendations(
        'Trending_items_Input',
        {
          threshold,
          facetName,
          facetValue,
          fallbackParameters,
          maxRecommendations,
          queryParameters,
        },
        context,
        info,
        await createProductMapper(context),
      )
    },
    trendingFacetValues: async (root, args, context, info) => {
      const { threshold, fallbackParameters, maxRecommendations, queryParameters } =
        await getRecommendationsArgs(root, args, context)
      return getRecommendations(
        'Trending_facet_values_Input',
        {
          facetName: args.input.facetName,
          threshold,
          fallbackParameters,
          maxRecommendations,
          queryParameters,
        },
        context,
        info,
        createFacetValueMapper(),
      )
    },
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
  const resolve: ProductResolver = async (root, args, context, info) => {
    const { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters } =
      await getRecommendationsArgs(root, args, context)

    return getRecommendations(
      'Related_products_Input',
      { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters },
      context,
      info,
      await createProductMapper(context),
    )
  }

  productInterfaceTypes.forEach((productType) => {
    if (!resolvers[productType]) resolvers[productType] = {}
    resolvers[productType][enumToLocation(import.meta.graphCommerce.algolia.relatedProducts)] = {
      selectionSet: `{ uid }`,
      resolve,
    }
  })
}

if (isEnabled(import.meta.graphCommerce.algolia.lookingSimilar)) {
  const resolve: ProductResolver = async (root, args, context, info) => {
    const { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters } =
      await getRecommendationsArgs(root, args, context)
    return getRecommendations(
      'Looking_similar_Input',
      { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters },
      context,
      info,
      await createProductMapper(context),
    )
  }

  productInterfaceTypes.forEach((productType) => {
    if (!resolvers[productType]) resolvers[productType] = {}
    resolvers[productType][enumToLocation(import.meta.graphCommerce.algolia.lookingSimilar)] = {
      selectionSet: `{ uid }`,
      resolve,
    }
  })
}

if (isEnabled(import.meta.graphCommerce.algolia.frequentlyBoughtTogether)) {
  const resolver: ProductResolver = async (root, args, context, info) => {
    const { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters } =
      await getRecommendationsArgs(root, args, context)

    return getRecommendations(
      'Frequently_bought_together_Input',
      { objectID, threshold, maxRecommendations, queryParameters },
      context,
      info,
      await createProductMapper(context),
    )
  }

  productInterfaceTypes.forEach((productType) => {
    if (!resolvers[productType]) resolvers[productType] = {}
    resolvers[productType][
      enumToLocation(import.meta.graphCommerce.algolia.frequentlyBoughtTogether)
    ] = resolver
  })
}

const similar: ResolverFn<
  Maybe<Array<Maybe<ResolversTypes['ProductInterface']>>>,
  ResolversParentTypes['ProductInterface'],
  MeshContext,
  { input?: AlgoliaLookingSimilarInput | null }
> = async (root, args, context, info) => {
  const { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters } =
    await getRecommendationsArgs(root, args, context)

  return getRecommendations(
    'Looking_similar_Input',
    { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters },
    context,
    info,
    await createProductMapper(context),
  )
}

const related: ResolverFn<
  Maybe<Array<Maybe<ResolversTypes['ProductInterface']>>>,
  ResolversParentTypes['ProductInterface'],
  MeshContext,
  { input?: AlgoliaRelatedProductsInput | null }
> = async (root, args, context, info) => {
  const { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters } =
    await getRecommendationsArgs(root, args, context)

  return getRecommendations(
    'Related_products_Input',
    {
      objectID,
      threshold,
      // fallbackParameters,
      maxRecommendations,
      queryParameters,
    },
    context,
    info,
    await createProductMapper(context),
  )
}

const together: ResolverFn<
  Maybe<Array<Maybe<ResolversTypes['ProductInterface']>>>,
  ResolversParentTypes['ProductInterface'],
  MeshContext,
  { input?: AlgoliaRelatedProductsInput | null }
> = async (root, args, context, info) => {
  const { objectID, threshold, fallbackParameters, maxRecommendations, queryParameters } =
    await getRecommendationsArgs(root, args, context)
  return getRecommendations(
    'Frequently_bought_together_Input',
    { objectID, threshold, maxRecommendations, queryParameters },
    context,
    info,
    await createProductMapper(context),
  )
}

productInterfaceTypes.forEach((productType) => {
  if (!resolvers[productType]) resolvers[productType] = {}

  resolvers[productType].algolia_looking_similar = { selectionSet: `{ uid }`, resolve: similar }

  resolvers[productType].algolia_related_products = { selectionSet: `{ uid }`, resolve: related }

  resolvers[productType].algolia_frequently_bought_together = {
    selectionSet: `{ uid }`,
    resolve: together,
  }
})

export default resolvers
