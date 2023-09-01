import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ProductPageAddToCartRow, StickyAddToCart } from '../../components'

export const component = 'ProductPageAddToCartActionsRow'
export const exported =
  '@graphcommerce/magento-product/components/ProductPage/ProductPageAddToCartRow'
export const ifConfig: IfConfig = 'enableStickyAddToCart'

type PluginType = ReactPlugin<typeof ProductPageAddToCartRow>

const StickyProductPageAddToCartRow: PluginType = (props) => {
  const { Prev, children, product, ...rest } = props

  const cartButtonRef = useRef<HTMLElement | null>(null)
  const [target, setTarget] = useState<HTMLElement | null>(null)

  const stickyAddToCart = <StickyAddToCart product={product} cartButtonRef={cartButtonRef} />

  useEffect(() => {
    const stickyTarget = globalThis?.document?.getElementById('StickyAddToCartDestination')
    if (stickyTarget) {
      setTarget(stickyTarget)
    }
  }, [])

  return (
    <>
      {target && createPortal(stickyAddToCart, target)}
      <Box ref={cartButtonRef}>
        <Prev product={product} {...rest}>
          {children}
        </Prev>
      </Box>
    </>
  )
}

export const Plugin = StickyProductPageAddToCartRow
