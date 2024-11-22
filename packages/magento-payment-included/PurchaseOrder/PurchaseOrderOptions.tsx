import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import type { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { FormRow } from '@graphcommerce/next-ui'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { PurchaseOrderOptionsDocument } from './PurchaseOrderOptions.gql'

export function PurchaseOrderOptions(props: PaymentOptionsProps) {
  const { code, step, selectedPm } = props
  const poNumber = selectedPm?.purchase_order_number ?? undefined

  const form = useFormGqlMutationCart(PurchaseOrderOptionsDocument, {
    defaultValues: { code, poNumber },
  })
  const { handleSubmit, control, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <form onSubmit={submit} noValidate>
      <FormRow>
        <TextFieldElement
          control={control}
          name='poNumber'
          variant='outlined'
          type='text'
          error={formState.isSubmitted && !!formState.errors.poNumber}
          helperText={formState.isSubmitted && formState.errors.poNumber?.message}
          label='Purchase Order Nr.'
          required={required.poNumber}
          rules={{ minLength: 2 }}
          showValid
        />
      </FormRow>
    </form>
  )
}
