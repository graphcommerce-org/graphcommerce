import { useScrollerButtonClick } from '../hooks/useScrollerButtonClick'
import { SnapPositionDirection } from '../types'

export type ScrollerButtonProps = JSX.IntrinsicElements['button'] & {
  direction: SnapPositionDirection
}

export default function ScrollerButton({ direction, ...buttonProps }: ScrollerButtonProps) {
  const onClick = useScrollerButtonClick(direction)
  return <button type='button' {...buttonProps} onClick={onClick} />
}
