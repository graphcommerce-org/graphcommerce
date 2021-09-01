import { makeStyles, Theme } from '@material-ui/core'
import { Scroller, ScrollerButton, ScrollerProvider } from '@reachdigital/framer-scroller'
import { iconChevronLeft, iconChevronRight, SvgImageSimple, UseStyles } from '@reachdigital/next-ui'
import clsx from 'clsx'
import { m, useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      height: 44,
      marginBottom: theme.spacings.sm,
      position: 'sticky',
      top: theme.page.vertical,
      zIndex: 9,
      margin: '0 auto',
      maxWidth: `calc(100% - 96px - ${theme.spacings.sm} * 2)`,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        maxWidth: 'unset',
        margin: `0 calc(${theme.page.horizontal} * -1)`,
      },
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    container: {
      maxWidth: '100%',
      padding: 6,
      [theme.breakpoints.up('md')]: {
        background: '#fff',
        borderRadius: 22,
        // padding: `0 3px`,
      },
    },
    containerSticky: {},
    scroller: {
      display: 'grid',
      gridAutoFlow: 'column',
      borderRadius: 22,
      columnGap: 6,
    },
    scrollerSticky: {},
    sliderPrev: {
      position: 'absolute',
      top: 2,
      left: 2,
      zIndex: 10,
    },
    sliderNext: {
      position: 'absolute',
      top: 2,
      right: 2,
      zIndex: 10,
    },
  }),
  { name: 'ProductListFiltersContainer' },
)

export type ProductListFiltersContainerProps = PropsWithChildren<UseStyles<typeof useStyles>>

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useStyles(props)
  const { scrollY } = useViewportScroll()
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState(100)
  const [spacing, setSpacing] = useState(20)
  const scrollHalfway = startPosition + spacing

  const wrapperRef = useRef<HTMLDivElement>(null)

  // Measure the sizing of the wrapping container
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (window.scrollY > 100) return
      const offset = wrapperRef.current?.offsetTop ?? 0
      const elemHeigh = entry.contentRect.height
      const nextOffset =
        (wrapperRef.current?.parentElement?.nextElementSibling as HTMLElement | null)?.offsetTop ??
        0

      setSpacing(nextOffset - elemHeigh - offset + 20)
      setStartPosition(offset)
    })
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onCheckStickyChange = (v: number) => {
      if (isSticky && v <= scrollHalfway) {
        setIsSticky(false)
      }
      if (!isSticky && v > scrollHalfway) {
        setIsSticky(true)
      }
    }
    onCheckStickyChange(scrollY.get())
    return scrollY.onChange(onCheckStickyChange)
  }, [isSticky, scrollHalfway, scrollY])

  const opacity = useTransform(scrollY, [startPosition, startPosition + spacing], [0, 0.08])
  const opacity2 = useTransform(scrollY, [startPosition, startPosition + spacing], [0, 0.1])
  const filter = useMotionTemplate`
    drop-shadow(0 1px 4px rgba(0,0,0,${opacity}))
    drop-shadow(0 4px 10px rgba(0,0,0,${opacity2}))`

  return (
    <m.div className={classes.wrapper} ref={wrapperRef}>
      <ScrollerProvider scrollSnapAlign='none'>
        <ScrollerButton direction='left' className={classes.sliderPrev}>
          <SvgImageSimple src={iconChevronLeft} />
        </ScrollerButton>
        <m.div
          className={clsx(classes.container, isSticky && classes.containerSticky)}
          style={{ filter }}
        >
          <Scroller
            className={clsx(classes.scroller, isSticky && classes.scrollerSticky)}
            hideScrollbar
          >
            {children}
          </Scroller>
        </m.div>
        <ScrollerButton direction='right' className={classes.sliderNext}>
          <SvgImageSimple src={iconChevronRight} />
        </ScrollerButton>
      </ScrollerProvider>
    </m.div>
  )
}
