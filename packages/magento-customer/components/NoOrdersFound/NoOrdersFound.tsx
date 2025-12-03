import { extendableComponent, iconBox, IconHeader, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'

const parts = ['root'] as const
const { classes } = extendableComponent('NoOrdersFound', parts)

export type NoOrdersFoundProps = { sx?: SxProps<Theme> }

export function NoOrdersFound(props: NoOrdersFoundProps) {
  const { sx = [] } = props
  return (
    <Box className={classes.root} sx={sxx((theme) => ({ marginTop: theme.spacings.sm }), sx)}>
      <IconHeader src={iconBox} size='small'>
        <Trans>No orders found</Trans>
      </IconHeader>
    </Box>
  )
}
