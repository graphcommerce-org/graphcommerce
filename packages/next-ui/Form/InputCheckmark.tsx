import { makeStyles, Theme } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import React, { PropsWithChildren } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    checkmark: {
      color: theme.palette.success.main,
    },
  }),
  { name: 'InputCheckmark' },
)

type InputCheckmarkProps = PropsWithChildren<{ show?: boolean }>

/**
 * When the `valid` prop is passed it will render a CheckIcon, else it will render children.
 *
 * ```typescript
 * <InputCheckmark valid>Fallback things</InputCheckmark>
 * ```
 */
export default function InputCheckmark(props: InputCheckmarkProps) {
  const { show: valid, children } = props
  const classes = useStyles()

  if (!valid) return <>{children}</>
  return <CheckIcon className={classes.checkmark} />
}
