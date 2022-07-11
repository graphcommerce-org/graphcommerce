import { ApolloErrorAlert } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { ProductInfoInput } from '@graphcommerce/graphql-mesh'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { GetShippingMethodsDocument } from '@graphcommerce/magento-cart-shipping-method/components/ShippingMethodForm/GetShippingMethods.gql'
import { ActionCard, Button, Form } from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardItemRenderProps,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import {
  useFormAutoSubmit,
  useFormGqlQuery,
  useFormPersist,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { TextField } from '@mui/material'
import { PickupLocationFormDocument } from '../PickupLocationForm/PickupLocationForm.gql'
import {
  GetPickupLocationsForProductsDocument,
  GetPickupLocationsForProductsQuery,
  GetPickupLocationsForProductsQueryVariables,
} from '../PickupLocationsQuery/PickupLocationsQuery.gql'

type Location = NonNullable<
  NonNullable<NonNullable<GetPickupLocationsForProductsQuery['pickupLocations']>['items']>[number]
>

function PickupLocationActionCard(props: ActionCardItemRenderProps<Location>) {
  const { onReset, name, contact_name, street, ...cardProps } = props

  return (
    <ActionCard
      {...cardProps}
      title={
        <>
          {name} {contact_name}
        </>
      }
      details={<>{street}</>}
      action={
        <Button disableRipple variant='inline' color='secondary'>
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableRipple variant='inline' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
    />
  )
}

type PickupLocationFormProps = { locations: Location[] } & Pick<UseFormComposeOptions, 'step'>

export function PickupLocationForm(props: PickupLocationFormProps) {
  const availableMethods = useCartQuery(GetShippingMethodsDocument, { fetchPolicy: 'cache-only' })

  const form = useFormGqlMutationCart(PickupLocationFormDocument, {
    defaultValues: {
      pickupLocationCode:
        availableMethods.data?.cart?.shipping_addresses?.[0]?.pickup_location_code ?? undefined,
    },
  })

  const { control, handleSubmit } = form
  const { locations, step } = props

  const submit = handleSubmit(() => {})

  useFormAutoSubmit({ form, submit })
  useFormCompose({ form, step, submit, key: 'PickupLocationForm' })

  return (
    <Form onSubmit={submit} noValidate>
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

type PickupLocationProps = Pick<
  GetPickupLocationsForProductsQueryVariables,
  'productInput' | 'searchTerm'
> & {
  countryCode: string
} & Pick<PickupLocationFormProps, 'step'>

export function PickupLocations(props: PickupLocationProps) {
  const { productInput, searchTerm, countryCode, step } = props

  const form = useFormGqlQuery(GetPickupLocationsForProductsDocument, {
    defaultValues: { productInput, searchTerm: searchTerm ?? undefined },
    onBeforeSubmit(vars) {
      return { ...vars, searchTerm: `${vars.searchTerm}:${countryCode}` }
    },
  })
  const locations = (form.data?.pickupLocations?.items ?? []).filter(Boolean) as Location[]

  const { muiRegister, handleSubmit, error } = form
  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit, forceInitialSubmit: true })

  return (
    <>
      <form onSubmit={submit}>
        <TextField
          label='Jouw addressie'
          type='text'
          {...muiRegister('searchTerm', { required: true })}
        />
      </form>
      {locations.length > 0 ? (
        <PickupLocationForm step={step} locations={locations} />
      ) : (
        'Niks gevonden ofzo'
      )}
      <ApolloErrorAlert error={error} />
    </>
  )
}

type PickupProps = Pick<PickupLocationFormProps, 'step'>

export function Pickup(props: PickupProps) {
  const { step } = props
  const availableMethods = useCartQuery(GetShippingMethodsDocument, { fetchPolicy: 'cache-only' })

  const productInput = (availableMethods.data?.cart?.items ?? [])?.map<ProductInfoInput>((i) => ({
    sku: i?.product.sku ?? '',
  }))

  const address = availableMethods.data?.cart?.shipping_addresses?.[0]
  const isAvailable =
    address?.selected_shipping_method?.carrier_code === 'pickup' &&
    address?.available_shipping_methods?.find((m) => m?.carrier_code === 'instore') &&
    productInput.length > 0

  if (!isAvailable || !address?.country.code || !address.postcode) return null

  return (
    <>
      <PickupLocations
        key={`${address.postcode}:${address.country.code}`}
        countryCode={address.country.code}
        searchTerm={address.postcode}
        productInput={productInput}
        step={step}
      />
      <ApolloErrorAlert error={availableMethods.error} />
    </>
  )
}
