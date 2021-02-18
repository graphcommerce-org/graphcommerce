import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  { sliderContainer: { overflow: 'hidden' } },
  { name: 'SliderContainer' },
)

export type SliderContainerStyles = UseStyles<typeof useStyles>

export type SliderContainerProps = PropsWithChildren<{
  containerRef: React.RefObject<HTMLDivElement>

  className?: string
}>

export default function SliderContainer(props: SliderContainerProps) {
  const { containerRef, children, className } = props
  const classes = useStyles(props)

  return (
    <m.div ref={containerRef} className={clsx(classes.sliderContainer, className)}>
      {children}
    </m.div>
  )
}
