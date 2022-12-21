import { IconHeader, iconBox, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'

const parts = ['root'] as const
const { classes } = extendableComponent('NoOrdersFound', parts)

type NoOrdersFoundProps = { sx?: SxProps<Theme> }

export function NoOrdersFound(props: NoOrdersFoundProps) {
  const { sx = [] } = props
  return (
    <Box
      className={classes.root}
      sx={[(theme) => ({ marginTop: theme.spacings.sm }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <IconHeader src={iconBox} size='small'>
        <Trans id='No orders found' />
      </IconHeader>
    </Box>
  )
}
