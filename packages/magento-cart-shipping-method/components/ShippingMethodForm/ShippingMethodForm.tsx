import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { Money, MoneyProps } from '@graphcommerce/magento-store'
import { Form, FormHeader } from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardItemRenderer,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import {
  useFormCompose,
  UseFormComposeOptions,
  useFormPersist,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Typography } from '@mui/material'
import { useEffect, useMemo, VFC } from 'react'
import { GetShippingMethodsDocument } from './GetShippingMethods.gql'
import { ShippingMethodActionCard } from './ShippingMethodActionCard'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

export type ShippingMethodFormProps = Pick<UseFormComposeOptions, 'step'>

function ShippingMethodDetails(props: {
  available: boolean | null | undefined
  price: MoneyProps | null | undefined
  errorMessage: string | null | undefined
}) {
  const { available, price, errorMessage } = props
  const isFree = price && price.value === 0
  const amount = !isFree ? <Money {...price} /> : 'Free'
  const amountColor = !isFree ? 'text.primary' : '#05C642'
  return (
    <Typography
      variant={available ? 'h5' : 'body1'}
      sx={{ display: 'flex', justifyContent: available ? 'flex-end' : 'flex-start' }}
      color={!available ? undefined : amountColor}
    >
      {available ? amount : errorMessage}
    </Typography>
  )
}

export function ShippingMethodForm(props: ShippingMethodFormProps) {
  const { step } = props
  const { data: cartQuery, loading } = useCartQuery(GetShippingMethodsDocument)
  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const available = currentAddress?.available_shipping_methods
  const selected = currentAddress?.selected_shipping_method
  const carrier = selected?.carrier_code ?? available?.[0]?.carrier_code
  const method = selected?.method_code ?? available?.[0]?.method_code ?? undefined
  const carrierMethod = `${carrier}-${method}`

  const sortedAvailableShippingMethods = useMemo(
    () =>
      [
        ...(currentAddress?.available_shipping_methods ?? []),
        // eslint-disable-next-line no-nested-ternary
      ].sort((a, b) => (a === b ? 0 : a ? -1 : 1)),
    [currentAddress?.available_shipping_methods],
  )

  const form = useFormGqlMutationCart<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >(ShippingMethodFormDocument, {
    defaultValues: { carrierMethod, carrier, method },
    onBeforeSubmit: (variables) => {
      const splitCarrierMethod = variables?.carrierMethod?.split('-')
      return {
        ...variables,
        carrier: splitCarrierMethod?.[0] ?? available?.[0]?.carrier_code ?? '',
        method: splitCarrierMethod?.[1] ?? available?.[0]?.method_code ?? '',
      }
    },
  })

  const { handleSubmit, control, error, setValue } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: 'ShippingMethodForm' })
  useFormCompose({ form, step, submit, key: 'ShippingMethodForm' })

  useEffect(() => {
    const availableMethods = sortedAvailableShippingMethods.filter((m) => m?.available)
    if (availableMethods.length === 1) {
      setValue(
        'carrierMethod',
        `${availableMethods[0]?.carrier_code}-${availableMethods[0]?.method_code}`,
      )
    }
  }, [
    carrier,
    method,
    selected?.carrier_code,
    selected?.method_code,
    setValue,
    sortedAvailableShippingMethods,
  ])

  return (
    <>
      {!loading && sortedAvailableShippingMethods.length > 0 && (
        <FormHeader variant='h5' sx={{ marginBottom: 0 }}>
          <Trans id='Shipping method' />
        </FormHeader>
      )}

      <Form onSubmit={submit} noValidate>
        <ActionCardListForm
          control={control}
          name='carrierMethod'
          errorMessage={i18n._(/* i18n */ `Please select a payment method`)}
          items={sortedAvailableShippingMethods.filter(Boolean).map((sortedMethod) => ({
            ...sortedMethod,
            title: <>{sortedMethod?.carrier_title}</>,
            disabled: !sortedMethod?.available,
            details: (
              <ShippingMethodDetails
                available={sortedMethod?.available}
                price={sortedMethod?.amount}
                errorMessage={sortedMethod?.error_message}
              />
            ),
            value: `${sortedMethod?.carrier_code}-${sortedMethod?.method_code}`,
          }))}
          render={ShippingMethodActionCard as VFC<ActionCardItemRenderer<ActionCardItemBase>>}
        />
        <ApolloCartErrorAlert error={error} />
      </Form>
    </>
  )
}
