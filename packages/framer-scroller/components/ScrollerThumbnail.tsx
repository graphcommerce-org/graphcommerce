import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Image, ImageProps } from '@graphcommerce/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { ButtonProps, styled } from '@mui/material'
import { m } from 'framer-motion'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'

const name = 'ScrollerThumbnail'
const parts = ['thumbnail'] as const
type OwnerProps = { active: boolean }

const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

type ScrollerThumbnailProps = Omit<ButtonProps, 'onClick' | 'className'> &
  ItemState & { idx: number; image: Pick<ImageProps, 'src' | 'height' | 'width'> }

const MotionBox = styled(m.div)({})

const imageDimensions = 120

export function ScrollerThumbnail(props: ScrollerThumbnailProps) {
  const { el, visibility, opacity, idx, image, ...buttonProps } = props
  const scrollTo = useScrollTo()
  const { getScrollSnapPositions } = useScrollerContext()

  const active = useMotionValueValue(visibility, (v) => v > 0.5)
  const classes = withState({ active })

  const imageAnimation = {
    rest: { width: imageDimensions / 2 },
    hover: {
      width: imageDimensions,
    },
  }

  const spacingAnimation = {
    rest: { width: imageDimensions / 2 },
    hover: {
      width: imageDimensions + 20,
    },
  }

  if (!image) return null
  return (
    <MotionBox initial='rest' whileHover='hover'>
      <MotionBox variants={spacingAnimation} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MotionBox
          className={classes.thumbnail}
          variants={imageAnimation}
          onClick={() => {
            const positions = getScrollSnapPositions()
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            scrollTo({ x: positions.x[idx] ?? 0, y: positions.y[idx] ?? 0 })
          }}
          sx={{
            width: imageDimensions,
            height: imageDimensions,
            aspectRatio: '1/1',
            '& img': {
              display: 'block',
              height: '100%',
              objectFit: 'cover',
              borderRadius: { xs: 1, md: 2 },
            },
          }}
        >
          <Image src={image.src} height={image.height} width={image.width} />
        </MotionBox>
      </MotionBox>
    </MotionBox>
  )
}
