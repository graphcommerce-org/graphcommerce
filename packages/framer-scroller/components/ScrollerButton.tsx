import { Fab, FabProps } from '@material-ui/core'
import { useScrollerButtonClick } from '../hooks/useScrollerButtonClick'
import { SnapPositionDirection } from '../types'

export type ScrollerButtonProps = FabProps & {
  direction: SnapPositionDirection
}

export default function ScrollerFab({ direction, ...buttonProps }: ScrollerButtonProps) {
  const onClick = useScrollerButtonClick(direction)
  return <Fab type='button' {...buttonProps} onClick={onClick} />
}
