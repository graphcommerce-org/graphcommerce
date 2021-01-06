import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import clsx from 'clsx'
import { m, useViewportScroll, useTransform } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

type ProductListFiltersContainerProps = React.PropsWithChildren<ReactNode>

export default function ProductListFiltersContainer(props: ProductListFiltersContainerProps) {
  const { children } = props

  const classes = useCategoryPageStyles()
  const { scrollY } = useViewportScroll()
  const [isSticky, setIsSticky] = useState<boolean>(false)

  const scrollPosOnScroll = 95
  const scrollSpacing = 30
  const cssPropertyChangeSpacing = scrollPosOnScroll + scrollSpacing + 5

  useEffect(
    () =>
      scrollY.onChange((v) => {
        if (isSticky && v <= scrollPosOnScroll) setIsSticky(false)
        if (!isSticky && v > scrollPosOnScroll) setIsSticky(true)
      }),
    [isSticky, scrollY],
  )

  const filterAnimProgress = useTransform(
    scrollY,
    [scrollPosOnScroll + scrollSpacing, cssPropertyChangeSpacing + scrollSpacing],
    [0, 1],
  )

  return (
    <m.div className={classes.filtersOuterContainer} layout='position'>
      <m.div style={{ opacity: filterAnimProgress }} className={classes.filterContainerComposite} />
      <m.div className={clsx(classes.filters, { [classes.filtersSticky]: isSticky })}>
        {children}
      </m.div>
    </m.div>
  )
}
