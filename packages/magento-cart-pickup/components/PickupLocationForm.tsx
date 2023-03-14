import {
  ApolloErrorAlert,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { ProductInfoInput } from '@graphcommerce/graphql-mesh'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useShippingMethod } from '@graphcommerce/magento-cart-shipping-method'
import { GetShippingMethodsDocument } from '@graphcommerce/magento-cart-shipping-method/components/ShippingMethodForm/GetShippingMethods.gql'
import { ActionCardItemBase, ActionCardListForm, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import TextField from '@mui/material/TextField'
import { useMemo, useDeferredValue } from 'react'
import { GetPickupLocationsForProductsDocument } from '../graphql/GetPickupLocationsForProducts.gql'
import {
  SetPickupLocationOnCartDocument,
  SetPickupLocationOnCartMutation,
  SetPickupLocationOnCartMutationVariables,
} from '../graphql/SetPickupLocationOnCart.gql'
import { PickupLocationActionCard, Location } from './PickupLocationActionCard'

export type PickupLocationFormProps = Pick<UseFormComposeOptions, 'step'>

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function PickupLocationForm(props: PickupLocationFormProps) {
  const { step } = props
  const currentShippingMethod = useShippingMethod()

  const availableMethods = useCartQuery(GetShippingMethodsDocument, { fetchPolicy: 'cache-only' })
  const productInput = (availableMethods.data?.cart?.items ?? [])?.map<ProductInfoInput>((i) =>
    i?.__typename === 'ConfigurableCartItem'
      ? { sku: i.configured_variant.sku ?? '' }
      : { sku: i?.product.sku ?? '' },
  )
  const shippingAddress = availableMethods.data?.cart?.shipping_addresses?.[0]

  const isAvailable = currentShippingMethod === 'instore-pickup' && productInput.length > 0

  const defaultSearchTerm = shippingAddress?.pickup_location_code
    ? undefined
    : shippingAddress?.postcode ?? undefined
  const form = useFormGqlMutationCart<
    SetPickupLocationOnCartMutation,
    SetPickupLocationOnCartMutationVariables & { searchTerm?: string }
  >(SetPickupLocationOnCartDocument, {
    mode: 'onChange',
    defaultValues: {
      searchTerm: defaultSearchTerm,
      pickupLocationCode: shippingAddress?.pickup_location_code ?? undefined,
    },
    onBeforeSubmit: ({ cartId, pickupLocationCode }) => ({
      cartId,
      pickupLocationCode,
      pickupLocationAddress: {
        firstname: shippingAddress?.firstname ?? '',
        lastname: shippingAddress?.lastname ?? '',
        city: '_',
        country_code: shippingAddress?.country.code ?? '',
        street: ['_'],
        telephone: shippingAddress?.telephone ?? '_',
        postcode: '_',
      },
    }),
  })

  const { control, handleSubmit, muiRegister } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'PickupLocationForm' })

  const searchTerm = useDeferredValue((form.watch('searchTerm') || defaultSearchTerm) ?? '')
  const locationsQuery = useQuery(GetPickupLocationsForProductsDocument, {
    variables: {
      productInput,
      searchTerm: `${searchTerm.length < 4 ? '' : searchTerm}:${shippingAddress?.country.code}`,
    },
    skip: !availableMethods.data,
  })

  const locationData = locationsQuery.data ?? locationsQuery.previousData
  const locations = useMemo(
    () => (locationData?.pickupLocations?.items ?? []).filter(nonNullable),
    [locationData?.pickupLocations?.items],
  )

  const selected = form.watch('pickupLocationCode')

  // What to do when shippingForm is pickup but there aren't any available pickup locations?
  if (!isAvailable) return null

  return (
    <form onSubmit={submit} noValidate>
      {!selected && (
        <FormRow>
          <TextField
            label={<Trans id='Zip code or city' />}
            type='text'
            {...muiRegister('searchTerm', { required: false, minLength: 4 })}
          />
        </FormRow>
      )}

      <ActionCardListForm<Location & ActionCardItemBase>
        control={control}
        name='pickupLocationCode'
        errorMessage='Please select a pickup location'
        collapse
        size='large'
        color='secondary'
        items={locations.map((location) => ({
          ...location,
          value: String(location?.pickup_location_code),
        }))}
        render={PickupLocationActionCard}
      />

      <ApolloErrorAlert error={availableMethods.error} />
    </form>
  )
}
