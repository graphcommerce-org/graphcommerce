import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { extendableComponent } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'

export type UspListItemProps = {
  text: React.ReactNode
  icon?: React.ReactNode
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = { size?: 'small' | 'medium' }
const name = 'UspListItem'
const parts = ['root', 'icon', 'text'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function UspListItem(props: UspListItemProps) {
  const { text, icon, size = 'medium', sx = [] } = props
  const classes = withState({ size })

  return (
    <Box
      component='li'
      className={classes.root}
      sx={[
        (theme) => ({
          display: 'grid',
          gridAutoFlow: 'column',
          alignItems: 'center',
          gridTemplateColumns: `${responsiveVal(32, 38)} auto`,
          gap: theme.spacings.xs,
          '& > p': {
            typography: 'body2',
          },
          '&.sizeSmall': {
            gridTemplateColumns: `${responsiveVal(10, 14)} auto`,
            gap: theme.spacings.xxs,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.icon}
        sx={{
          display: 'flex',
          '& > * > img': {
            display: 'block',
          },
        }}
      >
        {icon}
      </Box>
      <Box
        className={classes.text}
        sx={{
          '&.sizeSmall > p': {
            typography: 'body2',
          },
        }}
      >
        {text}
      </Box>
    </Box>
  )
}
