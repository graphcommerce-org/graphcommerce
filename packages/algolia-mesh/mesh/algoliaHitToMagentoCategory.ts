import {
  RequireFields,
  ResolverFn,
  ResolversParentTypes,
  ResolversTypes,
  MeshContext,
  QuerycategoriesArgs,
  Algoliahit,
} from '@graphcommerce/graphql-mesh'

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
