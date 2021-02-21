import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles({ container: { overflow: 'hidden' } }, { name: 'SliderContainer' })

export type SliderContainerStyles = UseStyles<typeof useStyles>

export type SliderContainerProps = PropsWithChildren<{
  containerRef: React.RefObject<HTMLDivElement>

  className?: string

  scope: string
}>

export default function SliderContainer(props: SliderContainerProps) {
  const { containerRef, children, className, scope } = props
  const classes = useStyles(props)

  return (
    <m.div layout ref={containerRef} className={clsx(classes.container, className)}>
      {children}
    </m.div>
  )
}
