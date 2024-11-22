import { ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Portal } from '@mui/material'
import { AnimatePresence, usePresence } from 'framer-motion'
import type { SetOptional } from 'type-fest'
import { variantsToScrollSnapType } from '../utils/variantsToScrollSnapType'
import type { LayoutOverlayBaseProps } from './OverlayBase'
import { OverlayBase } from './OverlayBase'
import { OverlayContainer } from './OverlayContainer'

export type OverlayTmpProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'direction' | 'offsetPageY' | 'isPresent' | 'safeToRemove'
>

function OverlayUsePresence(props: OverlayTmpProps) {
  const { variantSm = 'bottom', variantMd = 'right', active, ...otherProps } = props
  const [isPresent, safeToRemove] = usePresence()

  return (
    <Portal>
      <OverlayContainer active={active}>
        <ScrollerProvider {...variantsToScrollSnapType(props)}>
          <OverlayBase
            active={active}
            variantMd={variantMd}
            variantSm={variantSm}
            isPresent={isPresent}
            safeToRemove={safeToRemove}
            {...otherProps}
          />
        </ScrollerProvider>
      </OverlayContainer>
    </Portal>
  )
}

export function Overlay(props: OverlayTmpProps) {
  const { active } = props
  return <AnimatePresence>{active && <OverlayUsePresence {...props} />}</AnimatePresence>
}
