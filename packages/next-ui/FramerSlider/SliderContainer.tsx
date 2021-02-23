import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles({ container: { overflow: 'hidden' } }, { name: 'SliderContainer' })

export type SliderContainerStyles = UseStyles<typeof useStyles>

export type SliderContainerProps = PropsWithChildren<{
  className?: string

  scope: string
}>

export default function SliderContainer(props: SliderContainerProps) {
  const { children, className, scope } = props
  const classes = useStyles(props)
  const [state] = useSliderContext(scope)

  return (
    <m.div layout ref={state.containerRef} className={clsx(classes.container, className)}>
      {children}
    </m.div>
  )
}
