import React, { ReactNode, useEffect, useState } from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { Theme, makeStyles } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import { animated, useSpring, config } from 'react-spring'
import useResizeObserver from 'use-resize-observer'

export type ScrollSnapSliderProps = { scrollbar?: boolean; pagination?: boolean }
type StyleProps = { scrolling: boolean } & ScrollSnapSliderProps

const useStyles = makeStyles<Theme, StyleProps>(
  () => ({
    container: {
      position: 'relative',
    },
    scroller: ({ scrolling, scrollbar }) => ({
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      display: 'flex',
      willChange: 'transform', // Solve issue with repaints
      overscrollBehavior: 'contain', // https://developers.google.com/web/updates/2017/11/overscroll-behavior
      ...(!scrollbar && {
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }),
      // We disable the scroll-snap-align when we're animating because it causes animation jank
      ...(!scrolling && {
        scrollSnapType: 'both proximity',
        '& > *': { scrollSnapAlign: 'center' },
      }),
    }),
    prevFab: {
      position: 'absolute',
      left: '0',
      top: 'calc(50% - (40px / 2))',
      '&[hidden]': {
        display: 'none',
      },
    },
    nextFab: {
      position: 'absolute',
      right: '0',
      top: 'calc(50% - (40px / 2))',
      '&[hidden]': {
        display: 'none',
      },
    },
  }),
  { name: 'ScrollSnapSlider' },
)

const ScrollSnapSlider: React.FC<ScrollSnapSliderProps & { children: ReactNode }> = (props) => {
  const { children, pagination = false, scrollbar = false } = props
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>()
  const [intersects, setIntersects] = useState<number[]>([])

  const [scrolling, setScrolling] = useState<boolean>(false)
  const classes = useStyles({ pagination, scrollbar, scrolling })

  const [{ scroll: scrollLeft }, setScroll] = useSpring(
    () => ({
      scroll: 0,
      onStart: () => setScrolling(true),
      onRest: () => setScrolling(false),
    }),
    [],
  )

  const prevAnim = useSpring({
    opacity: intersects[0] > 0.9 ? 0 : 1,
    transform: `scale(${intersects[0] > 0.9 ? 0 : 1})`,
    from: { transform: 'scale(0)', opacity: 0 },
    config: config.stiff,
  })
  const nextAnim = useSpring({
    opacity: intersects[intersects.length - 1] > 0.9 ? 0 : 1,
    transform: `scale(${intersects[intersects.length - 1] > 0.9 ? 0 : 1})`,
    from: { transform: 'scale(0)', opacity: 0 },
    config: config.stiff,
  })

  const onPrev = () => {
    const { current } = ref
    if (!current) return

    // Find targetEl
    const targetIdx = intersects.map((val) => val > 0.9).indexOf(true) - 1
    const targetEl = current.children[targetIdx] as HTMLElement
    if (!targetEl) return

    const leftBound = targetEl.offsetLeft - current.offsetLeft

    // Scroll center position of targetEl
    let scroll = Math.round(leftBound - width / 2 + targetEl.offsetWidth / 2)

    // Scroll to start if if righBound will be in view
    const rightBound = leftBound + targetEl.offsetWidth
    if (rightBound < width) scroll = 0

    setScroll({ scroll, reset: true, from: { scroll: current.scrollLeft } })
  }

  const onNext = () => {
    const { current } = ref
    if (!current) return

    // Find targetEl
    const targetIdx = intersects.map((val) => val > 0.9).lastIndexOf(true) + 1
    const targetEl = current.children[targetIdx] as HTMLElement
    if (!targetEl) return

    const leftBound = targetEl.offsetLeft - current.offsetLeft

    // Scroll center position of targetEl
    let scroll = Math.round(leftBound - width / 2 + targetEl.offsetWidth / 2)

    // Scroll to end if leftBound of will be in view
    const scrollEnd = current.scrollWidth - width
    if (leftBound > scrollEnd) scroll = scrollEnd

    setScroll({ scroll, reset: true, from: { scroll: current.scrollLeft } })
  }

  useEffect(() => {
    if (ref.current === null) return () => {}
    const childElements = Array.from(ref.current.children)
    const newIntersects: number[] = new Array<number>(childElements.length).fill(0)
    setIntersects(newIntersects)

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const idx = childElements.indexOf(entry.target)
          newIntersects[idx] = entry.intersectionRatio
          setIntersects([...newIntersects])
        }),
      { root: ref.current, threshold: [0, 0.1, 0.9, 1] },
    )

    childElements.forEach((child) => io.observe(child))

    return () => io.disconnect()
  }, [children, ref])

  const AnimatedFab = animated(Fab)

  return (
    <div className={classes.container}>
      <animated.div className={classes.scroller} scrollLeft={scrollLeft} ref={ref}>
        {children}
      </animated.div>
      <AnimatedFab className={classes.prevFab} size='small' onClick={onPrev} style={prevAnim}>
        <ArrowBack />
      </AnimatedFab>
      <AnimatedFab className={classes.nextFab} size='small' onClick={onNext} style={nextAnim}>
        <ArrowForward />
      </AnimatedFab>
      {pagination && (
        <div>
          {intersects.map((intersecting, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span style={{ opacity: intersecting ? 1 : 0.5 }} key={index}>
              {index}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ScrollSnapSlider
