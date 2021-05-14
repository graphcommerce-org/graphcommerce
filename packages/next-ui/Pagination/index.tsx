import { Fab, makeStyles, Theme } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
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
}))

export type PagePaginationProps = {
  count: number
  page: number
  url: (page: number) => string
}

export default function Pagination(props: PagePaginationProps) {
  const { count, page, url } = props
  const classes = useStyles()

  return (
    <div className={classes.pagination}>
      {page === 1 && (
        <Fab
          variant='round'
          size='medium'
          aria-label='Previous Page'
          color='inherit'
          disabled
          className={classes.disabled}
        >
          <SvgImage src={iconChevronLeft} alt='chevron left' />
        </Fab>
      )}
      {page > 1 && (
        <PageLink href={url(page - 1)} passHref>
          <Fab variant='round' size='medium' aria-label='Previous Page' color='inherit'>
            <SvgImage src={iconChevronLeft} alt='chevron left' />
          </Fab>
        </PageLink>
      )}
      <span>{`Page ${page} of ${count}`}</span>
      {page !== count && (
        <PageLink href={url(page + 1)} passHref>
          <Fab variant='round' size='medium' aria-label='Next Page' color='inherit'>
            <SvgImage src={iconChevronRight} alt='chevron left' />
          </Fab>
        </PageLink>
      )}
      {page === count && (
        <Fab
          variant='round'
          size='medium'
          aria-label='Next Page'
          color='inherit'
          disabled
          className={classes.disabled}
        >
          <SvgImage src={iconChevronRight} alt='chevron left' />
        </Fab>
      )}
    </div>
  )
}
