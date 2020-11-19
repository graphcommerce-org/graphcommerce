import { Pagination, PaginationItem, PaginationProps, usePagination } from '@material-ui/lab'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import React from 'react'
import { ProductListPaginationFragment } from './ProductListPagination.gql'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

type ProductPaginationProps = ProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'>

export default function ProductListPagination({
  page_info,
  ...paginationProps
}: ProductPaginationProps) {
  const classes = useCategoryPageStyles()
  const { params } = useProductListParamsContext()

  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  const { current_page, total_pages } = page_info
  const { items } = usePagination({
    count: total_pages,
    defaultPage: 1,
    page: current_page,
    ...paginationProps
  })

  const prevBtnProps = items[0]
  const nextBtnProps = items[items.length - 1]

  const chevronLeft = <ChevronLeft color='primary' />
  const chevronRight = <ChevronRight color='primary' />

  return (
    <div className={classes.pagination}>

      {(current_page === 1) ? (
        chevronLeft
      ) : (
          <CategoryLink {...prevBtnProps} {...params} currentPage={prevBtnProps.page} children={chevronLeft} />
        )}

      <span>{`Page ${current_page} of ${total_pages}`}</span>

      {(current_page === total_pages) ? (
        chevronRight
      ) : (
          <CategoryLink {...nextBtnProps} {...params} currentPage={nextBtnProps.page} children={chevronRight} />
        )}
    </div>
  )
}
