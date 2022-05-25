import { usePageContext, useGo, useScrollOffset } from '@graphcommerce/framer-next-pages'
import { ScrollerProvider, ScrollSnapType } from '@graphcommerce/framer-scroller'
import { usePresence } from 'framer-motion'
import type { SetOptional } from 'type-fest'
import { LayoutOverlayBase, LayoutOverlayBaseProps } from './LayoutOverlayBase'

export type { LayoutOverlayVariant } from './LayoutOverlayBase'

export type LayoutOverlayProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'active' | 'direction' | 'close' | 'offsetPageY' | 'isPresent' | 'safeToRemove'
>

export function LayoutOverlay(props: LayoutOverlayProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', ...otherProps } = props

  const scrollSnapTypeSm: ScrollSnapType =
    variantSm === 'left' || variantSm === 'right' ? 'inline mandatory' : 'block proximity'
  const scrollSnapTypeMd: ScrollSnapType =
    variantMd === 'left' || variantMd === 'right' ? 'inline mandatory' : 'block proximity'

  const { closeSteps, active, direction } = usePageContext()
  const close = useGo(closeSteps * -1)
  const offsetPageY = useScrollOffset().y
  const [isPresent, safeToRemove] = usePresence()

  return (
    <ScrollerProvider scrollSnapTypeSm={scrollSnapTypeSm} scrollSnapTypeMd={scrollSnapTypeMd}>
      <LayoutOverlayBase
        active={active}
        direction={direction}
        close={close}
        offsetPageY={offsetPageY}
        variantMd={variantMd}
        variantSm={variantSm}
        isPresent={isPresent}
        safeToRemove={safeToRemove}
        {...otherProps}
      >
        {children}
      </LayoutOverlayBase>
    </ScrollerProvider>
  )
}
