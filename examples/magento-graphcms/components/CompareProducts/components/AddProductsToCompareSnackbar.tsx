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
import { useAddProductsToCompare } from '../hooks/useAddProductsToCompare'

export type AddProductsToCompareSnackbarProps = {
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
}

export function AddProductsToCompareSnackbar(props: AddProductsToCompareSnackbarProps) {
  const { successSnackbar } = props
  const { error, data, control } = useAddProductsToCompare().form
  const formState = useFormState({ control })

  const showSuccess = !formState.isSubmitting && formState.isSubmitSuccessful && !error?.message

  const items = filterNonNullableKeys(data?.addProductsToCompareList?.items)

  return (
    <>
      {error && <ApolloCartErrorSnackbar error={error} />}
      {showSuccess && (
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
              <Trans id='View compare' />
            </Button>
          }
        >
          <Trans
            id='<0>{name}</0> has been added to your compare cart!'
            components={{ 0: <strong /> }}
            values={{ name: items[items.length - 1]?.product.name }}
          />
        </MessageSnackbar>
      )}
    </>
  )
}
