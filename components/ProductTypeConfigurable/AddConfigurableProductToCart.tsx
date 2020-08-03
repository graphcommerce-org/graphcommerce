import { useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import {
  GQLAddConfigurableProductToCartMutationVariables,
  AddConfigurableProductToCartDocument,
} from 'generated/graphql'
import React, { useState } from 'react'
import { SetOptional } from 'type-fest'

type AddConfigurableProductToCartProps = SetOptional<
  Omit<GQLAddConfigurableProductToCartMutationVariables, 'cartId'>,
  'variantSku'
>

export default function AddConfigurableProductToCart(props: AddConfigurableProductToCartProps) {
  const { parentSku, variantSku, customizableOptions, quantity } = props

  const requestCartId = useRequestCartId()
  const [add] = useMutation(AddConfigurableProductToCartDocument)
  const [loading, setLoading] = useState<boolean>(false)

  const addToCart = async () => {
    if (!variantSku) return
    setLoading(true)
    await add({
      variables: {
        cartId: await requestCartId(),
        parentSku,
        variantSku,
        customizableOptions,
        quantity,
      },
    })
    setLoading(false)
  }

  return (
    <Button
      color='primary'
      variant='contained'
      onClick={addToCart}
      disabled={loading || !variantSku}
    >
      {variantSku ? 'Add to Cart' : 'Select Options'}
    </Button>
  )
}
