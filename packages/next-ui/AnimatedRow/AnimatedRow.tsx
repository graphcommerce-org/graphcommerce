import { styled, SxProps, Theme } from '@mui/material/styles'
import { HTMLMotionProps, m } from 'framer-motion'
import { ReactHTML } from 'react'

export type AnimatedRowProps = Omit<
  ReactHTML['div'] & HTMLMotionProps<'div'>,
  'initial' | 'animate' | 'exit' | 'transition'
> & { sx?: SxProps<Theme> }

const StyledDiv = styled(m.div)({})

/** @deprecated Should be replaced with Box component */
export function AnimatedRow(props: AnimatedRowProps) {
  return (
    <StyledDiv
      {...props}
      initial={{ opacity: 0, height: 'auto' }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'tween' }}
    />
  )
}
