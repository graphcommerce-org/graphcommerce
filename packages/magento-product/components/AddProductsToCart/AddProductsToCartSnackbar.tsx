import { useFormState } from '@graphcommerce/ecommerce-ui'
import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import {
  Button,
  ErrorSnackbar,
  ErrorSnackbarProps,
  filterNonNullableKeys,
  iconChevronRight,
  IconSvg,
  MessageSnackbar,
  MessageSnackbarProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { toUserErrors } from './toUserErrors'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type AddProductsToCartSnackbarProps = {
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
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
    .filter(
      (item) =>
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

      {showSuccess && !disableSuccessSnackbar && (
        <MessageSnackbar
          variant='pill'
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
                ? '<0>{name}</0> has been added to your shopping cart!'
                : '<0>{name}</0> have been added to your shopping cart!'
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
