import type { FabProps } from '@mui/material'
import { Fab } from '@mui/material'

export function PlaceholderFab(props: Omit<FabProps, 'children'>) {
  const { sx = [] } = props
  return (
    <Fab
      size='responsive'
      {...props}
      sx={[{ visibility: 'hidden', pointerEvents: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}
