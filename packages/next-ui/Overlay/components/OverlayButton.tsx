import { useScrollerContext } from '@graphcommerce/framer-scroller'
import { useElementScroll } from '@graphcommerce/framer-utils'
import { Button, ButtonProps, styled } from '@mui/material'
import { m, useTransform } from 'framer-motion'

const MotionDiv = styled(m.div)({})

export function OverlayButton(props: ButtonProps) {
  const { scrollerRef, getScrollSnapPositions } = useScrollerContext()
  const scroll = useElementScroll(scrollerRef)
  const initialDistanceFromTop = 70
  const initialScrollValue = getScrollSnapPositions().y[1]
  const stickyDistanceFromTop = window.innerHeight - initialDistanceFromTop

  const distanceFromBottom = useTransform(
    scroll.y,
    [initialScrollValue + 1, initialScrollValue, initialDistanceFromTop, -0],
    [
      stickyDistanceFromTop + 1,
      stickyDistanceFromTop,
      stickyDistanceFromTop + scroll.y.get(),
      window.innerHeight + initialDistanceFromTop,
    ],
    { clamp: true },
  )

  return (
    <MotionDiv style={{ top: distanceFromBottom, position: 'absolute', left: 0, right: 0 }}>
      <Button {...props} />
    </MotionDiv>
  )
}
