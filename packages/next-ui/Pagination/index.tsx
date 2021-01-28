import { Link, Theme, makeStyles } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import PageLink from '../PageTransition/PageLink'

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
      {page === 1 ? (
        <ChevronLeft color='primary' />
      ) : (
        <React.Fragment key='pagination'>
          {page === 2 ? (
            <PageLink href='/blog'>
              <Link>
                <ChevronLeft color='primary' />
              </Link>
            </PageLink>
          ) : (
            <PageLink href={url(page - 1)}>
              <Link>
                <ChevronLeft color='primary' />
              </Link>
            </PageLink>
          )}
        </React.Fragment>
      )}

      <span>{`Page ${page} of ${count}`}</span>

      {page === count ? (
        <ChevronRight color='primary' />
      ) : (
        <PageLink href={url(page + 1)}>
          <Link>
            <ChevronRight color='primary' />
          </Link>
        </PageLink>
      )}
    </div>
  )
}
