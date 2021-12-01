import { ScrollerProvider, ScrollSnapType } from '@graphcommerce/framer-scroller'
import React from 'react'
import { SetOptional } from 'type-fest'
import { LayoutOverlayBase, LayoutOverlayBaseProps } from './LayoutOverlayBase'

export type { OverlayVariant } from './LayoutOverlayBase'

export type LayoutOverlayProps = SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>

export function LayoutOverlay(props: LayoutOverlayProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', classes } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'both mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'both mandatory' : 'block proximity'

  return (
    <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
      <LayoutOverlayBase variantMd={variantMd} variantSm={variantSm} classes={classes}>
        {children}
      </LayoutOverlayBase>
    </ScrollerProvider>
  )
}
