import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import { useAddVirtualProductsToCartMutation } from 'generated/apollo'

type AddVirtualProductToCartProps = Omit<GQLAddVirtualProductsToCartMutationVariables, 'cartId'>

export default function AddVirtualProductToCart(props: AddVirtualProductToCartProps) {
  const { sku, customizableOptions, quantity } = props

  const requestCartId = useRequestCartId()
  const [add] = useAddVirtualProductsToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const addToCart = async () => {
    setLoading(true)
    await add({
      variables: {
        cartId: await requestCartId(),
        sku,
        quantity,
        customizableOptions,
      },
    })
    setLoading(false)
  }

  return (
    <Button color='primary' variant='contained' onClick={addToCart} disabled={loading}>
      Add to Cart
    </Button>
  )
}
