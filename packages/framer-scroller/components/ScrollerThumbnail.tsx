import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Image } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { i18n } from '@lingui/core'
import { Fab, ButtonProps, styled, Button } from '@mui/material'
import { m } from 'framer-motion'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'

const name = 'ScrollerThumbnail'
const parts = ['thumbnail'] as const
type OwnerProps = { active: boolean }

const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

type ScrollerThumbnailProps = Omit<ButtonProps, 'onClick' | 'className'> &
  ItemState & { idx: number; image: any }

const MotionBox = styled(m.div)({})

export function ScrollerThumbnail(props: ScrollerThumbnailProps) {
  const { el, visibility, opacity, idx, image, ...buttonProps } = props
  const scrollTo = useScrollTo()
  const { getScrollSnapPositions } = useScrollerContext()

  const active = useMotionValueValue(visibility, (v) => v > 0.5)
  const classes = withState({ active })

  if (!image) return null
  return (
    <Button
      // eslint-disable-next-line react/no-array-index-key
      {...buttonProps}
      onClick={() => {
        const positions = getScrollSnapPositions()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        scrollTo({ x: positions.x[idx] ?? 0, y: positions.y[idx] ?? 0 })
      }}
      className={classes.thumbnail}
      aria-label={i18n._(/* i18n */ 'Navigate to item {0}', { 0: idx + 1 })}
      sx={{
        minWidth: 'auto',
        borderRadius: { xs: 1, md: 2 },
        p: 0,
        flexBasis: '0%',
        flexGrow: '1',
        flexShrink: '1',
        background: 'transparent',
      }}
    >
      <MotionBox
        className={classes.thumbnail}
        sx={{
          height: '100%',
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
    </Button>
  )
}
