import { Box } from '@mui/material'
import { extendableComponent } from '../Styles'

export type UspListProps = OwnerState & {
  children: React.ReactNode
}

type OwnerState = { size?: 'small' | 'medium' }
const name = 'UspList' as const
const slots = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof slots>(name, slots)

export function UspList(props: UspListProps) {
  const { children, size } = props
  const classes = withState({ size })

  return (
    <Box
      component='ul'
      className={classes.root}
      sx={(theme) => ({
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        alignContent: 'start',
        rowGap: theme.spacings.xs,
        '&.sizeSmall': {
          rowGap: '3px',
        },
      })}
    >
      {children}
    </Box>
  )
}
