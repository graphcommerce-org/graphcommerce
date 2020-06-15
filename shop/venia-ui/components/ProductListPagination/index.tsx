import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { ProductListLink } from '../ProductListLink'
import { ProductListParams } from '../ProductList'

type ProductPaginationProps = GQLProductListPaginationFragment & ProductListParams

export default function ProductListPagination({
  page_info,
  productListParams,
  url,
}: ProductPaginationProps) {
  const { current_page, total_pages } = page_info

  return (
    <Pagination
      count={total_pages}
      defaultPage={1}
      page={current_page}
      renderItem={(item) => {
        const variables = { ...productListParams }
        delete variables.currentPage
        if (item.page > 1) variables.currentPage = item.page

        return (
          <PaginationItem
            {...item}
            component={(props) => <ProductListLink url={url} variables={variables} {...props} />}
          />
        )
      }}
    />
  )
}
