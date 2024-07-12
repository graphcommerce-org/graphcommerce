import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Image, ImageProps } from '@graphcommerce/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent, responsiveVal } from '@graphcommerce/next-ui/Styles'
import { alpha, styled, useTheme } from '@mui/material'
import { m, motionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'

const name = 'ScrollerThumbnail'
const parts = ['thumbnail'] as const
type OwnerProps = { active: boolean }

const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

type ScrollerThumbnailProps = {
  idx: number
  image: Pick<ImageProps, 'src' | 'height' | 'width'>
  layoutDependency: boolean
}

const MotionBox = styled(m.div)({})

export function ScrollerThumbnail(props: ScrollerThumbnailProps) {
  const { idx, image, layoutDependency } = props
  const { scrollerRef, scroll, getScrollSnapPositions, items } = useScrollerContext()
  const found = useMotionValueValue(items, (v) => v.find((_, index) => index === idx))
  // This ensures that the first item in the scroller is selected by default.
  // The opacity property is set to 0 by default.
  const item = found ?? {
    visibility: idx === 0 ? motionValue(1) : motionValue(0),
    opacity: motionValue(0),
  }
  const active = useMotionValueValue(item.visibility, (v) => v >= 0.5)
  const theme = useTheme()

  const ref = useRef<HTMLDivElement>(null)

  const boxShadow = useTransform(
    item.visibility,
    [1, 0],
    [
      `inset 0 0 0 2px ${theme.palette.primary.main}, 0 0 0 4px ${alpha(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity,
      )}`,
      `inset 0 0 0 2px #ffffff00, 0 0 0 4px #ffffff00`,
    ],
  )

  const classes = withState({ active })

  const scrollIntoView = () =>
    ref.current?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' })

  useEffect(() => {
    if (active && ref.current) {
      // This is a hack to ensure that the scroll animation is finished.
      setTimeout(() => scrollIntoView(), 1)
    }
  }, [active])

  if (!image) return null

  return (
    <MotionBox
      ref={ref}
      className={classes.thumbnail}
      onClick={() => {
        if (!scrollerRef.current) return
        scroll.animating.set(true)
        const { x } = getScrollSnapPositions()
        scrollerRef.current.scrollLeft = x[idx]
        scroll.x.set(x[idx])
        scroll.animating.set(false)
      }}
      layout='position'
      style={{ boxShadow }}
      layoutDependency={layoutDependency}
      sx={{
        padding: '2px',
        mx: `calc(${theme.spacing(1)} / 2)`,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Image
        {...image}
        loading='eager'
        sx={{
          height: responsiveVal(35, 90),
          width: 'auto',
          display: 'block',
          pointerEvents: 'none',
          objectFit: 'cover',
          borderRadius: theme.shape.borderRadius - 0.7,
        }}
        sizes={responsiveVal(35, 90)}
      />
    </MotionBox>
  )
}
