import { ScrollerProvider, ScrollSnapType } from '@graphcommerce/framer-scroller'
import { Box } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { SetOptional } from 'type-fest'
import { LayoutOverlayBase, LayoutOverlayBaseProps } from './LayoutOverlayBase'

export type OverlayProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'direction' | 'offsetPageY' | 'isPresent' | 'safeToRemove'
>

export function Overlay(props: OverlayProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', active, ...otherProps } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'inline mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'inline mandatory' : 'block proximity'

  return (
    <Box
      className='Overlay'
      // hidden={!active}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        // left: active ? 0 : '-120vw',
        pointerEvents: active ? undefined : 'none',
        right: 0,
        bottom: 0,
        zIndex: 'drawer',
      }}
    >
      <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
        <LayoutOverlayBase
          offsetPageY={0}
          variantMd={variantMd}
          variantSm={variantSm}
          direction={1}
          active={active}
          isPresent={active}
          safeToRemove={undefined}
          {...otherProps}
        >
          {children}
        </LayoutOverlayBase>
      </ScrollerProvider>
    </Box>
  )
}
