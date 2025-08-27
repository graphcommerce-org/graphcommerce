// eslint-disable-next-line import/no-extraneous-dependencies
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { AddProductsToCartSnackbarMessage } from '@graphcommerce/magento-product/components/AddProductsToCart/AddProductsToCartSnackbarMessage'
import { iconChevronRight, IconSvg, LinkOrButton, nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box } from '@mui/material'
import type { OrderItemsFragment } from '../Order'
import type { ReorderItemsMutation, ReorderItemsMutationVariables } from './ReorderItems.gql'
import { ReorderItemsDocument } from './ReorderItems.gql'

export type ReorderItemsProps = { order: OrderItemsFragment }

export function ReorderItems(props: ReorderItemsProps) {
  const { order } = props

  const form = useFormGqlMutationCart<
    ReorderItemsMutation,
    ReorderItemsMutationVariables & { cartId: string }
  >(ReorderItemsDocument, {
    defaultValues: { orderNumber: order.number },
  })
  const { formState, handleSubmit, error, data: cartData } = form
  const submitHandler = handleSubmit(() => {})

  const errors = cartData?.reorderItems?.userInputErrors
  const cart = cartData?.reorderItems?.cart

  if (!order.items) return null

  return (
    <Box component='form' onSubmit={submitHandler}>
      <LinkOrButton
        color='secondary'
        button={{ variant: 'pill', sx: { whiteSpace: 'nowrap' } }}
        link={{ whiteSpace: 'nowrap' }}
        type='submit'
        loading={formState.isSubmitting}
        endIcon={<IconSvg src={iconChevronRight} />}
      >
        <Trans>Reorder</Trans>
      </LinkOrButton>

      <AddProductsToCartSnackbarMessage
        addedItems={order.items.map((item) => item?.product_name).filter(nonNullable)}
        error={error}
        userErrors={errors?.filter(nonNullable)}
        showSuccess={!!cart}
      />
    </Box>
  )
}
