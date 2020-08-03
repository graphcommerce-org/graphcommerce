import { useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import {
  AddVirtualProductsToCartDocument,
  GQLAddVirtualProductsToCartMutationVariables,
} from 'generated/graphql'
import React, { useState } from 'react'

type AddVirtualProductToCartProps = Omit<GQLAddVirtualProductsToCartMutationVariables, 'cartId'>

export default function AddVirtualProductToCart(props: AddVirtualProductToCartProps) {
  const { sku, customizableOptions, quantity } = props

  const requestCartId = useRequestCartId()
  const [add] = useMutation(AddVirtualProductsToCartDocument)
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
