import { responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles'
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
          maxWidth: '100%',
          width: responsiveVal(280, 650),
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
