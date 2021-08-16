import { useElementScroll } from '@reachdigital/framer-utils'
import { useVelocity } from 'framer-motion'
import { getSnapPosition } from '../context/api'
import { ComponentBaseProps, ScrollSnapProps } from '../types'

type PrevButtonProps = ComponentBaseProps & Partial<ScrollSnapProps>

export default function NavigateButton(props: PrevButtonProps) {
  const { scrollerRef } = props
  // const scroll = useElementScroll(scrollerRef)

  return (
    <button
      type='button'
      onClick={() => {
        const el = ref.current
        if (!el) return

        setSnap(false)
        const pos = getSnapPosition(el, 'left', scrollSnapAlign)

        animate({
          from: el.scrollLeft,
          to: pos.x,
          onUpdate: (v) => {
            el.scrollLeft = v
          },
          onComplete: enableSnap,
        })
      }}
    >
      prev
    </button>
  )
}
