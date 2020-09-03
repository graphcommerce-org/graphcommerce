import { Pagination, PaginationItem, PaginationProps } from '@material-ui/lab'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import React from 'react'
import CategoryLink from '../CategoryLink'

type ProductPaginationProps = GQLProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'>

export default function ProductListPagination({
  page_info,
  ...paginationProps
}: ProductPaginationProps) {
  const { params } = useProductListParamsContext()
  if (!page_info || !page_info.total_pages || !page_info.current_page) return null
  const { current_page, total_pages } = page_info

  return (
    <Pagination
      count={total_pages}
      defaultPage={1}
      page={current_page}
      renderItem={(item) => {
        if (item.page === 0 || item.page > total_pages) return null
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
