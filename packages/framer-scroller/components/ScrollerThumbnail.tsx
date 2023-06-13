import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Image, ImageProps } from '@graphcommerce/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { ButtonProps, styled } from '@mui/material'
import { m, Variant, useAnimation, useMotionValueEvent } from 'framer-motion'
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
  moving: Variant
  active: Variant
}

const MotionBox = styled(m.div)({})

export function ScrollerThumbnail(props: ScrollerThumbnailProps) {
  const { el, visibility, opacity, idx, image, ...buttonProps } = props
  const scrollTo = useScrollTo()
  const { getScrollSnapPositions, scroll } = useScrollerContext()
  const active = useMotionValueValue(visibility, (v) => v >= 0.5)
  const imageController = useAnimation()

  const classes = withState({ active })

  const positions = getScrollSnapPositions()
  const currentPosition = positions.x[idx]

  useMotionValueEvent(visibility, 'change', (v) => {
    if (v >= 0.9) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      imageController.start('active')
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      imageController.start('default')
    }
  })

  if (!image) return null

  const imageAnimation: AnimationType = {
    default: {
      scaleX: 1,
    },
    moving: {
      scaleX: 1.5,
    },
    active: {
      scaleX: 1.5,
    },
  }

  const isBeforeScroll = scroll.x.get() < getScrollSnapPositions().x[idx]

  const placement = () => {
    if (active) return 0
    if (isBeforeScroll) return 60
    return -60
  }

  const backgroundAnimation: AnimationType = {
    default: {
      scaleX: 2,
      x: placement(),
    },
    moving: {
      scaleX: 2,
    },
    active: {
      scaleX: 1.5,
    },
  }

  return (
    <MotionBox initial='default' animate={imageController}>
      <MotionBox variants={backgroundAnimation} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MotionBox
          className={classes.thumbnail}
          variants={imageAnimation}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            scrollTo({ x: currentPosition, y: positions.y[idx] ?? 0 })
          }}
          sx={{
            height: 120,
            bgcolor: 'green',
            overflow: 'hidden',
          }}
        >
          <Image src={image.src} layout='fill' />
        </MotionBox>
      </MotionBox>
    </MotionBox>
  )
}
