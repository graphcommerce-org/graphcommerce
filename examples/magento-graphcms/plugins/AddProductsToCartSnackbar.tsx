import { useFormState } from '@graphcommerce/ecommerce-ui'
import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { AddProductsToCartSnackbarProps } from '@graphcommerce/magento-product/components/AddProductsToCart/AddProductsToCartSnackbar'
import { toUserErrors } from '@graphcommerce/magento-product/components/AddProductsToCart/toUserErrors'
import {
  Button,
  ErrorSnackbar,
  filterNonNullableKeys,
  iconChevronRight,
  IconSvg,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'

export const config = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
}

export function AddProductsToCartSnackbar(props: AddProductsToCartSnackbarProps) {
  const { errorSnackbar, successSnackbar } = props
  const { error, data, redirect, control, submittedVariables } = useFormAddProductsToCart()
  const formState = useFormState({ control })
  const { locale } = useRouter()

  const formatter = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' })

  const userErrors = toUserErrors(data)

  const showSuccess =
    !formState.isSubmitting &&
    formState.isSubmitSuccessful &&
    !error?.message &&
    !userErrors.length &&
    !redirect

  const items = filterNonNullableKeys(data?.addProductsToCart?.cart.items)

  const productsAdded = items
    .filter((item) =>
      submittedVariables?.cartItems?.find((cartItem) => cartItem.sku === item.product.sku),
    )
    .map((product) => product.product.name || '')

  const showErrorSnackbar = userErrors.length > 0

  return (
    <>
      {error && <ApolloCartErrorSnackbar error={error} />}

      {showErrorSnackbar && (
        <ErrorSnackbar variant='pill' severity='error' {...errorSnackbar} open={showErrorSnackbar}>
          <>{data?.addProductsToCart?.user_errors?.map((e) => e?.message).join(', ')}</>
        </ErrorSnackbar>
      )}

      {showSuccess && (
        <MessageSnackbar
          variant='pill'
          severity='success'
          {...successSnackbar}
          open={showSuccess}
          action={
            <Button
              href='/cart'
              id='view-shopping-cart-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
              sx={{ display: 'flex' }}
            >
              <Trans id='View shopping cart' />
            </Button>
          }
        >
          <Trans
            id={
              productsAdded.length === 1
                ? '<0>{name}</0> has been added to your shopping cart! VERVANGEN'
                : '<0>{name}</0> have been added to your shopping cart! VERVANGENHOOR'
            }
            components={{ 0: <strong /> }}
            values={{
              name: formatter.format(productsAdded),
            }}
          />
        </MessageSnackbar>
      )}
    </>
  )
}
