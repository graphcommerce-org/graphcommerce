import { makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

type ProductListFiltersContainerProps = React.PropsWithChildren<ReactNode>

export const useProductListFiltersStyles = makeStyles(
  (theme: Theme) => ({
    filtersOuterContainer: {
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
      justifyContent: 'left',
      overflowX: 'scroll',
      paddingBottom: 10,
      [theme.breakpoints.down('sm')]: {
        float: 'right',
        justifyContent: 'end',
        maxWidth: '80%',
        marginRight: `calc(${theme.page.horizontal} * -1)`,
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '92%',
      },
    },
    filterItem: {
      marginRight: responsiveVal(2, 4),
      marginLeft: responsiveVal(2, 4),
      marginTop: 6,
    },
  }),
  { name: 'ProductListFiltersContainer' },
)

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useProductListFiltersStyles()
  const { scrollY } = useViewportScroll()
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const filtersOuterContainerRef = useRef<HTMLDivElement>(null)

  const scrollPosOnScroll = 110
  const scrollSpacing = 30
  const cssPropertyChangeSpacing = scrollPosOnScroll + scrollSpacing + 5

  const onCheckStickyChange = useCallback(
    (v: number) => {
      if (isSticky && v <= cssPropertyChangeSpacing) setIsSticky(false)
      if (!isSticky && v > cssPropertyChangeSpacing) setIsSticky(true)
    },
    [cssPropertyChangeSpacing, isSticky],
  )

  const onWindowResize = () => {
    // update the filter outer container height
    // reason: prevents layout shifting issues on scroll
    if (filtersOuterContainerRef.current) {
      filtersOuterContainerRef.current.style.height = 'unset'
      filtersOuterContainerRef.current.style.height = `${filtersOuterContainerRef.current.offsetHeight}px`
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    onWindowResize()

    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  useEffect(() => {
    // if (filtersOuterContainerRef.current) {
    //   //setScrollPosOnScroll(filtersOuterContainerRef.current.clientTop)
    // }

    // console.log(filtersOuterContainerRef.current?.clientTop)

    scrollY.onChange((verticalScroll: number) => {
      onCheckStickyChange(verticalScroll)
    })

    // make sure the animated state triggers on reload while scrolled down
    onCheckStickyChange(window.scrollY)
  }, [cssPropertyChangeSpacing, isSticky, onCheckStickyChange, scrollY])

  const filterAnimProgress = useTransform(
    scrollY,
    [scrollPosOnScroll + scrollSpacing, cssPropertyChangeSpacing + scrollSpacing],
    [0, 1],
  )

  return (
    <m.div
      layout='position'
      className={classes.filtersOuterContainer}
      ref={filtersOuterContainerRef}
    >
      <m.div style={{ opacity: filterAnimProgress }} className={classes.filterContainerComposite} />
      <m.div className={clsx(classes.filters, { [classes.filtersSticky]: isSticky })}>
        {children}
      </m.div>
    </m.div>
  )
}
