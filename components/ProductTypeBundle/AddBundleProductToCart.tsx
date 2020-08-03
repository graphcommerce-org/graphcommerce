import { useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import {
  GQLAddBundleProductToCartMutationVariables,
  AddBundleProductToCartDocument,
} from 'generated/graphql'
import React, { useState } from 'react'
import { SetOptional } from 'type-fest'

type AddBundleProductToCartProps = Omit<
  SetOptional<GQLAddBundleProductToCartMutationVariables, 'bundleOptions'>,
  'cartId'
>

export default function AddBundleProductToCart(props: AddBundleProductToCartProps) {
  const { sku, customizableOptions, quantity, bundleOptions } = props

  const requestCartId = useRequestCartId()
  const [add] = useMutation(AddBundleProductToCartDocument)
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
