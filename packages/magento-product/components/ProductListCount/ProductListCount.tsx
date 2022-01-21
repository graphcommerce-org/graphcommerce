import { responsiveVal, componentSlots } from '@graphcommerce/next-ui'
import { Plural } from '@lingui/macro'
import { Box, Divider, SxProps, Theme, Typography } from '@mui/material'
import { ProductListCountFragment } from './ProductListCount.gql'

const { componentName, classes, selectors } = componentSlots('ProductListCount', [
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
      className={componentName}
    >
      <Divider component='div' className={classes.line} />
      <Typography variant='body2' color='text.disabled' className={classes.count}>
        <Plural value={total_count ?? 0} zero='no products' one='# product' other='# products' />
      </Typography>
      <Divider component='div' className={classes.line} />
    </Box>
  )
}
ProductListCount.selectors = selectors
