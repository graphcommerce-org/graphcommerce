import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import clsx from 'clsx'
import { m, useViewportScroll, useTransform } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'

type ProductListFiltersContainerProps = React.PropsWithChildren<ReactNode>

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useCategoryPageStyles()
  const { scrollY } = useViewportScroll()
  const [isSticky, setIsSticky] = useState<boolean>(false)
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
    <m.div
      layout='position'
      className={classes.filtersOuterContainer}
      ref={(el) => {
        if (!el) return

        console.log(el.offsetTop)
        console.log(el.getBoundingClientRect().top) // prints 200px
      }}
    >
      <m.div style={{ opacity: filterAnimProgress }} className={classes.filterContainerComposite} />
      <m.div className={clsx(classes.filters, { [classes.filtersSticky]: isSticky })}>
        {children}
      </m.div>
    </m.div>
  )
}
