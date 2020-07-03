import React from 'react'
import { Pagination, PaginationItem, PaginationProps } from '@material-ui/lab'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import CategoryLink from '../CategoryLink'

type ProductPaginationProps = GQLProductListPaginationFragment & PaginationProps

export default function ProductListPagination({
  page_info,
  ...paginationProps
}: ProductPaginationProps) {
  const { current_page, total_pages } = page_info
  const { params } = useProductListParamsContext()

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
