import { makeStyles } from '@material-ui/core'
import { m, MotionProps } from 'framer-motion'
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

export type SliderContainerProps = PropsWithChildren<MotionProps & UseStyles<typeof useStyles>>

/**
 * Simple wrapper div
 *
 * - Enables focus on the element (which allows for keyboard navigation)
 * - Registers the containerRef
 */
export default function SliderContainer(props: SliderContainerProps) {
  const { children, ...divProps } = props
  const classes = useStyles(props)
  const [{ containerRef }] = useSliderContext()

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <m.div ref={containerRef} className={classes.container} tabIndex={0} {...divProps}>
      {children}
    </m.div>
  )
}
