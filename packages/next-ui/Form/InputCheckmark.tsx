import { IconSvg, IconSvgProps } from '../IconSvg'
import { iconCheckmark } from '../icons'

export type InputCheckmarkProps = {
  show?: boolean
  select?: boolean
  children?: React.ReactNode
} & Omit<IconSvgProps, 'src'>

/**
 * When the `valid` prop is passed it will render a CheckIcon, else it will render children.
 *
 * ```typescript
 * ;<InputCheckmark valid>Fallback things</InputCheckmark>
 * ```
 */
export function InputCheckmark(props: InputCheckmarkProps) {
  const { show, children, select = false } = props

  if (!show) return <>{children}</>
  return (
    <IconSvg
      src={iconCheckmark}
      className='InputCheckmark'
      sx={[{ stroke: '#01D26A' }, select && { marginRight: '15px' }]}
    />
  )
}
