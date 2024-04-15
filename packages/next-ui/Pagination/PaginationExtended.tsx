import {
  PaginationProps,
  Box,
  SxProps,
  Theme,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from '@mui/material'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { NextLink } from '../Theme'
import { iconChevronLeft, iconChevronRight } from '../icons'

export type PaginationExtendedProps = {
  count: number
  page: number
  sx?: SxProps<Theme>
  size?: 'small' | 'medium' | 'large'
  paginationHref: (params: PaginationRenderItemParams) => string
} & Omit<PaginationProps, 'count' | 'url' | 'defaultPage' | 'page'>

const parts = ['root', 'button', 'icon'] as const
const { classes } = extendableComponent('Pagination', parts)

function Prev() {
  return <IconSvg src={iconChevronLeft} className={classes.icon} size='medium' />
}
function Next() {
  return <IconSvg src={iconChevronRight} className={classes.icon} size='medium' />
}

/**
 * Rel="prev" and rel="next" are deprecated by Google.
 *
 * Read more: https://ahrefs.com/blog/rel-prev-next-pagination/
 */
export function PaginationExtended(props: PaginationExtendedProps) {
  const { count, page, sx = [], size, paginationHref, renderItem } = props

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
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
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Pagination
        count={count}
        defaultPage={page}
        page={page}
        siblingCount={0}
        boundaryCount={1}
        size={size ?? 'large'}
        renderItem={
          renderItem ??
          ((item) => (
            <PaginationItem
              component={NextLink}
              href={paginationHref(item)}
              slots={{ previous: Prev, next: Next }}
              {...item}
            />
          ))
        }
      />
    </Box>
  )
}
