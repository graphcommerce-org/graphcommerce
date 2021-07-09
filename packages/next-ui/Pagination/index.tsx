import { makeStyles, Theme } from '@material-ui/core'
import { PaginationProps, usePagination } from '@material-ui/lab'
import React from 'react'
import { UseStyles } from '../Styles'
import SvgImage from '../SvgImage'
import { iconChevronLeft, iconChevronRight } from '../icons'

const useStyles = makeStyles((theme: Theme) => ({
  pagination: {
    gridArea: 'pagination',
    justifyContent: 'center',
    display: 'grid',
    gap: 8,
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
  disabled: {
    background: 'none !important',
  },
  root: {
    margin: '32px auto 0 auto',
    marginTop: theme.spacings.lg,
    marginBottom: theme.spacings.lg,
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'center',
    // fontSize: 18,
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
    <SvgImage
      src={iconChevronLeft}
      alt='chevron left'
      shade={page === 1 ? 'muted' : undefined}
      classes={{ root: classes.icon }}
    />
  )

  const chevronRight = (
    <SvgImage
      src={iconChevronRight}
      alt='chevron right'
      shade={page === count ? 'muted' : undefined}
      classes={{ root: classes.icon }}
    />
  )

  return (
    <div className={classes.root}>
      {page === 1 ? chevronLeft : renderLink(page - 1, chevronLeft, prevBtnProps)}
      <span>{`Page ${page} of ${count}`}</span>
      {page === count ? chevronRight : renderLink(page + 1, chevronRight, nextBtnProps)}
    </div>
  )
}
