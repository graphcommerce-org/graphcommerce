import React, { PropsWithChildren } from 'react'
import SvgImage from '../SvgImage'
import { iconCheckmarkGreen } from '../icons'

type InputCheckmarkProps = PropsWithChildren<{ show?: boolean }>

/**
 * When the `valid` prop is passed it will render a CheckIcon, else it will render children.
 *
 * ```typescript
 * ;<InputCheckmark valid>Fallback things</InputCheckmark>
 * ```
 */
export default function InputCheckmark(props: InputCheckmarkProps) {
  const { show: valid, children } = props

  if (!valid) return <>{children}</>
  return <SvgImage src={iconCheckmarkGreen} alt='checkmark' />
}
