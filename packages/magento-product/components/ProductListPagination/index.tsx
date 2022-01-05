import { Pagination } from '@graphcommerce/next-ui'
import { PaginationProps } from '@mui/material'
import React from 'react'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import ProductListLink from '../ProductListLink/ProductListLink'
import { ProductListPaginationFragment } from './ProductListPagination.gql'

export type ProductPaginationProps = ProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'>

export default function ProductListPagination({
  page_info,
  ...paginationProps
}: ProductPaginationProps) {
  const { params } = useProductListParamsContext()

  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  return (
    <Pagination
      count={page_info?.total_pages}
      page={page_info?.current_page ?? 1}
      renderLink={(page: number, icon: React.ReactNode, btnProps: any) => (
        <ProductListLink {...btnProps} {...params} currentPage={btnProps.page}>
          {icon}
        </ProductListLink>
      )}
      {...paginationProps}
    />
  )
}
