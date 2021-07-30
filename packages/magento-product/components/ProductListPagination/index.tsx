import { PaginationProps } from '@material-ui/lab'
import { CategoryLink, useProductListParamsContext } from '@reachdigital/magento-category'
import { Pagination } from '@reachdigital/next-ui'
import React from 'react'
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
        <CategoryLink {...btnProps} {...params} currentPage={btnProps.page}>
          {icon}
        </CategoryLink>
      )}
      {...paginationProps}
    />
  )
}
