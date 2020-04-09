import React, { ReactNode, useRef, useEffect, useState } from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { Theme, makeStyles } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import { animated, useSpring, config } from 'react-spring'

type ScrollSnapSliderProps = { scrollbar?: boolean; pagination?: boolean }
type StyleProps = { scrolling: boolean } & ScrollSnapSliderProps

const useStyles = makeStyles<Theme, StyleProps>(() => ({
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
}))

const ScrollSnapSlider: React.FC<ScrollSnapSliderProps & { children: ReactNode }> = ({
  children,
  pagination = false,
  scrollbar = false,
}) => {
  const scroller = useRef<HTMLDivElement>(null)
  const [intersects, setIntersects] = useState<number[]>([])
  const [styleProps, setStyleProps] = useState<StyleProps>({
    scrolling: false,
    pagination,
    scrollbar,
  })
  const classes = useStyles(styleProps)

  const [{ scroll }, setScroll] = useSpring(() => ({
    scroll: 0,
    config: { clamp: true },
    onStart: () => setStyleProps({ ...styleProps, scrolling: true }),
    onRest: () => setStyleProps({ ...styleProps, scrolling: false }),
  }))
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
    if (scroller.current === null) return
    const { scrollLeft } = scroller.current

    setScroll({
      scroll: scrollLeft < 1000 ? 0 : scrollLeft - 1000,
      reset: true,
      from: { scroll: scrollLeft },
    })
  }

  const onNext = () => {
    if (scroller.current === null) return
    const { scrollWidth, scrollLeft } = scroller.current

    setScroll({
      scroll: scrollLeft + 1000 > scrollWidth ? scrollWidth : scrollLeft + 1000,
      reset: true,
      from: { scroll: scrollLeft },
    })
  }

  useEffect(() => {
    if (scroller.current === null) return () => {}
    const childElements = Array.from(scroller.current.children)
    const newIntersects: number[] = new Array<number>(childElements.length).fill(0)
    setIntersects(newIntersects)

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const idx = childElements.indexOf(entry.target)
          newIntersects[idx] = entry.intersectionRatio
          setIntersects([...newIntersects])
        }),
      { root: scroller.current, threshold: [0, 0.1, 0.9, 1] },
    )

    childElements.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [scroller, children])

  const AnimatedFab = animated(Fab)

  return (
    <div className={classes.container}>
      <animated.div className={classes.scroller} scrollLeft={scroll} ref={scroller}>
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
