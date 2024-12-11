import { Box, useForkRef } from '@mui/material'
import type { BoxProps } from '@mui/material/Box'
import clsx from 'clsx'
import { px } from 'framer-motion'
import React, { useRef } from 'react'
import type { StickyStackConfig } from '../hooks/useStickyTop'
import { useStickyTop } from '../hooks/useStickyTop'
import { numberToPx } from '../utils/numberToPx'

export const StickyBox = React.forwardRef<
  HTMLDivElement,
  BoxProps & {
    stickyConfig: Omit<StickyStackConfig<HTMLDivElement>, 'ref'>
  }
>((props, forwardedRef) => {
  const { sx, children, className, stickyConfig, ...rest } = props
  const ref = useRef<HTMLDivElement>(null)
  const forkedRef = useForkRef(forwardedRef, ref)
  const top = useStickyTop({ ref, ...stickyConfig })

  return (
    <Box
      ref={forkedRef}
      style={{ '--top': px.transform(top) }}
      sx={[
        { '&.sticky': { position: 'sticky', top: 'var(--top, 0px)' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={clsx(className, stickyConfig.sticky && 'sticky')}
      {...rest}
    >
      {children}
    </Box>
  )
})
