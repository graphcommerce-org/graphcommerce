import { Fab, FabProps, styled } from '@mui/material'

export const PlaceholderFab = styled((props: Omit<FabProps, 'children'>) => (
  <Fab {...props}>
    {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
    <></>
  </Fab>
))({ visibility: 'hidden', pointerEvents: 'none' })
