import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Image, ImageProps } from '@graphcommerce/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { ButtonProps, styled } from '@mui/material'
import { m, Variant, useAnimation, useMotionValueEvent, useTransform } from 'framer-motion'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'

const name = 'ScrollerThumbnail'
const parts = ['thumbnail'] as const
type OwnerProps = { active: boolean }

const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

type ScrollerThumbnailProps = Omit<ButtonProps, 'onClick' | 'className'> &
  ItemState & { idx: number; image: Pick<ImageProps, 'src' | 'height' | 'width'> }

type AnimationType = {
  default: Variant
  active: Variant
}

const MotionBox = styled(m.div)({})

export function ScrollerThumbnail(props: ScrollerThumbnailProps) {
  const { el, visibility, opacity, idx, image, ...buttonProps } = props
  const scrollTo = useScrollTo()
  const { getScrollSnapPositions } = useScrollerContext()
  const active = useMotionValueValue(visibility, (v) => v >= 0.5)
  const imageController = useAnimation()

  const classes = withState({ active })

  const positions = getScrollSnapPositions()
  const currentPosition = positions.x[idx]

  const scale = useMotionValueValue(visibility, (v) => v + 1)

  if (!image) return null

  const activeWidth = (120 / (image.height ?? 120)) * (image.width ?? 120)

  return (
    <MotionBox initial='default' animate={imageController}>
      <MotionBox
        className={classes.thumbnail}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          scrollTo({ x: currentPosition, y: positions.y[idx] ?? 0 })
        }}
        sx={{
          width: '100%',
          overflow: 'hidden',
          height: 120,
        }}
        animate={{
          width: active ? activeWidth : 'auto',
          margin: active ? '0 8px' : '0',
          scale,
        }}
      >
        <Image src={image.src} layout='fill' sx={{ objectFit: 'cover' }} />
      </MotionBox>
    </MotionBox>
  )
}
