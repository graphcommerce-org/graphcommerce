import { styled, SxProps, Theme } from '@mui/material'
import { HTMLMotionProps, m } from 'framer-motion'
import { ReactHTML } from 'react'

export type AnimatedRowProps = Omit<
  ReactHTML['div'] & HTMLMotionProps<'div'>,
  'layout' | 'initial' | 'animate' | 'exit' | 'transition'
> & { sx?: SxProps<Theme> }

const StyledDiv = styled(m.div)({})

export function AnimatedRow(props: AnimatedRowProps) {
  return (
    <StyledDiv
      {...props}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'tween' }}
    />
  )
}
