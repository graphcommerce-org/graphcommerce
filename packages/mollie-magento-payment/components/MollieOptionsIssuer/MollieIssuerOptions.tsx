import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { FormRow, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { FormPersist, useFormCompose } from '@graphcommerce/react-hook-form'
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
            showValid
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
      <FormPersist
        // Since the issuer isn't retrievable from Magento we persist this value.
        form={form}
        name={`PaymentMethodOptions_${code}`}
        persist={['issuer']}
        storage='localStorage'
      />
    </>
  )
}
