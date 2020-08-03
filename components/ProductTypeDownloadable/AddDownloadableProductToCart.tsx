import { useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import useRequestCartId from 'components/CartId/useRequestCartId'
import {
  GQLAddDownloadableProductToCartMutationVariables,
  AddDownloadableProductToCartDocument,
} from 'generated/graphql'
import React, { useState } from 'react'

type AddSimpleProductToCartProps = Omit<GQLAddDownloadableProductToCartMutationVariables, 'cartId'>

export default function AddDownloadableProductToCart(props: AddSimpleProductToCartProps) {
  const { sku, customizableOptions, quantity, downloadableProductLinks } = props

  const requestCartId = useRequestCartId()
  const [add] = useMutation(AddDownloadableProductToCartDocument)
  const [loading, setLoading] = useState<boolean>(false)

  const addToCart = async () => {
    setLoading(true)
    await add({
      variables: {
        cartId: await requestCartId(),
        sku,
        quantity,
        customizableOptions,
        downloadableProductLinks,
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
