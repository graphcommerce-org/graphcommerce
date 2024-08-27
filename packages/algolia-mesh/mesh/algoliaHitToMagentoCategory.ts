import {
  RequireFields,
  ResolverFn,
  ResolversParentTypes,
  ResolversTypes,
  MeshContext,
  QuerycategoriesArgs,
  Algoliahit,
  AlgoliaProductHitAdditionalProperties,
} from '@graphcommerce/graphql-mesh'

export type AlgoliaCategoryHitAddiotonalProperties = AlgoliaProductHitAdditionalProperties & {
  path: string
}

export function assertAdditional(
  additional: unknown,
): additional is AlgoliaCategoryHitAddiotonalProperties {
  return true
}

export type CategoriesItemsItem = NonNullable<
  Awaited<
    ReturnType<
      ResolverFn<
        ResolversTypes['CategoryResult'],
        ResolversParentTypes['Query'],
        MeshContext,
        RequireFields<QuerycategoriesArgs, 'pageSize' | 'currentPage'>
      >
    >
  >['items']
>[number]

function mapBreadcrumbs(algoliaPath) {
  const pathArray = algoliaPath.split('/')
  return pathArray.map((item) => ({ category_name: item }))
}

export function algoliaHitToMagentoCategory(hit: Algoliahit): CategoriesItemsItem {
  const { objectID, additionalProperties } = hit

  if (!assertAdditional(additionalProperties)) return null

  return {
    name: additionalProperties?.name,
    children: null,
    products: null,
    image: additionalProperties?.image_url,
    uid: objectID,
    redirect_code: 0,
    breadcrumbs: mapBreadcrumbs(additionalProperties?.path),
  }
}
