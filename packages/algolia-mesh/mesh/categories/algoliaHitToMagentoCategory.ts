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
import { algoliaUrlToUrlKey } from '../algoliaHitToMagentoProduct'
import { GetStoreConfigReturn } from '../getStoreConfig'

export type AlgoliaCategoryHitAddiotonalProperties = AlgoliaProductHitAdditionalProperties & {
  path: string
  url: string
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
  const pathArray = algoliaPath.split(' / ')
  return pathArray.map((item) => ({
    category_name: item,
    category_uid: 0,
  }))
}

export function algoliaHitToMagentoCategory(
  hit: Algoliahit,
  storeConfig: GetStoreConfigReturn,
): CategoriesItemsItem {
  const { objectID, additionalProperties } = hit

  if (!assertAdditional(additionalProperties)) return null
  return {
    name: additionalProperties?.name,
    children: null,
    products: null,
    image: additionalProperties?.image_url,
    uid: objectID,
    redirect_code: 0,
    url_key: '',
    url_path: algoliaUrlToUrlKey(additionalProperties.url, storeConfig?.base_link_url),
    breadcrumbs: mapBreadcrumbs(additionalProperties?.path),
  }
}
