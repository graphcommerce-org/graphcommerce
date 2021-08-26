import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import { useScrollerButton, UseScrollerButtonReturn } from '../hooks/useScrollerButton'
import { SnapPositionDirection } from '../types'

export type ScrollerButtonProps = {
  direction: SnapPositionDirection
} & Omit<FabProps, keyof UseScrollerButtonReturn>

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

export default function ScrollerFab({ direction, ...buttonProps }: ScrollerButtonProps) {
  const scrollerButton = useScrollerButton(direction)
  const classes = useStyles(buttonProps)
  return (
    <Fab
      type='button'
      {...buttonProps}
      {...scrollerButton}
      classes={{ ...classes, ...buttonProps.classes }}
    />
  )
}
