import { useFormState } from '@graphcommerce/ecommerce-ui'
import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import {
  Button,
  ErrorSnackbar,
  ErrorSnackbarProps,
  iconChevronRight,
  IconSvg,
  ListFormat,
  MessageSnackbar,
  MessageSnackbarProps,
  nonNullable,
  useLocale,
} from '@graphcommerce/next-ui'
import { Plural, Trans } from '@lingui/macro'
import { useMemo } from 'react'
import { findAddedItems } from './findAddedItems'
import { toUserErrors } from './toUserErrors'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type AddProductsToCartSnackbarProps = {
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
  disableSuccessSnackbar?: boolean
}

export function AddProductsToCartSnackbar(props: AddProductsToCartSnackbarProps) {
  const { errorSnackbar, successSnackbar, disableSuccessSnackbar } = props
  const { error, data, redirect, control, submittedVariables } = useFormAddProductsToCart()
  const formState = useFormState({ control })

  const locale = useLocale()
  const userErrors = toUserErrors(data)

  const showSuccess =
    !disableSuccessSnackbar &&
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
              <Trans>View shopping cart</Trans>
            </Button>
          }
        >
          <Plural
            value={addedItems.length}
            one={
              <Trans>
                <ListFormat listStyle='long' type='conjunction'>
                  {addedItems.map((item) => item?.itemInCart?.product.name).filter(nonNullable)}
                </ListFormat>{' '}
                has been added to your shopping cart
              </Trans>
            }
            two={
              <Trans>
                <ListFormat listStyle='long' type='conjunction'>
                  {addedItems.map((item) => item?.itemInCart?.product.name).filter(nonNullable)}
                </ListFormat>{' '}
                have been added to your shopping cart!
              </Trans>
            }
            other={<Trans># products have been added to your shopping cart!</Trans>}
          />
        </MessageSnackbar>
      )}
    </>
  )
}
