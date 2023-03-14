import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { PaginationProps } from '@mui/material/Pagination'
import { SxProps, Theme } from '@mui/material/styles'
import usePagination, { UsePaginationItem } from '@mui/material/usePagination'
import React from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { iconChevronLeft, iconChevronRight } from '../icons'

export type PagePaginationProps = {
  count: number
  page: number
  renderLink: (page: number, icon: React.ReactNode, btnProps: UsePaginationItem) => React.ReactNode
  sx?: SxProps<Theme>
} & Omit<PaginationProps, 'count' | 'defaultPage' | 'page' | 'renderItem'>

const parts = ['root', 'button', 'icon'] as const
const { classes } = extendableComponent('Pagination', parts)

/**
 * Rel="prev" and rel="next" are deprecated by Google.
 *
 * Read more: https://ahrefs.com/blog/rel-prev-next-pagination/
 */
export function Pagination(props: PagePaginationProps) {
  const { count, page, renderLink, classes: styles, ...paginationProps } = props

  const { items } = usePagination({
    count,
    defaultPage: 1,
    page,
    ...paginationProps,
  })

  const prevBtnProps = items[0]
  const nextBtnProps = items[items.length - 1]

  const chevronLeft = (
    <IconButton
      size='medium'
      disabled={page === 1}
      color='inherit'
      aria-label='Previous page'
      className={classes.button}
    >
      <IconSvg src={iconChevronLeft} className={classes.icon} size='medium' />
    </IconButton>
  )

  const chevronRight = (
    <IconButton
      size='medium'
      disabled={page === count}
      color='inherit'
      aria-label='Next page'
      className={classes.button}
    >
      <IconSvg src={iconChevronRight} className={classes.icon} size='medium' />
    </IconButton>
  )

  return (
    <Box
      className={classes.root}
      sx={(theme) => ({
        margin: '0 auto',
        marginTop: theme.spacings.lg,
        marginBottom: theme.spacings.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        '& .Mui-disabled': {
          background: 'none',
        },
      })}
    >
      {page === 1 ? chevronLeft : renderLink(page - 1, chevronLeft, prevBtnProps)}

      <Box typography='body1'>
        <Trans id='Page {page} of {count}' values={{ page, count: Math.max(1, count) }} />
      </Box>

      {page === count ? chevronRight : renderLink(page + 1, chevronRight, nextBtnProps)}
    </Box>
  )
}
