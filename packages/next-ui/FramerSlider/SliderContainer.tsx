import { makeStyles } from '@material-ui/core'
import { m } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  {
    container: {
      overflow: 'hidden',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  { name: 'SliderContainer' },
)

export type SliderContainerProps = PropsWithChildren<UseStyles<typeof useStyles>>

export default function SliderContainer(props: SliderContainerProps) {
  const { children } = props
  const classes = useStyles(props)
  const [state] = useSliderContext()

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <m.div layout ref={state.containerRef} className={classes.container} tabIndex={0}>
      {children}
    </m.div>
  )
}
