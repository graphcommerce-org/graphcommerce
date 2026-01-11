'use client'

import { Overlay } from '@graphcommerce/next-ui'
import type { LayoutOverlayProps } from '@graphcommerce/next-ui'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export type LayoutOverlayRscProps = Omit<
  LayoutOverlayProps,
  'active' | 'direction' | 'onClosed' | 'offsetPageY' | 'isPresent' | 'safeToRemove'
> & {
  /** URL to navigate to when overlay is closed. Defaults to going back in history. */
  closeHref?: string
}

/**
 * RSC-compatible LayoutOverlay component. Uses `Overlay` from @graphcommerce/next-ui directly
 * instead of `LayoutOverlay` which depends on framer-next-pages hooks.
 *
 * In App Router, overlays are rendered as parallel routes or intercepted routes. When closed, they
 * navigate back or to a specified URL.
 */
export function LayoutOverlayRsc(props: LayoutOverlayRscProps) {
  const { children, closeHref, variantSm = 'bottom', variantMd = 'right', ...otherProps } = props
  const router = useRouter()
  const [active, setActive] = useState(true)

  const handleClosed = useCallback(() => {
    if (closeHref) {
      router.push(closeHref)
    } else {
      router.back()
    }
  }, [router, closeHref])

  const handleClose = useCallback(() => {
    setActive(false)
  }, [])

  return (
    <Overlay
      active={active}
      onClosed={handleClosed}
      variantSm={variantSm}
      variantMd={variantMd}
      {...otherProps}
    >
      {children}
    </Overlay>
  )
}
