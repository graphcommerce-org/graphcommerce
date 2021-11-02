import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconCheckmark } from '../icons'

export type InputCheckmarkProps = PropsWithChildren<{ show?: boolean; select?: boolean }>
const useStyles = makeStyles(
  (theme: Theme) => ({
    iconCheckmark: {
      stroke: '#01D26A',
    },
    select: {
      marginRight: 15,
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
  const { show: valid, children, select = false } = props
  const classes = useStyles()

  if (!valid) return <>{children}</>
  return (
    <SvgImageSimple
      src={iconCheckmark}
      className={clsx(classes.iconCheckmark, select && classes.select)}
    />
  )
}
