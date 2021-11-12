import { Fab, makeStyles, Theme, Typography } from '@material-ui/core'
import { PaginationProps, usePagination } from '@material-ui/lab'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconChevronLeft, iconChevronRight } from '../icons'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '0 auto',
    marginTop: theme.spacings.lg,
    marginBottom: theme.spacings.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    '& .Mui-disabled': {
      background: 'none',
    },
  },
  pagination: {
    gridArea: 'pagination',
    justifyContent: 'center',
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    marginBottom: theme.spacings.xxl,
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacings.lg,
    },
    ...theme.typography.body1,
    '& > *': {
      whiteSpace: 'nowrap',
      boxShadow: 'none',
    },
  },
  fab: {
    color: theme.palette.text.primary,
  },
}))

export type PagePaginationProps = {
  count: number
  page: number
  renderLink: (page: number, icon: React.ReactNode, btnProps: any) => React.ReactNode
} & Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'> &
  UseStyles<typeof useStyles>

/**
 * Rel="prev" and rel="next" are deprecated by Google.
 *
 * Read more: https://ahrefs.com/blog/rel-prev-next-pagination/
 */
export default function Pagination(props: PagePaginationProps) {
  const { count, page, renderLink, classes: styles, ...paginationProps } = props
  const classes = useStyles(props)
  const { items } = usePagination({
    count,
    defaultPage: 1,
    page,
    ...paginationProps,
  })

  const prevBtnProps = items[0]
  const nextBtnProps = items[items.length - 1]

  const chevronLeft = (
    <Fab
      size='medium'
      disabled={page === 1}
      color='inherit'
      aria-label='Previous page'
      className={classes.fab}
    >
      <SvgImageSimple src={iconChevronLeft} />
    </Fab>
  )

  const chevronRight = (
    <Fab
      size='medium'
      disabled={page === count}
      color='inherit'
      aria-label='Next page'
      className={classes.fab}
    >
      <SvgImageSimple src={iconChevronRight} />
    </Fab>
  )

  return (
    <div className={classes.root}>
      {page === 1 ? chevronLeft : renderLink(page - 1, chevronLeft, prevBtnProps)}

      <Typography variant='body1'>Page {`${page} of ${Math.max(1, count)}`}</Typography>

      {page === count ? chevronRight : renderLink(page + 1, chevronRight, nextBtnProps)}
    </div>
  )
}
