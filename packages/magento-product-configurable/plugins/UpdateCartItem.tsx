import { useMutation } from "@graphcommerce/graphql"
import { useFormGqlMutationCart } from "@graphcommerce/magento-cart"
import { AddProductsToCartButton, useFormAddProductsToCart } from "@graphcommerce/magento-product/components"
import { ReactPlugin } from "@graphcommerce/next-config"
import { Button } from "@graphcommerce/next-ui"
import { Trans } from "@lingui/react"
import { useRouter } from "next/router"
import { UpdateCartItemDocument } from "../graphql/UpdateCartItem.gql"

export const component = 'AddProductsToCartButton'
export const exported = '@graphcommerce/magento-product'


export const Plugin: ReactPlugin<typeof AddProductsToCartButton> = (props) => {
  const { Prev, children, ...rest } = props
  const router = useRouter()
  const updateMode = Boolean(router.query.cartItemId)

  const form = useFormGqlMutationCart(UpdateCartItemDocument, {
    values: {
      cartItems: [
        {
          cart_item_uid: router.query.cartItemId?.toString(),
          configurable_options: rest.product.configurable_options
        }
      ]
    }
  })

  const submit = form.handleSubmit(() => { })
  console.log(router.query.cartItemId)

  if (updateMode) return (
    <Button {...rest} color='primary' variant="pill" onClick={submit}>
      <Trans id='Update' />
    </Button>
  )

  return (
    <Prev {...rest} >
      {children}
    </Prev>
  )
}
