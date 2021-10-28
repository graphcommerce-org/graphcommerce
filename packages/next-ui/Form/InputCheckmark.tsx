import { makeStyles, Theme } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import SvgImage from '../SvgImage'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconCheckmark } from '../icons'

export type InputCheckmarkProps = PropsWithChildren<{ show?: boolean }>
const useStyles = makeStyles(
  (theme: Theme) => ({
    iconCheckmark: {
      stroke: '#01D26A',
    },
  }),
  { name: 'InputCheckmark' },
)

/**
 * When the `valid` prop is passed it will render a CheckIcon, else it will render children.
 *
 * ```typescript
 * ;<InputCheckmark valid>Fallback things</InputCheckmark>
 * ```
 */
export default function InputCheckmark(props: InputCheckmarkProps) {
  const { show: valid, children } = props
  const classes = useStyles()

  if (!valid) return <>{children}</>
  return <SvgImageSimple src={iconCheckmark} className={classes.iconCheckmark} />
}
