import { usePageContext, useGo, useScrollOffset } from '@graphcommerce/framer-next-pages'
import { ScrollerProvider } from '@graphcommerce/framer-scroller'
import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { useEventCallback } from '@mui/material'
import { usePresence } from 'framer-motion'
import type { SetOptional } from 'type-fest'
import { OverlayBase, LayoutOverlayBaseProps } from '../../Overlay/components/OverlayBase'
import { variantsToScrollSnapType } from '../../Overlay/utils/variantsToScrollSnapType'

export type LayoutOverlayProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'active' | 'direction' | 'onClosed' | 'offsetPageY' | 'isPresent' | 'safeToRemove'
>

export function LayoutOverlay(props: LayoutOverlayProps) {
  const { children, variantSm = 'bottom', variantMd = 'right', ...otherProps } = props

  const { closeSteps, active, direction } = usePageContext()
  const onCloseHandler = useGo(closeSteps * -1)
  const offsetPageY = useMotionValueValue(useScrollOffset(), (v) => v)
  const [isPresent, safeToRemove] = usePresence()

  return (
    <ScrollerProvider {...variantsToScrollSnapType(props)} _inititalSnap={false}>
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
