import { usePageContext, useGo, useScrollOffset } from '@graphcommerce/framer-next-pages'
import { ScrollerProvider, ScrollSnapType } from '@graphcommerce/framer-scroller'
import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { useEventCallback } from '@mui/material'
import { usePresence } from 'framer-motion'
import type { SetOptional } from 'type-fest'
import { OverlayBase, LayoutOverlayBaseProps } from '../../Overlay/components/OverlayBase'

export type LayoutOverlayProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'active' | 'direction' | 'onClosed' | 'offsetPageY' | 'isPresent' | 'safeToRemove'
>

export function LayoutOverlay(props: LayoutOverlayProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', ...otherProps } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'inline mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'inline mandatory' : 'block proximity'

  const { closeSteps, active, direction } = usePageContext()
  const onCloseHandler = useGo(closeSteps * -1)
  const offsetPageY = useMotionValueValue(useScrollOffset(), (v) => v)
  const [isPresent, safeToRemove] = usePresence()

  return (
    <ScrollerProvider
      scrollSnapTypeSm={scrollSnapTypeSm}
      scrollSnapTypeMd={scrollSnapTypeMd}
      _inititalSnap={false}
    >
      <OverlayBase
        active={active}
        direction={direction}
        onClosed={useEventCallback(() => isPresent && onCloseHandler())}
        offsetPageY={offsetPageY}
        variantMd={variantMd}
        variantSm={variantSm}
        isPresent={isPresent}
        safeToRemove={safeToRemove}
        {...otherProps}
      >
        {children}
      </OverlayBase>
    </ScrollerProvider>
  )
}
