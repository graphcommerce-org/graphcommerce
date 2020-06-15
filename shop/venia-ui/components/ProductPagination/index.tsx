import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { CategoryProductsLink } from '../CategoryProductsLink'

type ProductPaginationProps = GQLProductPaginationFragment & {
  url: string[]
  categoryVariables: GQLCategoryProductsQueryVariables
}

export default function ProductPagination({
  page_info,
  categoryVariables,
  url,
}: ProductPaginationProps) {
  const { current_page, total_pages } = page_info

  return (
    <Pagination
      count={total_pages}
      defaultPage={1}
      page={current_page}
      renderItem={(item) => {
        const variables = { ...categoryVariables }
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
