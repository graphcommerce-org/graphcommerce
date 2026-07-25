import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { FieldPath, FieldValues, PathValue } from '@graphcommerce/ecommerce-ui'
import type { AddressFieldsOptions } from '@graphcommerce/magento-customer'
import { useAddressFieldsForm } from '@graphcommerce/magento-customer'
import { googleMapsApiKey } from '@graphcommerce/next-config/config'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import {
  Autocomplete,
  useLoadScript,
  type AutocompleteProps,
  type Libraries,
} from '@react-google-maps/api'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useCountries } from '../hooks/useCountries'
import { addressValues } from '../utils/addressValues'
import type { FormattedAddress } from '../utils/formatAddress'
import { formatAddress } from '../utils/formatAddress'

const libraries: Libraries = ['places']
const autocompleteOptions: AutocompleteProps['options'] = {
  fields: ['address_components'],
  types: ['address'],
}
const updateOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const

export type AddressAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = AddressFieldsOptions<TFieldValues, TName> & {
  fallback: ReactNode
}

export function AddressAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: AddressAutocompleteProps<TFieldValues, TName>) {
  const { fallback } = options
  const form = useAddressFieldsForm<TFieldValues, TName>(options)
  const { control, getValues, name, readOnly, required, setValue } = form
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const pendingRegion = useRef<FormattedAddress | null>(null)
  const addressSearchName = `places-search-${useId()}`
  const countries = useCountries()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey ?? '',
    libraries,
  })

  const updateValue = useCallback(
    (fieldName: TName, value: unknown) => {
      setValue(fieldName, value as PathValue<TFieldValues, TName>, updateOptions)
    },
    [setValue],
  )

  const onAddress = useCallback(
    (address: FormattedAddress) => {
      const values = addressValues(address, countries)

      updateValue(name.regionId, null)
      updateValue(name.street, values.street)
      updateValue(name.houseNumber, values.houseNumber)
      updateValue(name.addition, values.addition)
      updateValue(name.postcode, values.postcode)
      updateValue(name.city, values.city)
      updateValue(name.countryCode, values.countryCode)
      if (countries) {
        updateValue(name.regionId, values.regionId)
        pendingRegion.current = null
      } else {
        pendingRegion.current = address
      }
    },
    [countries, name, updateValue],
  )

  const onPlaceChanged = useCallback(() => {
    const addressComponents = autocomplete?.getPlace().address_components
    if (addressComponents) onAddress(formatAddress({ addressComponents }))
  }, [autocomplete, onAddress])

  useEffect(() => {
    const address = pendingRegion.current
    if (!address || !countries) return

    pendingRegion.current = null
    if (getValues(name.countryCode) !== address.country) return

    updateValue(name.regionId, addressValues(address, countries).regionId)
  }, [countries, getValues, name.countryCode, name.regionId, updateValue])

  const showAutocomplete = Boolean(googleMapsApiKey && isLoaded && !loadError)

  return (
    <>
      {showAutocomplete ? (
        <Autocomplete
          onLoad={setAutocomplete}
          onPlaceChanged={onPlaceChanged}
          onUnmount={() => setAutocomplete(null)}
          options={autocompleteOptions}
        >
          <TextFieldElement
            sx={{ width: '100%' }}
            variant='outlined'
            control={control}
            required={required[name.street]}
            name={name.street}
            type='text'
            label={<Trans>Street</Trans>}
            showValid
            inputProps={{
              // Force disabling autocomplete on the input field, as it can cause issues with the Google Places Autocomplete
              autoComplete: 'one-time-code',
              name: addressSearchName,
            }}
            InputProps={{
              readOnly,
            }}
          />
        </Autocomplete>
      ) : (
        fallback
      )}
      <ErrorSnackbar open={Boolean(loadError)}>
        <Trans>Address search is unavailable. You can enter the address manually.</Trans>
      </ErrorSnackbar>
    </>
  )
}
