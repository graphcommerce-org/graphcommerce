import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import useCartId from 'components/Cart/useCartId'
import { useAddSimpleProductToCartMutation } from 'generated/apollo'

export default function AddToCart({ sku }: GQLAddToCartSimpleFragment) {
  const { requestCartId: requestCart } = useCartId()
  const [request] = useAddSimpleProductToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const addToCart = async () => {
    setLoading(true)
    await request({ variables: { cartId: await requestCart(), sku, quantity: 1 } })
    setLoading(false)
  }

  return (
    <Button color='primary' variant='contained' onClick={addToCart} disabled={loading}>
      Add to Cart
    </Button>
  )
}
