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
>[]

export function algoliaHitToMagentoCategory(algoliaHit: Algoliahit): CategoriesItemsItem | null {
  return {}
}
