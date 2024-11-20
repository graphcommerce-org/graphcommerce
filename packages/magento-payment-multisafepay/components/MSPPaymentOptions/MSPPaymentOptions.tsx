import {
  useFormCompose,
  SelectElement,
  useFormAutoSubmit,
  FormPersist,
} from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import type { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { filterNonNullableKeys, FormRow } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { MSPPaymentOptionsDocument } from './MSPPaymentOptions.gql'

/** It sets the selected payment method on the cart. */
export function MSPPaymentOptions(props: PaymentOptionsProps) {
  const { code, step, multisafepay_available_issuers } = props

  const form = useFormGqlMutationCart(MSPPaymentOptionsDocument, { mode: 'onChange' })

  const { handleSubmit, register, control } = form

  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit, forceInitialSubmit: true })

  const key = `PaymentMethodOptions_${code}`
  useFormCompose({ form, step, submit, key })

  const issuers = filterNonNullableKeys(multisafepay_available_issuers, ['code', 'description'])

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} {...register('paymentMethod.code')} />

      {code === 'multisafepay_ideal' && issuers.length && (
        <FormRow>
          <SelectElement
            control={control}
            name='paymentMethod.multisafepay_ideal.issuer_id'
            required
            rules={{ required: { message: 'Please provide an issuer', value: true } }}
            variant='outlined'
            color='secondary'
            select
            label={i18n._(/* i18n */ 'Select your bank')}
            options={issuers.map(({ code: id, description: label }) => ({ id, label }))}
          />
        </FormRow>
      )}
      <FormPersist
        form={form}
        name={key}
        persist={['paymentMethod.multisafepay_ideal.issuer_id']}
        storage='localStorage'
      />
    </form>
  )
}
