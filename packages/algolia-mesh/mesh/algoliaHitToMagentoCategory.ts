import {
  RequireFields,
  ResolverFn,
  ResolversParentTypes,
  ResolversTypes,
  MeshContext,
  QuerycategoriesArgs,
  Algoliahit,
} from '@graphcommerce/graphql-mesh'
import { assertAdditional } from './algoliaHitToMagentoProduct'

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

export function algoliaHitToMagentoCategory(hit: Algoliahit): CategoriesItemsItem {
  const { objectID, additionalProperties } = hit

  return {
    name: additionalProperties?.name,
    children: null,
    products: null,
    image: additionalProperties?.image_url,
    uid: objectID,
    redirect_code: 0,
  }
}
