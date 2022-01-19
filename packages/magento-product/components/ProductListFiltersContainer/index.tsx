import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import {
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SvgIcon,
  useMergedClasses,
  useScrollY,
  UseStyles,
  makeStyles,
} from '@graphcommerce/next-ui'
import clsx from 'clsx'
import { m, useTransform } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

const useStyles = makeStyles({ name: 'ProductListFiltersContainer' })((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: responsiveVal(44, 52),
    marginBottom: theme.spacings.sm,
    position: 'sticky',
    top: theme.page.vertical,
    zIndex: 9,
    margin: '0 auto',
    maxWidth: `calc(100% - 96px - ${theme.spacings.sm} * 2)`,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      maxWidth: 'unset',
      margin: `0 calc(${theme.page.horizontal} * -1)`,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  container: {
    position: 'relative',
    maxWidth: '100%',
    padding: 6,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('md')]: {
      background: theme.palette.background.default,
      borderRadius: '99em',
    },
  },
  shadow: {
    pointerEvents: 'none',
    zindex: '-1',
    borderRadius: '99em',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    boxShadow: theme.shadows[6],
    [theme.breakpoints.down('md')]: {
      boxShadow: 'none !important',
    },
  },
  containerSticky: {},
  scroller: {
    paddingLeft: theme.page.horizontal,
    paddingRight: theme.page.horizontal,
    paddingBottom: 1,
    [theme.breakpoints.up('md')]: {
      borderRadius: '99em',
      paddingLeft: 6,
      paddingRight: 6,
    },
    columnGap: 6,
    gridAutoColumns: 'min-content',
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
}))

export type ProductListFiltersContainerProps = PropsWithChildren<UseStyles<typeof useStyles>>

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)
  const scrollY = useScrollY()

  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(100)
  const [spacing, setSpacing] = useState<number>(20)

  const scrollHalfway = startPosition + spacing

  const wrapperRef = useRef<HTMLDivElement>(null)

  // Measure the sizing of the wrapping container
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (window.scrollY > 100) return
      const offset = wrapperRef.current?.getBoundingClientRect()?.top ?? 0
      const elemHeigh = entry.contentRect.height
      const nextOffset =
        (
          wrapperRef.current?.parentElement?.nextElementSibling as HTMLElement | null
        )?.getBoundingClientRect()?.top ?? 0
      const modifier = 5

      setSpacing((nextOffset - elemHeigh - offset + 20) * modifier)
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

  const opacity = useTransform(scrollY, [startPosition, startPosition + spacing], [0, 1])

  return (
    <m.div className={classes.wrapper} ref={wrapperRef}>
      <ScrollerProvider scrollSnapAlign='none'>
        <ScrollerButton direction='left' className={classes.sliderPrev} size='small'>
          <SvgIcon src={iconChevronLeft} />
        </ScrollerButton>
        <div className={clsx(classes.container, isSticky && classes.containerSticky)}>
          <Scroller
            className={clsx(classes.scroller, isSticky && classes.scrollerSticky)}
            hideScrollbar
          >
            {children}
          </Scroller>
          <m.div className={classes.shadow} style={{ opacity }} />
        </div>
        <ScrollerButton direction='right' className={classes.sliderNext} size='small'>
          <SvgIcon src={iconChevronRight} />
        </ScrollerButton>
      </ScrollerProvider>
    </m.div>
  )
}
