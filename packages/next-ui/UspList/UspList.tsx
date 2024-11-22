import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { extendableComponent } from '../Styles'

export type UspListProps = OwnerState & {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

type OwnerState = { size?: 'small' | 'medium' }
const name = 'UspList'
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function UspList(props: UspListProps) {
  const { children, size, sx = [] } = props
  const classes = withState({ size })

  return (
    <Box
      component='ul'
      className={classes.root}
      sx={[
        (theme) => ({
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          alignContent: 'start',
          rowGap: theme.spacings.xs,
          '&.sizeSmall': {
            rowGap: '3px',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}
