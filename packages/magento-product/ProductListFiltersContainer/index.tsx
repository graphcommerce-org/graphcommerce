import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

type ProductListFiltersContainerProps = React.PropsWithChildren<ReactNode>

export const useProductListFiltersStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      gridArea: 'filters',
      position: 'sticky',
      top: 10,
      zIndex: 9,
      margin: '0 auto',
      maxWidth: '75%',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        padding: 0,
        margin: 'unset',
        maxWidth: 'unset',
      },
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
    filterContainerComposite: {
      boxShadow: theme.shadows[2],
      background: theme.palette.background.default,
      borderRadius: 40,
      display: 'block',
      position: 'absolute',
      top: 0,
      width: `calc(100% + 16px)`,
      height: 52,
      marginLeft: -8,
      [theme.breakpoints.down('sm')]: {
        opacity: 1,
        borderRadius: 0,
        width: '100%',
        position: 'fixed',
        left: '0',
        top: '0',
        margin: 0,
      },
    },
    filters: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 4,
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        overflowX: 'scroll',
        paddingBottom: 12,
        paddingTop: 6,
        marginTop: -12,
      },
    },
    filtersSticky: {
      flexWrap: 'nowrap',
      justifyContent: 'center',
      overflowX: 'scroll',
      paddingBottom: 10,
      [theme.breakpoints.down('sm')]: {
        // justifyContent: 'left',
        paddingLeft: 30,
        paddingRight: 30,
        margin: `-12px calc(${theme.page.horizontal} * -1) 0 0`,
      },
      [theme.breakpoints.down('xs')]: {
        // maxWidth: '92%',
      },
    },
    filterItem: {
      margin: `6px 3px 0`,
    },
  }),
  { name: 'ProductListFiltersContainer' },
)

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useProductListFiltersStyles()
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
      const offset = wrapperRef.current?.offsetTop ?? 0
      const elemHeigh = entry.contentRect.height
      const nextOffset =
        (wrapperRef.current?.nextElementSibling as HTMLElement | null)?.offsetTop ?? 0

      setSpacing(nextOffset - elemHeigh - offset)
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

  const opacity = useTransform(scrollY, [startPosition, startPosition + spacing], [0, 1])

  return (
    <m.div
      layout='position'
      className={classes.wrapper}
      ref={wrapperRef}
      style={{ height: height && isSticky ? height : undefined }}
    >
      <m.div style={{ opacity }} className={classes.filterContainerComposite} />
      <m.div className={clsx(classes.filters, { [classes.filtersSticky]: isSticky })}>
        {children}
      </m.div>
    </m.div>
  )
}
