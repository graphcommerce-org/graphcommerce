// eslint-disable-next-line import/no-extraneous-dependencies
import { AddProductsToCartSnackbarMessage } from '@graphcommerce/magento-product/components/AddProductsToCart/AddProductsToCartSnackbarMessage'
import { IconSvg, LinkOrButton, iconChevronRight, nonNullable } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import type { OrderItemsFragment } from '../OrderItems/OrderItems.gql'
import { ReorderItemsDocument } from './ReorderItems.gql'

export type ReorderItemsProps = { order: OrderItemsFragment }

export function ReorderItems(props: ReorderItemsProps) {
  const { order } = props

  const form = useFormGqlMutation(ReorderItemsDocument, {
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
