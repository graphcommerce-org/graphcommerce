import { ApolloErrorAlert } from '@graphcommerce/ecommerce-ui'
import { useFormGqlQuery, useFormAutoSubmit } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { TextField } from '@mui/material'
import {
  GetPickupLocationsForProductsQueryVariables,
  GetPickupLocationsForProductsDocument,
} from '../graphql/GetPickupLocationsForProducts.gql'
import {
  PickupLocationActionCardListForm,
  PickupLocationActionCardListFormProps,
} from './PickupLocationActionCardListForm'

type PickupLocationProps = Pick<
  GetPickupLocationsForProductsQueryVariables,
  'productInput' | 'searchTerm'
> & {
  countryCode: string
} & Pick<PickupLocationActionCardListFormProps, 'step'>

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function PickupLocationSearch(props: PickupLocationProps) {
  const { productInput, searchTerm, countryCode, step } = props

  const form = useFormGqlQuery(GetPickupLocationsForProductsDocument, {
    defaultValues: { searchTerm: searchTerm ?? undefined },
    onBeforeSubmit: (vars) => ({
      ...vars,
      searchTerm: `${vars.searchTerm}:${countryCode}`,
      productInput,
    }),
  })
  const locations = (form.data?.pickupLocations?.items ?? []).filter(nonNullable)

  const { muiRegister, handleSubmit, error } = form
  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit, forceInitialSubmit: true })

  return (
    <>
      <form onSubmit={submit}>
        <TextField
          label={<Trans id='Zip code or city' />}
          type='text'
          {...muiRegister('searchTerm', { required: true })}
        />
      </form>
      {locations.length > 0 ? (
        <PickupLocationActionCardListForm step={step} locations={locations} />
      ) : (
        <Trans id="Couldn't find any locations" />
      )}
      <ApolloErrorAlert error={error} />
    </>
  )
}
