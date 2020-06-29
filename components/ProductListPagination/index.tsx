import React from 'react'
import { Pagination, PaginationItem, PaginationProps } from '@material-ui/lab'
import { ProductListLink } from '../ProductListLink'
import { ProductListParams } from '../ProductList'

type ProductPaginationProps = GQLProductListPaginationFragment & {
  params: ProductListParams
} & PaginationProps

export default function ProductListPagination({
  page_info,
  params,
  ...paginationProps
}: ProductPaginationProps) {
  const { current_page, total_pages } = page_info

  return (
    <Pagination
      count={total_pages}
      defaultPage={1}
      page={current_page}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={(props) => <ProductListLink {...props} {...params} currentPage={item.page} />}
        />
      )}
      {...paginationProps}
    />
  )
}
