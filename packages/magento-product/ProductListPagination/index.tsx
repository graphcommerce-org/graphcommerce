import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { Pagination, PaginationItem, PaginationProps, usePagination } from '@material-ui/lab'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import React from 'react'
import { ProductListPaginationFragment } from './ProductListPagination.gql'

type ProductPaginationProps = ProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'>

// todo(paales): implement with @reachdigital/next-ui/Pagination
export default function ProductListPagination({
  page_info,
  ...paginationProps
}: ProductPaginationProps) {
  const classes = useCategoryPageStyles()
  const { params } = useProductListParamsContext()
  const { items } = usePagination({
    count: page_info?.total_pages ?? 1,
    defaultPage: 1,
    page: page_info?.current_page ?? 1,
    ...paginationProps,
  })

  if (!page_info || !page_info.total_pages || !page_info.current_page) return null

  const { total_pages, current_page } = page_info

  const prevBtnProps = items[0]
  const nextBtnProps = items[items.length - 1]

  const chevronLeft = <ChevronLeft color='primary' />
  const chevronRight = <ChevronRight color='primary' />

  return (
    <div className={classes.pagination}>
      {current_page === 1 ? (
        chevronLeft
      ) : (
        <CategoryLink {...prevBtnProps} {...params} currentPage={prevBtnProps.page}>
          {chevronLeft}
        </CategoryLink>
      )}

      <span>{`Page ${current_page} of ${total_pages}`}</span>

      {current_page === total_pages ? (
        chevronRight
      ) : (
        <CategoryLink {...nextBtnProps} {...params} currentPage={nextBtnProps.page}>
          {chevronRight}
        </CategoryLink>
      )}
    </div>
  )
}
