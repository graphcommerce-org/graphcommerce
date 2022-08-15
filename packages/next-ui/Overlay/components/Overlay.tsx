import { ScrollerProvider, ScrollSnapType } from '@graphcommerce/framer-scroller'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import type { SetOptional } from 'type-fest'
import { OverlayBase, LayoutOverlayBaseProps } from './OverlayBase'

export type OverlayProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'direction' | 'offsetPageY' | 'isPresent'
>

export function Overlay(props: OverlayProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', active, ...otherProps } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'inline mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'inline mandatory' : 'block proximity'

  // todo: The overlay is always present in the DOM and the initial scroll position is set to 0.
  //       This means in this case that the overlay is visisble. LayoutOverlayBase sets the scroll position to 320 with JS.
  //       This would cause the overlay to be visisble for a moment before the scroll position is set.
  //       The solution is to set the the first scroll-snap-align and scroll-snap-stop to the open position of the overlay.
  //       However: We have control of the LayoutOverlayBase, we do not have control of all the child components so that solution will not work..
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  return (
    <Box
      className='Overlay'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: loaded ? undefined : 'translateX(-200vw)',
        pointerEvents: active ? undefined : 'none',
        right: 0,
        bottom: 0,
        zIndex: 'drawer',
        '& .LayoutOverlayBase-overlayPane': {
          boxShadow: active ? undefined : 0,
        },
      }}
    >
      <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
        <OverlayBase
          offsetPageY={0}
          variantMd={variantMd}
          variantSm={variantSm}
          direction={1}
          active={active}
          isPresent={active}
          {...otherProps}
        >
          {children}
        </OverlayBase>
      </ScrollerProvider>
    </Box>
  )
}
