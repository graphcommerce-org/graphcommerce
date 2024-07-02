import { extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, SxProps, Theme, Typography } from '@mui/material'
import { ProductListCountFragment } from './ProductListCount.gql'

const { classes, selectors } = extendableComponent('ProductListCount', [
  'root',
  'line',
  'count',
] as const)

export type ProductCountProps = ProductListCountFragment & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
}

export function ProductListCount(props: ProductCountProps) {
  const { total_count, children, sx = [] } = props

  return (
    <Box
      sx={[
        (theme) => ({
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: '1fr max-content 1fr',
          columnGap: theme.spacings.xs,
          maxWidth: '100%',
          width: responsiveVal(280, 650),
          alignItems: 'center',
          my: theme.spacings.md,
          mx: 'auto',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={classes.root}
    >
      <Divider component='div' className={classes.line} />
      <Typography
        variant='body2'
        color='text.disabled'
        className={classes.count}
        sx={{ lineHeight: 0 }}
      >
        {children ? <> {children} </> : null}
        {total_count === 0 && <Trans id='no products' />}
        {total_count === 1 && <Trans id='one product' />}
        {(total_count ?? 0) > 1 && <Trans id='{total_count} products' values={{ total_count }} />}
      </Typography>
      <Divider component='div' className={classes.line} />
    </Box>
  )
}
ProductListCount.selectors = selectors
