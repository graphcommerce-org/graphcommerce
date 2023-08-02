import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { useTransform } from 'framer-motion'
import { useImageGalleryContext } from '../components/ImageGalleryContext'
import { useScrollerContext } from './useScrollerContext'

export type ScrollOrScrubProps = {
  activeWidth: number
  idx: number
}

export function useScrollOrScrub(props: ScrollOrScrubProps) {
  const { activeWidth, idx } = props
  const { scroll } = useScrollerContext()
  const { items, container, animation } = useImageGalleryContext()
  const active = useMotionValueValue(animation.active, (v) => v)
  const mode = useMotionValueValue(animation.mode, (v) => v)
  const calculateWidth = (raw: number) => {
    const scrubIndex = Math.max(0, Math.min(Math.round(raw), items.length - 1))
    const progress = raw - scrubIndex + 0.5

    if (scrubIndex === idx - 1)
      return Math.max(container.width / items.length, Math.min(activeWidth * progress))
    if (scrubIndex === idx + 1)
      return Math.max(container.width / items.length, Math.min(activeWidth * (1 - progress)))
    if (scrubIndex === idx) return activeWidth
    return 'auto'
  }

  const widthOnScrub = useTransform(container.pan.coordinates, (v) => {
    if (!active) return undefined
    const raw = v.x / (container.width / items.length)
    return calculateWidth(raw)
  })

  const widthOnScroll = useTransform(scroll.xProgress, (v) => {
    if (!active) return undefined
    const raw = v * (items.length - 1)
    return calculateWidth(raw)
  })
  if (mode === 'scroll' && active) {
    return widthOnScroll
  }
  if (mode === 'drag' && active) {
    return widthOnScrub
  }

  return undefined
}
