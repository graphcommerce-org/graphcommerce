import { ScrollerProvider } from '@graphcommerce/framer-scroller'
import { startTransition, useEffect, useState } from 'react'
import type { SetOptional } from 'type-fest'
import { variantsToScrollSnapType } from '../utils/variantsToScrollSnapType'
import { OverlayBase, LayoutOverlayBaseProps } from './OverlayBase'
import { OverlayContainer } from './OverlayContainer'

export type OverlayProps = Omit<
  SetOptional<LayoutOverlayBaseProps, 'variantSm' | 'variantMd'>,
  'direction' | 'offsetPageY' | 'isPresent'
>

/**
 * This is a very finicky component to use, please consider using the Overlay it's self.
 *
 * You almost never want to the contents of the overlay to be rendered on the server. In our case we
 * want to be able to render the navigation menu.
 */
export function OverlaySsr(props: OverlayProps) {
  const { variantSm = 'bottom', variantMd = 'right', active, ...otherProps } = props

  // todo: The overlay is always present in the DOM and the initial scroll position is set to 0.
  //       This means in this case that the overlay is visisble. LayoutOverlayBase sets the scroll position to 320 with JS.
  //       This would cause the overlay to be visisble for a moment before the scroll position is set.
  //       The solution is to set the the first scroll-snap-align and scroll-snap-stop to the open position of the overlay.
  //       However: We have control of the LayoutOverlayBase, we do not have control of all the child components so that solution will not work..
  const [hidden, setHidden] = useState(true)
  useEffect(() => startTransition(() => setHidden(false)), [])

  return (
    <OverlayContainer active={active} hidden={hidden}>
      <ScrollerProvider {...variantsToScrollSnapType(props)}>
        <OverlayBase
          disableInert
          variantMd={variantMd}
          variantSm={variantSm}
          active={active}
          isPresent={active}
          {...otherProps}
        />
      </ScrollerProvider>
    </OverlayContainer>
  )
}
