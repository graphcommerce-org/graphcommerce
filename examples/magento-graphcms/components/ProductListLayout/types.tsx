import { MenuQueryFragment } from '@graphcommerce/magento-category'
import {
  CategoryDefaultFragment,
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
  useProductList,
} from '@graphcommerce/magento-product'
import { ContainerProps } from '@mui/material'
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
  category: CategoryDefaultFragment &
    NonNullable<NonNullable<CategoryPageQuery['categories']>['items']>[number]
}

type ProductListProps = ReturnType<typeof useProductList<BaseProps>>

export type ProductListLayoutProps = ProductListProps &
  (SearchLayoutProps | CategoryLayoutProps) &
  Pick<ContainerProps, 'maxWidth'>
