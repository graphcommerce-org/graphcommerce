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
import PageLink from 'next/link'
import { useFormAddProductsToCart } from './useFormAddProductsToCart'

export type AddProductsToCartSnackbarProps = {
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
}

export function AddProductsToCartSnackbar(props: AddProductsToCartSnackbarProps) {
  const { errorSnackbar, successSnackbar } = props
  const { formState, error, data, redirect } = useFormAddProductsToCart()

  const showSuccess =
    !formState.isSubmitting &&
    formState.isSubmitSuccessful &&
    !error?.message &&
    !data?.addProductsToCart?.user_errors?.length &&
    !redirect

  const items = filterNonNullableKeys(data?.addProductsToCart?.cart.items)

  return (
    <>
      <ApolloCartErrorSnackbar error={error} />

      <ErrorSnackbar
        variant='pill'
        severity='error'
        action={
          <Button size='medium' variant='pill' color='secondary'>
            <Trans id='Ok' />
          </Button>
        }
        {...errorSnackbar}
        open={(data?.addProductsToCart?.user_errors?.length ?? 0) > 0}
      >
        <>{data?.addProductsToCart?.user_errors?.map((e) => e?.message).join(', ')}</>
      </ErrorSnackbar>

      <MessageSnackbar
        variant='pill'
        {...successSnackbar}
        open={showSuccess}
        action={
          <PageLink href='/cart' passHref>
            <Button
              id='view-shopping-cart-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
              sx={{ display: 'flex' }}
            >
              <Trans id='View shopping cart' />
            </Button>
          </PageLink>
        }
      >
        <Trans
          id='<0>{name}</0> has been added to your shopping cart!'
          components={{ 0: <strong /> }}
          values={{ name: items[items.length - 1].product.name }}
        />
      </MessageSnackbar>
    </>
  )
}
