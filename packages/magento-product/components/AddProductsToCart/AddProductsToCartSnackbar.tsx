import { useFormState } from '@graphcommerce/ecommerce-ui'
import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import {
  Button,
  ErrorSnackbar,
  ErrorSnackbarProps,
  iconChevronRight,
  IconSvg,
  MessageSnackbar,
  MessageSnackbarProps,
  nonNullable,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { findAddedItems } from './findAddedItems'
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

  const addedItems = useMemo(
    () => findAddedItems(data, submittedVariables),
    [data, submittedVariables],
  )

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
              addedItems.length === 1
                ? '<0>{name}</0> has been added to your shopping cart!'
                : '<0>{name}</0> have been added to your shopping cart!'
            }
            components={{ 0: <strong /> }}
            values={{
              name: formatter.format(
                addedItems.map((item) => item.cartItem?.product.name).filter(nonNullable),
              ),
            }}
          />
        </MessageSnackbar>
      )}
    </>
  )
}
