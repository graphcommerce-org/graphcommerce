import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Image, ImageProps } from '@graphcommerce/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { styled } from '@mui/material'
import { m, useAnimation, Variants } from 'framer-motion'
import { useEffect } from 'react'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'
import { useImageGalleryContext } from './ImageGalleryContext'

const name = 'ScrollerThumbnail'
const parts = ['thumbnail'] as const
type OwnerProps = { active: boolean }

const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

type ScrollerThumbnailProps = ItemState & {
  idx: number
  image: Pick<ImageProps, 'src' | 'height' | 'width'>
}

const MotionBox = styled(m.div)({})

export function ScrollerThumbnail(props: ScrollerThumbnailProps) {
  const { visibility, idx, image } = props
  const scrollTo = useScrollTo()
  const { getScrollSnapPositions, scroll } = useScrollerContext()
  const active = useMotionValueValue(visibility, (v) => v >= 0.7)
  const { container } = useImageGalleryContext()
  const panActive = useMotionValueValue(container.pan.active, (v) => v)
  const scrollIsAnimating = useMotionValueValue(scroll.animating, (v) => v)
  const imageController = useAnimation()

  const classes = withState({ active })

  const positions = getScrollSnapPositions()
  const currentPosition = positions.x[idx]

  const activeWidth = 120

  useEffect(() => {
    if (active && !scrollIsAnimating && !panActive) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      imageController.start('active')
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    else imageController.start('default')
  }, [active, imageController, panActive, scrollIsAnimating])

  if (!image) return null

  const widthAnimation: Variants = {
    default: {
      margin: '0',
      width: 'auto',
    },
    active: {
      margin: '0 8px',
      width: activeWidth,
    },
  }

  return (
    <MotionBox>
      <MotionBox
        initial='default'
        className={classes.thumbnail}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          scrollTo({ x: currentPosition, y: positions.y[idx] ?? 0 })
        }}
        sx={{
          height: 120,
        }}
        animate={imageController}
        variants={widthAnimation}
      >
        <Image src={image.src} layout='fill' sx={{ objectFit: 'cover' }} />
      </MotionBox>
    </MotionBox>
  )
}
