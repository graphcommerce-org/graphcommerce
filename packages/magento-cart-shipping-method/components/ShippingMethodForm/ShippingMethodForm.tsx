import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { Form } from '@graphcommerce/next-ui'
import { ActionCardListForm } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { useFormCompose, UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { ShippingOptionsActionCard } from '../ShippingOptionsActionCard/ShippingOptionsActionCard'
import { GetShippingMethodsDocument } from './GetShippingMethods.gql'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

export type ShippingMethodFormProps = Pick<UseFormComposeOptions, 'step'>

export function ShippingMethodForm(props: ShippingMethodFormProps) {
  const { step } = props
  const { data: cartQuery } = useCartQuery(GetShippingMethodsDocument)
  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const available = currentAddress?.available_shipping_methods
  const selected = currentAddress?.selected_shipping_method
  const carrier = selected?.carrier_code ?? available?.[0]?.carrier_code
  const method = selected?.method_code ?? available?.[0]?.method_code ?? undefined
  const carrierMethod = `${carrier}-${method}`

  const sortedAvailableShippingMethods = [
    ...(currentAddress?.available_shipping_methods ?? []),
    // eslint-disable-next-line no-nested-ternary
  ].sort((a, b) => (a === b ? 0 : a ? -1 : 1))

  const form = useFormGqlMutationCart<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >(ShippingMethodFormDocument, {
    defaultValues: { carrierMethod, carrier, method },
  })

  const { handleSubmit, control, setValue, error } = form
  const submit = handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: 'ShippingMethodForm' })

  return (
    <Form onSubmit={submit} noValidate>
      <ActionCardListForm
        control={control}
        name='carrierMethod'
        errorMessage='Please select a shipping address'
        items={[
          ...(sortedAvailableShippingMethods ?? []).filter(Boolean).map((sortedMethod) => ({
            value: `${sortedMethod?.carrier_code}-${sortedMethod?.method_code ?? undefined}` ?? '',
            amount: sortedMethod?.amount ?? { currency: 'USD', value: 0 },
            available: sortedMethod?.available ?? false,
            carrier_code: sortedMethod?.carrier_code ?? '',
            carrier_title: sortedMethod?.carrier_title ?? '',
            method_code: sortedMethod?.method_code ?? '',
            error_message: sortedMethod?.error_message ?? '',
            method_title: sortedMethod?.method_title ?? '',
            setValue,
          })),
        ]}
        render={ShippingOptionsActionCard}
      />
      <ApolloCartErrorAlert error={error} />
    </Form>
  )
}
