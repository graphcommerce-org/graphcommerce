import { Fab, FabProps, styled } from '@material-ui/core'

export const PlaceholderFab = styled((props: Omit<FabProps, 'children'>) => (
  <Fab {...props}>
    <></>
  </Fab>
))({ visibility: 'hidden', pointerEvents: 'none' })
