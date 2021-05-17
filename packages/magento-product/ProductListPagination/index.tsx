import { makeStyles, Theme } from '@material-ui/core'
import { PaginationProps, usePagination } from '@material-ui/lab'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconChevronLeft, iconChevronRight } from '@reachdigital/next-ui/icons'
import React from 'react'
import { ProductListPaginationFragment } from './ProductListPagination.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: '32px auto 0 auto',
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'center',
      fontSize: 18,
      '& span': {
        padding: '8px 8px 0 10px',
      },
      '& a': {
        transition: 'background .25s ease',
        borderRadius: '100%',
        height: 40,
        width: 40,
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    icon: {
      borderRadius: '100%',
      padding: 6,
      height: 40,
      width: 40,
    },
  }),
  {
    name: 'ProductListPagination',
  },
)

/**
 * Rel="prev" and rel="next" are deprecated by Google.
 *
 * Read more: https://ahrefs.com/blog/rel-prev-next-pagination/
 */

export type ProductPaginationProps = ProductListPaginationFragment &
  Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'> &
  UseStyles<typeof useStyles>

// todo(paales): implement with @reachdigital/next-ui/Pagination
export default function ProductListPagination({
  page_info,
  ...paginationProps
}: ProductPaginationProps) {
  const classes = useStyles(paginationProps)
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

  const chevronLeft = (
    <SvgImage
      src={iconChevronLeft}
      alt='chevron left'
      shade={current_page === 1 ? 'muted' : undefined}
      classes={{ root: classes.icon }}
    />
  )

  const chevronRight = (
    <SvgImage
      src={iconChevronRight}
      alt='chevron right'
      shade={current_page === total_pages ? 'muted' : undefined}
      classes={{ root: classes.icon }}
    />
  )

  return (
    <div className={classes.root}>
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
