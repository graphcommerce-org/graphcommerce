import { AddProductsToCartSnackbarMessage } from '@graphcommerce/magento-product'
import { Button, nonNullable } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import { OrderItemsFragment } from '../OrderItems/OrderItems.gql'
import { ReorderItemsDocument } from './ReorderItems.gql'

export type ReorderItemsProps = OrderItemsFragment & {
  orderNumber: string
}

export function ReorderItems(props: ReorderItemsProps) {
  const { orderNumber, items } = props

  const form = useFormGqlMutation(ReorderItemsDocument, {
    defaultValues: {
      orderNumber,
    },
  })

  const { formState, handleSubmit, error, data: cartData } = form

  const submitHandler = handleSubmit(() => {})

  const errors = cartData?.reorderItems?.userInputErrors
  const cart = cartData?.reorderItems?.cart

  if (!items) return null

  return (
    <Box component='form' onSubmit={submitHandler}>
      <Button variant='contained' color='primary' type='submit' loading={formState.isSubmitting}>
        <Trans>Reorder</Trans>
      </Button>

      <AddProductsToCartSnackbarMessage
        addedItems={items.map((item) => item?.product_name).filter(nonNullable)}
        error={error}
        userErrors={errors?.filter(nonNullable)}
        showSuccess={!!cart}
      />
    </Box>
  )
}
