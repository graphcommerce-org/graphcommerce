import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, SxProps, Theme, Typography } from '@mui/material'
import { ProductListCountFragment } from './ProductListCount.gql'

const { classes, selectors } = extendableComponent('ProductListCount', [
  'root',
  'line',
  'count',
] as const)

export type ProductCountProps = ProductListCountFragment & { sx?: SxProps<Theme> }

export function ProductListCount(props: ProductCountProps) {
  const { total_count, sx = [] } = props

  return (
    <Box
      sx={[
        (theme) => ({
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: '1fr max-content 1fr',
          columnGap: theme.spacings.xs,
          width: '100%',
          maxWidth: theme.breakpoints.values.sm,
          margin: '0 auto',
          alignItems: 'center',
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={classes.root}
    >
      <Divider component='div' className={classes.line} />
      <Typography variant='body2' color='text.disabled' className={classes.count}>
        {total_count === 0 && <Trans id='no products' />}
        {total_count === 1 && <Trans id='one product' />}
        {(total_count ?? 0) > 1 && <Trans id='{total_count} products' values={{ total_count }} />}
      </Typography>
      <Divider component='div' className={classes.line} />
    </Box>
  )
}
ProductListCount.selectors = selectors
