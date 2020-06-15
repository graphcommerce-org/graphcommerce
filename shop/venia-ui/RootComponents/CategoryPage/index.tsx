/* eslint-disable react/no-danger */
import React from 'react'
import Error from 'next/error'
import CategoryMeta from 'shop/venia-ui/components/CategoryMeta'
import CategoryDescription from 'shop/venia-ui/components/CategoryDescription'
import CategoryBreadcrumb from 'shop/venia-ui/components/CategoryBreadcrumb'
import ProductPagination from 'shop/venia-ui/components/ProductPagination'
import ProductSort from 'shop/venia-ui/components/ProductSort'
import ProductList from 'shop/venia-ui/components/ProductList'
import ProductFilters from 'shop/venia-ui/components/ProductFilters'
import { GetCategoryPageProps } from './getCategoryPageProps'

export default function CategoryPage({
  url,
  category,
  products,
  categoryVariables,
  filterInputTypes,
  storeConfig,
}: GetCategoryPageProps) {
  if (!category) return <Error statusCode={404}>404</Error>
  return (
    <>
      <CategoryMeta {...category} />
      <CategoryDescription {...category} />
      <CategoryBreadcrumb {...category} />
      <ProductPagination {...products} />
      {/* <CategorySort {...category} /> */}
      <ProductSort
        {...products}
        categoryVariables={categoryVariables}
        defaultSort={storeConfig.catalog_default_sort_by}
        url={url}
      />
      <ProductList {...products} />
      <ProductFilters
        {...products}
        filters={categoryVariables.filters ?? {}}
        filterTypes={filterInputTypes}
      />
    </>
  )
}
