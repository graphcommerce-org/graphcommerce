import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import useCartId from 'components/Cart/useCartId'
import { useAddConfigurableProductToCartMutation } from 'generated/apollo'
import { SetOptional } from 'type-fest'
import { useTranslation } from 'components/withi18n/i18n'

type AddConfigurableProductToCartProps = SetOptional<
  Omit<GQLAddConfigurableProductToCartMutationVariables, 'cartId'>,
  'variantSku'
>

export default function AddConfigurableProductToCart(props: AddConfigurableProductToCartProps) {
  const { parentSku, variantSku, customizableOptions, quantity } = props

  const [t] = useTranslation('common')

  const { requestCartId: requestCart } = useCartId()
  const [add] = useAddConfigurableProductToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)

  const addToCart = async () => {
    if (!variantSku) return
    setLoading(true)
    await add({
      variables: {
        cartId: await requestCart(),
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
      {variantSku ? t('add-to-cart') : t('select-options')}
    </Button>
  )
}
