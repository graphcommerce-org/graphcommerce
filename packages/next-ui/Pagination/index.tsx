import { Link, Theme, makeStyles } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { PaginationProps, usePagination } from '@material-ui/lab'
import React from 'react'
import PageLink from '../PageTransition/PageLink'

export type PagePaginationProps = Omit<
  PaginationProps,
  'count' | 'defaultPage' | 'page' | 'renderItem'
> & { paginationInfo }

const useStyles = makeStyles((theme: Theme) => ({
  pagination: {
    gridArea: 'pagination',
    margin: '32px auto 0 auto',
    display: 'grid',
    gridAutoFlow: 'column',
    width: 'min-content',
    marginBottom: `${theme.spacings.lg}`,
    fontSize: 18,
    '& span': {
      whiteSpace: 'nowrap',
      padding: '8px 8px 0 10px',
    },
    '& a': {
      transition: 'background .25s ease',
      borderRadius: '100%',
      height: 40,
      width: 40,
      '& svg': {
        color: '#000',
      },
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.04)',
      },
    },
    '& svg': {
      borderRadius: '100%',
      padding: 6,
      height: 40,
      width: 40,
      color: '#ddd',
    },
  },
}))

export default function Pagination({ paginationInfo, ...paginationProps }: PagePaginationProps) {
  const classes = useStyles()
  const { items } = usePagination({
    count: paginationInfo.totalPages,
    page: paginationInfo.currentPage,
    ...paginationProps,
  })

  const chevronLeft = <ChevronLeft color='primary' />
  const chevronRight = <ChevronRight color='primary' />
  const currentPage = Number(paginationInfo.currentPage)

  return (
    <div className={classes.pagination}>
      {paginationInfo.currentPage === 1 ? (
        chevronLeft
      ) : (
        <PageLink href={`/${paginationInfo.baseUrl}/page/${currentPage - 1}`}>
          <Link href='/'>{chevronLeft}</Link>
        </PageLink>
      )}

      <span>{`Page ${currentPage} of ${paginationInfo.totalPages}`}</span>

      {currentPage === paginationInfo.totalPages ? (
        chevronRight
      ) : (
        <PageLink href={`/${paginationInfo.baseUrl}/page/${currentPage + 1}`}>
          <Link href='/'>{chevronRight}</Link>
        </PageLink>
      )}
    </div>
  )
}
