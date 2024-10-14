// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { styled, SxProps, Theme, useTheme } from '@mui/material'
import { m, transform, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { useScrollerControl } from '../hooks/useScrollerControl'

type OwnerProps = {
  direction: 'x' | 'y'
}

type ScrollerBarProps = OwnerProps & {
  sx?: SxProps<Theme>
}

const name = 'ScrollerBar'
const parts = ['track', 'thumb'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

const Track = styled(m.div)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  padding: '2px',
})

const Scroll = styled(m.button)({
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  display: 'block',
  height: 7,
})

export function ScrollerBar(props: ScrollerBarProps) {
  const { direction, sx } = props
  const control = useScrollerControl()
  const { scroll, scrollerRef } = useScrollerContext()
  const track = useRef<HTMLDivElement>(null)

  const classes = withState({ direction })
  const theme = useTheme()

  const offsetSize = direction === 'x' ? 'offsetWidth' : 'offsetHeight'
  const scrollSize = direction === 'x' ? 'scrollWidth' : 'scrollHeight'
  const size = direction === 'x' ? 'width' : 'height'
  const offAxis = direction === 'x' ? 'height' : 'width'

  const scrollProgress = scroll[`${direction}Progress`]

  const thumbSize = useTransform(scrollProgress, (directionProgress) => {
    if (!scrollerRef.current) return 0
    const trackWidth = scrollerRef.current[offsetSize]
    return trackWidth * (trackWidth / scrollerRef.current[scrollSize])
  })

  const thumbX = useTransform([scrollProgress, thumbSize], ([p, thumbS]: number[]) => {
    if (!scrollerRef.current) return undefined
    const baseX = (scrollerRef.current[offsetSize] - thumbS) * p
    return control.controlling ? undefined : baseX
  })

  return (
    <Track
      ref={track}
      className={classes.track}
      sx={sx}
      whileHover={{
        backgroundColor: theme.vars.palette.action.selected,
        // borderTop: `1px solid ${theme.vars.palette.action.active}`,
      }}
    >
      <Scroll
        className={classes.thumb}
        aria-label='Scroll'
        sx={{
          backgroundColor: theme.vars.palette.action.active,
          borderRadius: '50px',
        }}
        style={{ [direction]: thumbX, [size]: thumbSize }}
        whileHover={{ [offAxis]: 13 }}
        // whileDrag={{ height: 20 }}
        onDragStart={() => control.take()}
        onDragEnd={() => control.release()}
        onDrag={(event, info) => {
          if (!scrollerRef.current || !track.current) return

          const maxSize = scrollerRef.current[offsetSize] - thumbSize.get()

          const progress = (control.x / scrollerRef.current[scrollSize]) * track.current[offsetSize]
          const position = progress + info.offset[direction]
          control.updateProgress({
            [direction]: transform(position, [0, maxSize], [0, 1]),
          })
        }}
        drag='x'
        dragConstraints={track}
        dragElastic={0}
        dragMomentum={false}
      />
    </Track>
  )
}
