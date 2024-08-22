import { MenuQueryFragment, CategoryItemFragment } from '@graphcommerce/magento-category'
import {
  CategoryDefaultFragment,
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
  useProductList,
} from '@graphcommerce/magento-product'
import { CategoryPageQuery } from '../../graphql/CategoryPage.gql'

type BaseProps = MenuQueryFragment &
  ProductListQuery &
  ProductFiltersQuery & {
    filterTypes?: FilterTypes
    params?: ProductListParams
  }

type SearchLayoutProps = {
  id?: undefined
  title?: undefined
  category?: undefined
}

type CategoryLayoutProps = {
  id: string
  title: string
  category: CategoryDefaultFragment & CategoryItemFragment
}

type ProductListProps = ReturnType<typeof useProductList<BaseProps>>

export type ProductListLayoutProps = ProductListProps & (SearchLayoutProps | CategoryLayoutProps)
