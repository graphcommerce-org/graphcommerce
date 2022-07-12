import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { GetShippingMethodsDocument } from '@graphcommerce/magento-cart-shipping-method/components/ShippingMethodForm/GetShippingMethods.gql'
import { Form } from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import {
  useFormAutoSubmit,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/react-hook-form'
import { SetPickupLocationOnCartDocument } from '../graphql/SetPickupLocationOnCart.gql'
import { PickupLocationActionCard, Location } from './PickupLocationActionCard'

export type PickupLocationActionCardListFormProps = { locations: Location[] } & Pick<
  UseFormComposeOptions,
  'step'
>

export function PickupLocationActionCardListForm(props: PickupLocationActionCardListFormProps) {
  const { locations, step } = props

  const availableMethods = useCartQuery(GetShippingMethodsDocument, {
    fetchPolicy: 'cache-only',
    skip: false,
  })

  const address = availableMethods.data?.cart?.shipping_addresses?.[0]

  const form = useFormGqlMutationCart(SetPickupLocationOnCartDocument, {
    mode: 'onChange',
    defaultValues: {
      pickupLocationCode: address?.pickup_location_code ?? undefined,
    },
    onBeforeSubmit: ({ cartId, pickupLocationCode }) => ({
      cartId,
      pickupLocationCode,
      pickupLocationAddress: {
        firstname: address?.firstname ?? '',
        lastname: address?.lastname ?? '',
        city: '_',
        country_code: address?.country.code ?? '',
        street: ['_'],
        telephone: address?.telephone ?? '_',
        postcode: '_',
      },
    }),
  })

  const { control, handleSubmit, watch, formState } = form

  const submit = handleSubmit(() => {})

  useFormAutoSubmit({ form, submit })
  useFormCompose({ form, step, submit, key: 'PickupLocationForm' })

  console.log(formState.errors)
  return (
    <Form onSubmit={submit} noValidate>
      HALLOOO {formState.isValid}
      <ActionCardListForm<Location & ActionCardItemBase>
        control={control}
        name='pickupLocationCode'
        errorMessage='Please select a pickup location'
        items={locations.map((location) => ({
          ...location,
          value: String(location?.pickup_location_code),
        }))}
        render={PickupLocationActionCard}
      />
    </Form>
  )
}
