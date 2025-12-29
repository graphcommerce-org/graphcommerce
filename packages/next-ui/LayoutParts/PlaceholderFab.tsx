import { sxx } from '@graphcommerce/next-ui'
import type { FabProps } from '@mui/material'
import { Fab } from '@mui/material'

export function PlaceholderFab(props: Omit<FabProps, 'children'>) {
  const { sx = [] } = props
  return (
    <Fab
      size='responsive'
      {...props}
      sx={sxx({ visibility: 'hidden', pointerEvents: 'none' }, sx)}
    />
  )
}
