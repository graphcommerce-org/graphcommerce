import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import {
  Form,
  FormHeader,
  ActionCardItemBase,
  ActionCardItemRenderProps,
  ActionCardListForm,
} from '@graphcommerce/next-ui'
import {
  FormAutoSubmit,
  FormProvider,
  useFormCompose,
  UseFormComposeOptions,
  UseFormGraphQlOptions,
  useWatch,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { GetShippingMethodsDocument } from './GetShippingMethods.gql'
import { ShippingMethodActionCard } from './ShippingMethodActionCard'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

export type ShippingMethodFormProps = Pick<UseFormComposeOptions, 'step'> & {
  sx?: SxProps<Theme>
  children?: React.ReactNode
} & UseFormGraphQlOptions<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function ShippingMethodForm(props: ShippingMethodFormProps) {
  const { step, sx, children, onBeforeSubmit = (vars) => vars, ...options } = props
  const { data: cartQuery } = useCartQuery(GetShippingMethodsDocument)

  const shippingAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const availableMethods = (shippingAddress?.available_shipping_methods ?? []).filter(notEmpty)

  const items = useMemo(
    () =>
      availableMethods
        // Move disabled items to the bottom
        .sort((a) => (a.available ? -1 : 1))
        .filter((m) => {
          if (m.carrier_code === 'freeshipping') return m.available === true
          return m.method_code
        })
        .map((method) => ({
          ...method,
          disabled: !method?.available,
          value: `${method?.carrier_code}-${method?.method_code ?? ''}`,
        })),
    [availableMethods],
  )

  // Override with the currently selected method if there is one.
  const selectedMethod = cartQuery?.cart?.shipping_addresses?.[0]?.selected_shipping_method
  const carrierMethod = selectedMethod?.method_code
    ? `${selectedMethod.carrier_code}-${selectedMethod.method_code}`
    : undefined

  const form = useFormGqlMutationCart<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >(ShippingMethodFormDocument, {
    defaultValues: { carrierMethod },
    experimental_useV2: true,
    onBeforeSubmit: (variables) => {
      const [carrier, method] = (variables.carrierMethod ?? '').split('-')
      return onBeforeSubmit({ ...variables, carrier, method })
    },
    ...options,
  })

  const { handleSubmit, control, error, setValue } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'ShippingMethodForm' })

  const renderItems = [...items]
  if (renderItems.length === 0) {
    renderItems.push({
      disabled: true,
      value: '',
      available: false,
      carrier_code: '',
      carrier_title: i18n._(
        /* i18n */ 'Please fill out an address to be able to select a shipping method',
      ),
      method_title: '',
      price_incl_tax: {},
      price_excl_tax: {},
    })
  }

  const firstCarrierMethod = items.length === 1 ? items[0].value : undefined
  useEffect(() => {
    //  If there is a shipping address AND there is only one shipping method
    if (shippingAddress && firstCarrierMethod) {
      // AND the current carrierMethod is not the same (or not set) as the single shipping method
      if (carrierMethod !== firstCarrierMethod) {
        // THEN set the shipping method to the only one available.
        setValue('carrierMethod', firstCarrierMethod, { shouldValidate: true })
      }
    }
  }, [shippingAddress, firstCarrierMethod, carrierMethod, setValue])

  return (
    <FormProvider {...form}>
      <FormAutoSubmit
        control={control}
        submit={submit}
        name={['carrierMethod']}
        parallel
        wait={300}
      />
      <Form onSubmit={submit} noValidate sx={sx}>
        <FormHeader variant='h4' sx={(theme) => ({ marginBottom: 0, mb: theme.spacings.sm })}>
          <Trans id='Shipping method' />
        </FormHeader>

        <ActionCardListForm
          control={control}
          name='carrierMethod'
          size='large'
          color='secondary'
          rules={{ required: i18n._(/* i18n */ 'Please select a shipping method') }}
          items={renderItems}
          render={
            ShippingMethodActionCard as React.FC<ActionCardItemRenderProps<ActionCardItemBase>>
          }
        />
        <ApolloCartErrorAlert error={error} />
      </Form>
      {children}
    </FormProvider>
  )
}

export function useShippingMethod() {
  return useWatch<{ carrierMethod?: string }>({ name: 'carrierMethod' })
}
