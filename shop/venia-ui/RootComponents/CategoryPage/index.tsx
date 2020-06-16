/* eslint-disable react/no-danger */
import React from 'react'
import Error from 'next/error'
import CategoryMeta from 'shop/venia-ui/components/CategoryMeta'
import CategoryDescription from 'shop/venia-ui/components/CategoryDescription'
import CategoryBreadcrumb from 'shop/venia-ui/components/CategoryBreadcrumb'
import ProductListPagination from 'shop/venia-ui/components/ProductListPagination'
import ProductListSort from 'shop/venia-ui/components/ProductListSort'
import ProductListItems from 'shop/venia-ui/components/ProductListItems'
import ProductListFilters from 'shop/venia-ui/components/ProductListFilters'
import { GetCategoryPageProps } from './getCategoryPageProps'

export default function CategoryPage({
  category,
  products,
  params,
  storeConfig,
  filterTypeMap,
}: GetCategoryPageProps) {
  if (!category) return <Error statusCode={404}>404</Error>
  return (
    <>
      <CategoryMeta {...category} />
      <CategoryDescription {...category} />
      <CategoryBreadcrumb {...category} />
      <ProductListPagination {...products} params={params} />
      <ProductListSort
        {...products}
        params={params}
        defaultSort={storeConfig.catalog_default_sort_by}
      />
      <ProductListFilters {...products} params={params} filterTypeMap={filterTypeMap} />
      <ProductListItems {...products} />
    </>
  )
}
