import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { makeStyles } from '../Styles/tssReact'
import { SvgIcon } from '../SvgIcon/SvgIcon'
import { iconCheckmark } from '../icons'

export type InputCheckmarkProps = PropsWithChildren<{ show?: boolean; select?: boolean }>
const useStyles = makeStyles({ name: 'InputCheckmark' })({
  iconCheckmark: {
    stroke: '#01D26A',
  },
  select: {
    marginRight: 15,
  },
})

/**
 * When the `valid` prop is passed it will render a CheckIcon, else it will render children.
 *
 * ```typescript
 * ;<InputCheckmark valid>Fallback things</InputCheckmark>
 * ```
 */
export function InputCheckmark(props: InputCheckmarkProps) {
  const { show: valid, children, select = false } = props
  const { classes } = useStyles()

  if (!valid) return <>{children}</>
  return (
    <SvgIcon
      src={iconCheckmark}
      className={clsx(classes.iconCheckmark, select && classes.select)}
    />
  )
}
