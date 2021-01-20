import { makeStyles, Theme } from '@material-ui/core'
import ScrollSnapSlider from '@reachdigital/next-ui/ScrollSnapSlider'
import clsx from 'clsx'
import { m, useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

type ProductListFiltersContainerProps = React.PropsWithChildren<unknown>

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      gridArea: 'filters',
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
    filters: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        background: '#fff',
        borderRadius: 22,
        // padding: `0 3px`,
      },
    },
    filtersSticky: {},
    scroller: {
      borderRadius: 22,
      padding: `6px ${theme.page.horizontal}`,
      [theme.breakpoints.up('md')]: {
        padding: 6,
      },
      columnGap: 6,
      '& :last-child': {
        marginRight: 6, // https://www.brunildo.org/test/overscrollback.html
      },
    },
    scrollerSticky: {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '80px',
      },
    },
    prevFab: {
      top: 'auto',
      left: -3,
      height: 44,
      width: 44,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    nextFab: {
      top: 'auto',
      right: -3,
      height: 44,
      width: 44,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
  { name: 'ProductListFiltersContainer' },
)

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useStyles()
  const { scrollY } = useViewportScroll()
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [height, setHeight] = useState(0)
  const [startPosition, setStartPosition] = useState(0)
  const [spacing, setSpacing] = useState(0)
  const scrollHalfway = startPosition + spacing

  const wrapperRef = useRef<HTMLDivElement>(null)

  // Measure the sizing of the wrapping container
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (window.scrollY > 100) return
      const offset = wrapperRef.current?.offsetTop ?? 0
      const elemHeigh = entry.contentRect.height
      const nextOffset =
        (wrapperRef.current?.nextElementSibling as HTMLElement | null)?.offsetTop ?? 0

      setSpacing(nextOffset - elemHeigh - offset + 20)
      setStartPosition(offset)
      setHeight(elemHeigh)
    })
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onCheckStickyChange = (v: number) => {
      if (isSticky && v <= scrollHalfway) setIsSticky(false)
      if (!isSticky && v > scrollHalfway) setIsSticky(true)
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
    <m.div
      layout='position'
      className={classes.wrapper}
      ref={wrapperRef}
      style={{ height: height && isSticky ? height : undefined }}
    >
      <m.div
        layout
        className={clsx(classes.filters, isSticky && classes.filtersSticky)}
        style={{ filter }}
      >
        <ScrollSnapSlider
          fabProps={{ size: 'small' }}
          classes={{
            prevFab: classes.prevFab,
            nextFab: classes.nextFab,
            scroller: clsx(classes.scroller, isSticky && classes.scrollerSticky),
          }}
        >
          {children}
        </ScrollSnapSlider>
      </m.div>
    </m.div>
  )
}
