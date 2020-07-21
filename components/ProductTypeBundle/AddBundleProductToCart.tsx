import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import { useAddBundleProductToCartMutation } from 'generated/apollo'
import { SetOptional } from 'type-fest'

type AddBundleProductToCartProps = Omit<
  SetOptional<GQLAddBundleProductToCartMutationVariables, 'bundleOptions'>,
  'cartId'
>

export default function AddBundleProductToCart(props: AddBundleProductToCartProps) {
  const { sku, customizableOptions, quantity, bundleOptions } = props

  const requestCartId = useRequestCartId()
  const [add] = useAddBundleProductToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const addToCart = async () => {
    if (!bundleOptions) return
    setLoading(true)
    await add({
      variables: {
        cartId: await requestCartId(),
        sku,
        quantity,
        customizableOptions,
        bundleOptions,
      },
    })
    setLoading(false)
  }

  return (
    <Button color='primary' variant='contained' onClick={addToCart} disabled={loading}>
      {bundleOptions ? 'Select Options' : 'Add to Cart'}
    </Button>
  )
}
