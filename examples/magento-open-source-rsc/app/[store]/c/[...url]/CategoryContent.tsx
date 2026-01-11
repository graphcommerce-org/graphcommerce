'use client'

import { PrivateQueryMaskProvider } from '@graphcommerce/graphql'
import {
  CategoryBreadcrumbs,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
} from '@graphcommerce/magento-category'
import type {
  FilterTypes,
  ProductFiltersQuery,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import { useProductList } from '@graphcommerce/magento-product'
import {
  breadcrumbs,
  productFiltersLayout,
  productFiltersPro,
} from '@graphcommerce/next-config/config'
import { Container, LayoutHeader, LayoutTitle } from '@graphcommerce/next-ui'
import {
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
} from '../../../../components'
import type { CategoryPageQuery } from '../../../../graphql/CategoryPage.gql'

export type CategoryContentProps = CategoryPageQuery &
  ProductListQuery &
  ProductFiltersQuery & {
    filterTypes?: FilterTypes
  }

export function CategoryContent(props: CategoryContentProps) {
  const { categories, ...rest } = props
  const { mask, ...productList } = useProductList({
    ...rest,
    category: categories?.items?.[0],
  })
  const { products, params, category } = productList

  const isLanding = category?.display_mode === 'PAGE'
  const isCategory = params && category && products?.items

  return (
    <PrivateQueryMaskProvider mask={mask}>
      <CategoryMeta params={params} {...category} />
      <LayoutHeader floatingMd hideMd={breadcrumbs}>
        <LayoutTitle size='small' component='span'>
          {category?.name}
        </LayoutTitle>
      </LayoutHeader>
      {isCategory && isLanding && (
        <>
          {breadcrumbs && (
            <Container maxWidth={false}>
              <CategoryBreadcrumbs
                category={category}
                sx={(theme) => ({
                  height: 0,
                  [theme.breakpoints.down('md')]: {
                    '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
                  },
                })}
              />
            </Container>
          )}
          <CategoryHeroNav
            {...category}
            title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
          />
        </>
      )}
      {isCategory && !isLanding && (
        <>
          {productFiltersPro && productFiltersLayout === 'SIDEBAR' && (
            <ProductListLayoutSidebar
              {...productList}
              key={category.uid}
              title={category.name ?? ''}
              id={category.uid}
              category={category}
            />
          )}
          {productFiltersPro && productFiltersLayout !== 'SIDEBAR' && (
            <ProductListLayoutDefault
              {...productList}
              key={category.uid}
              title={category.name ?? ''}
              id={category.uid}
              category={category}
            />
          )}
          {!productFiltersPro && (
            <ProductListLayoutClassic
              {...productList}
              key={category.uid}
              title={category.name ?? ''}
              id={category.uid}
              category={category}
            />
          )}
        </>
      )}
    </PrivateQueryMaskProvider>
  )
}
