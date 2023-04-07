import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { FormRow, InputCheckmark, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useFormCompose, useFormPersist, useFormValidFields } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { SetMolliePaymentMethodIssuerOnCartDocument } from './SetMolliePaymentMethodIssuerOnCart.gql'

type MollieIssuerOptionsProps = PaymentOptionsProps & {
  label: string
  children?: React.ReactNode
}

export function MollieIssuerOptions(props: MollieIssuerOptionsProps) {
  const { mollie_available_issuers = [], children } = props
  const { code, step, label } = props

  const form = useFormGqlMutationCart(SetMolliePaymentMethodIssuerOnCartDocument, {
    defaultValues: { code },
  })

  const { handleSubmit, formState, required, control } = form
  const submit = handleSubmit(() => {})
  const valid = useFormValidFields(form, required)

  // Since the issuer isn't retrievable from Magento we persist this value.
  useFormPersist({
    form,
    name: `PaymentMethodOptions_${code}`,
    persist: ['issuer'],
    storage: 'localStorage',
  })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <>
      <form onSubmit={submit} noValidate>
        <FormRow>
          <SelectElement
            control={control}
            name='issuer'
            SelectProps={{ native: true, displayEmpty: true }}
            variant='outlined'
            helperText={formState.isSubmitted && formState.errors.issuer?.message}
            label={label}
            required={required.issuer}
            InputProps={{
              endAdornment: <InputCheckmark show={valid.issuer} select />,
            }}
            options={filterNonNullableKeys(mollie_available_issuers, ['code', 'name']).map(
              (option) => ({
                id: option.code,
                label: option.name,
              }),
            )}
          />
        </FormRow>
      </form>
      {children}
    </>
  )
}
