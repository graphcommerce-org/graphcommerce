import { HTMLMotionProps, m } from 'framer-motion'
import { ReactHTML } from 'react'

export type AnimatedRowProps = Omit<
  ReactHTML['div'] & HTMLMotionProps<'div'>,
  'layout' | 'initial' | 'animate' | 'exit' | 'transition'
>

export function AnimatedRow(props: AnimatedRowProps) {
  return (
    <m.div
      {...props}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'tween' }}
    />
  )
}
