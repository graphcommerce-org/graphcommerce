import { makeStyles, Grow, Fab, FabProps } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ChevronLeft'
import ArrowForward from '@material-ui/icons/ChevronRight'
import clsx from 'clsx'
import React, { ReactNode, useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useResizeObserver from 'use-resize-observer'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'

// @todo cancel all animatins on touch down, cancellation of animations doesn't work with react-spring 8.0 yet.

type State = { isScrolling: boolean }
type Props = {
  scrollbar?: boolean
  pagination?: boolean
  fabProps?: Omit<FabProps, 'children' | 'onClick'>
}

const useStyles = makeStyles(
  {
    container: {
      position: 'relative',
    },
    scroller: ({ isScrolling, scrollbar }: State & Props) => ({
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      display: 'flex',
      willChange: 'transform', // Solve issue with repaints
      overscrollBehaviorX: 'contain', // https://developers.google.com/web/updates/2017/11/overscroll-behavior
      ...(!scrollbar && {
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }),
      // We disable the scroll-snap-align when we're animating because it causes animation jank
      ...(!isScrolling && {
        scrollSnapType: 'both proximity',
        '& > *': { scrollSnapAlign: 'center' },
      }),
      overflowY: `hidden`,
    }),
    prevFab: {
      width: responsiveVal(30, 50),
      height: responsiveVal(30, 50),
      minHeight: 'auto',
      willChange: 'opacity, transform',
      position: 'absolute',
      left: `calc((${responsiveVal(30, 50)} / -2))`,
      top: `calc((${responsiveVal(30, 50)} * 0.25) * -1)`,
    },
    nextFab: {
      width: responsiveVal(30, 50),
      height: responsiveVal(30, 50),
      minHeight: 'auto',
      willChange: 'opacity, transform',
      position: 'absolute',
      right: `calc((${responsiveVal(30, 50)} / -2))`,
      top: `calc((${responsiveVal(30, 50)} * 0.25) * -1)`,
    },
  },
  { name: 'ScrollSnapSlider' },
)

export type ScrollSnapSliderProps = Props & UseStyles<typeof useStyles>

const ScrollSnapSlider: React.FC<ScrollSnapSliderProps & { children: ReactNode }> = (props) => {
  const { children, pagination, fabProps } = props
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>()
  const [intersects, setIntersects] = useState<boolean[]>([])
  const [isScrolling, setScrolling] = useState<boolean>(false)
  const classes = useStyles({ isScrolling, ...props })

  const [{ scroll: scrollLeft }, setScroll] = useSpring(() => ({
    scroll: 0,
    onRest: () => setScrolling(false),
    config: { clamp: true },
  }))

  const onPrev = () => {
    const { current } = ref
    if (!current) return

    // Find targetEl
    const targetIdx = intersects.indexOf(true) - 1
    const targetEl = current.children[targetIdx] as HTMLElement
    if (!targetEl) return

    const leftBound = targetEl.offsetLeft - current.offsetLeft

    // Scroll center position of targetEl
    let scroll = Math.round(leftBound - width / 2 + targetEl.offsetWidth / 2)

    // Scroll to start if if righBound will be in view
    const rightBound = leftBound + targetEl.offsetWidth
    if (rightBound < width) scroll = 0

    setScrolling(true)
    setScroll({ scroll, reset: true, from: { scroll: current.scrollLeft } })
  }

  const onNext = () => {
    const { current } = ref
    if (!current) return

    // Find targetEl
    const targetIdx = intersects.lastIndexOf(true) + 1
    const targetEl = current.children[targetIdx] as HTMLElement
    if (!targetEl) return

    const leftBound = targetEl.offsetLeft - current.offsetLeft

    // Scroll center position of targetEl
    let scroll = Math.round(leftBound - width / 2 + targetEl.offsetWidth / 2)

    // Scroll to end if leftBound of will be in view
    const scrollEnd = current.scrollWidth - width
    if (leftBound > scrollEnd) scroll = scrollEnd

    setScrolling(true)
    setScroll({ scroll, reset: true, from: { scroll: current.scrollLeft } })
  }

  useEffect(() => {
    if (ref.current === null) return () => {}
    const childElements = Array.from(ref.current.children)
    const newIntersects = new Array<boolean>(childElements.length).fill(false)
    setIntersects(newIntersects)

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const idx = childElements.indexOf(entry.target)
          if (newIntersects[idx] !== entry.intersectionRatio > 0.9) {
            newIntersects[idx] = entry.intersectionRatio > 0.9
            setIntersects([...newIntersects])
          }
        }),
      { root: ref.current, threshold: [0, 0.1, 0.9, 1] },
    )

    childElements.forEach((child) => io.observe(child))

    return () => io.disconnect()
  }, [children, ref])

  return (
    <div className={classes.container}>
      {/* animated.div misses a typescript declaration for scrollLeft
      //@ts-ignore */}
      <animated.div scrollLeft={scrollLeft} className={classes.scroller} ref={ref}>
        {children}
      </animated.div>
      <Grow in={!intersects[0]}>
        <Fab
          size='large'
          {...fabProps}
          className={clsx(classes.prevFab, fabProps?.className)}
          onClick={onPrev}
          aria-label='previous'
        >
          <ArrowBack />
        </Fab>
      </Grow>
      <Grow in={!intersects[intersects.length - 1]}>
        <Fab
          size='large'
          {...fabProps}
          className={clsx(classes.nextFab, fabProps?.className)}
          onClick={onNext}
          aria-label='next'
        >
          <ArrowForward />
        </Fab>
      </Grow>
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
