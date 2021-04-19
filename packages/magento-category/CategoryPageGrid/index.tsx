import { Container, makeStyles, Theme } from '@material-ui/core'
import { CategoryTree } from '@reachdigital/magento-graphql'
import { ProductFiltersFragment } from '@reachdigital/magento-product-types/ProductFilters.gql'
import { ProductListFragment } from '@reachdigital/magento-product-types/ProductListFragment.gql'
import ProductListCount from '@reachdigital/magento-product/ProductListCount'
import ProductListFilters from '@reachdigital/magento-product/ProductListFilters'
import ProductListFiltersContainer from '@reachdigital/magento-product/ProductListFiltersContainer'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import ProductListPagination from '@reachdigital/magento-product/ProductListPagination'
import ProductListSort from '@reachdigital/magento-product/ProductListSort'
import React from 'react'
import CategoryChildren from '../CategoryChildren'
import { CategoryChildrenFragment } from '../CategoryChildren.gql'
import CategoryTitleDescription from '../CategoryTitleDescription'
import useCategoryPageStyles from '../useCategoryPageStyles'

type CategoryPageGridProps = ProductFiltersFragment &
  ProductListFragment & {
    title?: string
    filterTypes: FilterTypes
    category?: Pick<CategoryTree, 'name' | 'description'> & CategoryChildrenFragment
    params: ProductListParams
    productListItems: React.ReactNode
  }

export default function CategoryPageGrid(props: CategoryPageGridProps) {
  const { filters, products, filterTypes, category, params, title, productListItems } = props
  const classes = useCategoryPageStyles(props)

  return (
    <Container className={classes.container} maxWidth='xl'>
      <CategoryTitleDescription
        name={category?.name ?? title}
        description={category?.description}
      />

      {category && (
        <CategoryChildren classes={{ container: classes.childCategories }} params={params}>
          {category.children}
        </CategoryChildren>
      )}

      <ProductListFiltersContainer>
        <ProductListSort sort_fields={products?.sort_fields} />
        <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
      </ProductListFiltersContainer>

      <ProductListCount total_count={products?.total_count} />

      <div className={classes.items}>{productListItems}</div>

      <ProductListPagination page_info={products?.page_info} />
    </Container>
  )
}
