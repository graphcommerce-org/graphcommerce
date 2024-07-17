import { ApolloErrorSnackbar, CheckboxElement, SelectElement } from '@graphcommerce/ecommerce-ui'
import { StoreConfigFragment } from '@graphcommerce/magento-store/StoreConfigFragment.gql'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Alert, Box } from '@mui/material'
import {
  CancelOrderDocument,
  CancelOrderMutation,
  CancelOrderMutationVariables,
} from './CancelOrder.gql'

type CancelOrderFormProps = {
  orderId: string
  options: StoreConfigFragment['order_cancellation_reasons']
}

export function CancelOrderForm(props: CancelOrderFormProps) {
  const { orderId, options } = props

  const form = useFormGqlMutation<
    CancelOrderMutation,
    CancelOrderMutationVariables & { confirm: boolean }
  >(CancelOrderDocument, {
    defaultValues: {
      orderId: atob(orderId),
    },
  })

  const { control, formState, required, handleSubmit, error, data: cancelOrderData } = form

  const submitHandler = handleSubmit(() => {})

  const submittedWithoutErrors =
    formState.isSubmitSuccessful && !error && !cancelOrderData?.cancelOrder?.error

  return (
    <Box component='form' onSubmit={submitHandler} noValidate>
      <FormRow>
        <SelectElement
          control={control}
          name='reason'
          label={<Trans>Reason</Trans>}
          required={required.reason}
          disabled={formState.isSubmitting || submittedWithoutErrors}
          options={options.map((option) => ({
            id: option?.description ?? '',
            label: option?.description ?? '',
          }))}
        />
      </FormRow>

      <CheckboxElement
        required
        control={control}
        name='confirm'
        color='error'
        label={
          <Trans>I understand that my order will be canceled and this can not be undone.</Trans>
        }
      />

      {submittedWithoutErrors && (
        <Alert
          action={
            <Button variant='text' size='small' href={`/account/orders/view?orderId=${orderId}`}>
              <Trans>Back</Trans>
            </Button>
          }
        >
          <Trans>Order has successfully been canceled</Trans>
        </Alert>
      )}

      {cancelOrderData?.cancelOrder?.error && (
        <Alert severity='error'>{cancelOrderData?.cancelOrder?.error}</Alert>
      )}

      <ApolloErrorSnackbar error={error} />

      <FormActions>
        <Button
          type='submit'
          variant='pill'
          color='error'
          loading={formState.isSubmitting}
          disabled={submittedWithoutErrors}
          size='large'
          sx={{ color: 'white', bgcolor: 'error.main' }}
        >
          <Trans>Cancel order</Trans>
        </Button>
      </FormActions>
    </Box>
  )
}
