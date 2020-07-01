import React from 'react'
import { Pagination, PaginationItem, PaginationProps } from '@material-ui/lab'
import CategoryLink from '../CategoryLink'
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
      renderItem={(item) => {
        return (
          <PaginationItem
            {...item}
            component={React.forwardRef<HTMLAnchorElement>((itemProps, ref) => (
              <CategoryLink {...itemProps} {...params} currentPage={item.page} ref={ref} />
            ))}
          />
        )
      }}
      {...paginationProps}
    />
  )
}
