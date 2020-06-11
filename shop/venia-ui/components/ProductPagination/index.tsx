import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'

type ProductPaginationProps = GQLProductPaginationFragment

export default function ProductPagination({ page_info }: ProductPaginationProps) {
  const { current_page, total_pages } = page_info
  return (
    <Pagination
      count={total_pages}
      defaultPage={1}
      page={current_page}
      renderItem={(item) => {
        if (item.type === 'page') return <PaginationItem {...item} component='a' />
        return <PaginationItem {...item} />
      }}
    />
  )
}
