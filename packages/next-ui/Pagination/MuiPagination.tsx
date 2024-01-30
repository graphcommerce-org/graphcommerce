import { ProductListParams } from '@graphcommerce/magento-product'
import { PaginationProps, Box, SxProps, Theme, Pagination, PaginationItem } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { iconChevronLeft, iconChevronRight } from '../icons'

export type MuiPagePaginationProps = {
  count: number
  page: number
  sx?: SxProps<Theme>
  size?: 'small' | 'medium' | 'large'
} & ProductListParams &
  Omit<PaginationProps, 'count' | 'url' | 'currentPage' | 'defaultPage' | 'page' | 'renderItem'>

const parts = ['root', 'button', 'icon'] as const
const { classes } = extendableComponent('Pagination', parts)

/**
 * Rel="prev" and rel="next" are deprecated by Google.
 *
 * Read more: https://ahrefs.com/blog/rel-prev-next-pagination/
 */
export function MuiPagination(props: MuiPagePaginationProps) {
  const {
    count,
    page,
    classes: styles,
    sx = [],
    url,
    currentPage,
    size,
    filters,
    sort,
    pageSize,
    search,
  } = props

  const router = useRouter()

  const handleChange = (event: ChangeEvent<unknown>, pageNumber: number) => {
    console.log({ filters })
    // console.log({size})

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`${url}/page/${pageNumber}#products`)
  }

  console.log('url', url)

  const chevronLeft = () => <IconSvg src={iconChevronLeft} className={classes.icon} size='medium' />
  const chevronRight = () => (
    <IconSvg src={iconChevronRight} className={classes.icon} size='medium' />
  )

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
        onChange={handleChange}
        count={count}
        defaultPage={page}
        page={currentPage ?? page}
        siblingCount={0}
        boundaryCount={2}
        size={size ?? 'large'}
        renderItem={(item) => (
          <PaginationItem slots={{ previous: chevronLeft, next: chevronRight }} {...item} />
        )}
      />
    </Box>
  )
}
