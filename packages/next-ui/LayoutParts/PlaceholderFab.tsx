import Fab, { FabProps } from '@mui/material/Fab'

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
