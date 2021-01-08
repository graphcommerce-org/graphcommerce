import { makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'
// import useResizeObserver from 'use-resize-observer'

type ProductListFiltersContainerProps = React.PropsWithChildren<ReactNode>

export const useProductListFiltersStyles = makeStyles(
  (theme: Theme) => ({
    filtersOuterContainer: {
      gridArea: 'filters',
      position: 'sticky',
      top: 10,
      zIndex: 9,
      margin: '0 auto',
      height: 90,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
        padding: 0,
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
      marginTop: 10,
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        overflowX: 'scroll',
        paddingBottom: 12,
        paddingTop: 6,
        marginTop: -6,
      },
    },
    filtersSticky: {
      flexWrap: 'nowrap',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        float: 'right',
        justifyContent: 'end',
        maxWidth: '78%',
        marginRight: `calc(${theme.page.horizontal} * -1)`,
        '& > div > div': {
          marginTop: 0,
        },
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '92%',
      },
    },
    filterItem: {
      marginRight: responsiveVal(2, 4),
      marginLeft: responsiveVal(2, 4),
      marginTop: 0,
      [theme.breakpoints.down('sm')]: {
        marginTop: 6,
      },
    },
  }),
  { name: 'ProductListFiltersContainer' },
)

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useProductListFiltersStyles()
  const { scrollY } = useViewportScroll()
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  // const [domRect, setDomRect] = useState<DOMRect>()
  // useResizeObserver({
  //   ref,
  //   onResize: () => setDomRect(ref.current?.getBoundingClientRect()),
  // })

  // const filterOuterContainerRef = useRef<any>()

  const scrollPosOnScroll = 110 // filterOuterContainerRef?.current.offsetTop || 0 // 110 // TODO: measure the top location of the filter row. What is the top offset?
  const scrollSpacing = 30
  const cssPropertyChangeSpacing = scrollPosOnScroll + scrollSpacing + 5

  useEffect(
    () =>
      scrollY.onChange((v) => {
        if (isSticky && v <= cssPropertyChangeSpacing) setIsSticky(false)
        if (!isSticky && v > cssPropertyChangeSpacing) setIsSticky(true)
      }),
    [cssPropertyChangeSpacing, isSticky, scrollY],
  )

  const filterAnimProgress = useTransform(
    scrollY,
    [scrollPosOnScroll + scrollSpacing, cssPropertyChangeSpacing + scrollSpacing],
    [0, 1],
  )

  return (
    <m.div layout='position' className={classes.filtersOuterContainer} ref={ref}>
      <m.div style={{ opacity: filterAnimProgress }} className={classes.filterContainerComposite} />
      <m.div className={clsx(classes.filters, { [classes.filtersSticky]: isSticky })}>
        {children}
      </m.div>
    </m.div>
  )
}
