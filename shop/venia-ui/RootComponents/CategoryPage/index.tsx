/* eslint-disable react/no-danger */
import React from 'react'
import Error from 'next/error'
import CategoryMeta from 'shop/venia-ui/components/CategoryMeta'
import CategoryDescription from 'shop/venia-ui/components/CategoryDescription'
import CategoryBreadcrumb from 'shop/venia-ui/components/CategoryBreadcrumb'
import CategorySort from 'shop/venia-ui/components/CategorySort'
import ProductPagination from 'shop/venia-ui/components/ProductPagination'
import ProductSort from 'shop/venia-ui/components/ProductSort'
import ProductList from 'shop/venia-ui/components/ProductList'
import ProductFilters from 'shop/venia-ui/components/ProductFilters'
import { filterProps } from '@magento/peregrine/lib/util/fromRenderProp'
import { GetCategoryPageProps } from './getCategoryPageProps'

export default function CategoryPage({
  category,
  products,
  filterParams,
  filterInputTypes,
}: GetCategoryPageProps) {
  if (!category) return <Error statusCode={404}>404</Error>

  return (
    <>
      <CategoryMeta {...category} />
      <CategoryDescription {...category} />
      <CategoryBreadcrumb {...category} />
      <CategorySort {...category} />
      <ProductPagination {...products} />
      <ProductSort {...products} sort={filterParams.sort} />
      <ProductList {...products} />
      <ProductFilters
        {...products}
        filters={filterParams.filters ?? {}}
        filterTypes={filterInputTypes}
      />
    </>
  )
}
