import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { FormLayout, FormRow, InputCheckmark, UseFormLayoutProps } from '@graphcommerce/next-ui'
import {
  UseFormGqlMutationReturn,
  useFormCompose,
  useFormValidFields,
} from '@graphcommerce/react-hook-form'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextField } from '@mui/material'
import {
  PurchaseOrderOptionsDocument,
  PurchaseOrderOptionsMutation,
  PurchaseOrderOptionsMutationVariables,
} from './PurchaseOrderOptions.gql'

export function PurchaseOrderOptions(
  props: PaymentOptionsProps &
    UseFormLayoutProps<
      UseFormGqlMutationReturn<PurchaseOrderOptionsMutation, PurchaseOrderOptionsMutationVariables>
    >,
) {
  const { code, step, selectedPm, children } = props
  const poNumber = selectedPm?.purchase_order_number ?? undefined

  const form = useFormGqlMutationCart(PurchaseOrderOptionsDocument, {
    defaultValues: { code, poNumber },
  })
  const { handleSubmit, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })
  const valid = useFormValidFields(form, required)

  return (
    <form onSubmit={submit} noValidate>
      <FormLayout
        form={form}
        original={
          <FormRow>
            <TextField
              variant='outlined'
              type='text'
              error={formState.isSubmitted && !!formState.errors.poNumber}
              helperText={formState.isSubmitted && formState.errors.poNumber?.message}
              label='Purchase Order Nr.'
              required={required.poNumber}
              {...muiRegister('poNumber', { required: required.poNumber, minLength: 2 })}
              InputProps={{
                endAdornment: <InputCheckmark show={valid.poNumber} />,
              }}
            />
          </FormRow>
        }
      >
        {children}
      </FormLayout>
    </form>
  )
}
