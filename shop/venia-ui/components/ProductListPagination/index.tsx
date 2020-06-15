import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { CategoryProductsLink } from '../CategoryProductsLink'

type ProductPaginationProps = GQLProductPaginationFragment & {
  url: string[]
  productListParams: GQLCategoryProductsQueryVariables
}

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
            component={(props) => (
              <CategoryProductsLink url={url} variables={variables} {...props} />
            )}
          />
        )
      }}
    />
  )
}
