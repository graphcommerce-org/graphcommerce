import { ScrollerProvider, ScrollSnapType } from '@graphcommerce/framer-scroller'
import React from 'react'
import { SetOptional } from 'type-fest'
import { SheetHandler, SheetHandlerProps } from './SheetHandler'
export type { SheetVariant } from './SheetHandler'

export type SheetProps = SetOptional<SheetHandlerProps, 'variantSm' | 'variantMd'>

export function Sheet(props: SheetProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', classes } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'both mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'both mandatory' : 'block proximity'

  return (
    <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
      <SheetHandler variantMd={variantMd} variantSm={variantSm} classes={classes}>
        {children}
      </SheetHandler>
    </ScrollerProvider>
  )
}
