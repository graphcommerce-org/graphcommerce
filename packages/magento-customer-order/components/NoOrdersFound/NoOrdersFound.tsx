import { Trans } from '@graphcommerce/lingui-next'
import { IconHeader, iconBox, extendableComponent } from '@graphcommerce/next-ui'
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
        <Trans>No orders found</Trans>
      </IconHeader>
    </Box>
  )
}
