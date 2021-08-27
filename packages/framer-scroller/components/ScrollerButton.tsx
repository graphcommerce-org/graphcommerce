import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import { m } from 'framer-motion'
import React from 'react'
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

const ScrollerFab = m(
  React.forwardRef<HTMLButtonElement, ScrollerButtonProps>(({ direction, ...buttonProps }, ref) => {
    const scrollerButton = useScrollerButton(direction)
    const classes = useStyles(buttonProps)
    return (
      <Fab
        ref={ref}
        type='button'
        {...buttonProps}
        {...scrollerButton}
        classes={{ ...classes, ...buttonProps.classes }}
      />
    )
  }),
)
ScrollerFab.displayName = 'ScrollerFab'

export default ScrollerFab
