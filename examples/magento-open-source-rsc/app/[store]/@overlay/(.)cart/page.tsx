'use client'

import {
  iconShoppingBag,
  IconSvg,
  LayoutTitle,
  Overlay,
  OverlayHeader,
  OverlayStickyBottom,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Button, Container, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

/**
 * Cart overlay page (intercepted route). Uses the Overlay component from @graphcommerce/next-ui for
 * consistent overlay behavior.
 */
export default function CartOverlay() {
  const router = useRouter()
  const params = useParams<{ store: string }>()
  const store = params.store
  const [active, setActive] = useState(true)

  const handleClose = useCallback(() => {
    setActive(false)
  }, [])

  const handleClosed = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Overlay
      active={active}
      onClosed={handleClosed}
      variantMd='right'
      variantSm='bottom'
      sizeMd='floating'
      sizeSm='full'
      justifyMd='start'
      widthMd='600px'
    >
      <OverlayHeader>
        <LayoutTitle size='small' icon={iconShoppingBag}>
          <Trans>Cart</Trans>
        </LayoutTitle>
      </OverlayHeader>

      <Container maxWidth='md' sx={{ py: 3 }}>
        {/* Empty cart state */}
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'center', py: 8 }}>
          <IconSvg
            src={iconShoppingBag}
            size='xxl'
            sx={{ display: 'block', mx: 'auto', mb: 2, color: 'text.disabled' }}
          />
          <Trans>Your cart is empty</Trans>
        </Typography>
      </Container>

      <OverlayStickyBottom>
        <Container maxWidth='md'>
          <Button variant='contained' color='primary' fullWidth size='large' onClick={handleClose}>
            <Trans>Continue Shopping</Trans>
          </Button>
        </Container>
      </OverlayStickyBottom>
    </Overlay>
  )
}
