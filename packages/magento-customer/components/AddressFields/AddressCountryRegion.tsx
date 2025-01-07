import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { SelectElement, TextFieldElement, useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useMemo } from 'react'
import type { AddressFieldsOptions } from './useAddressFieldsForm'
import { useAddressFieldsForm } from './useAddressFieldsForm'

function useAddressCountryRegion(props: AddressFieldsOptions) {
  const form = useAddressFieldsForm(props)
  const { control, name } = form

  const countryQuery = useQuery(CountryRegionsDocument)
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries

  const country = useWatch({ control, name: name.countryCode })

  const countryList = useMemo(
    () =>
      filterNonNullableKeys(countries, ['two_letter_abbreviation', 'full_name_locale']).sort(
        (a, b) => a.full_name_locale.localeCompare(b.full_name_locale),
      ),
    [countries],
  )

  const regionList = useMemo(
    () =>
      filterNonNullableKeys(
        countryList.find((c) => c.two_letter_abbreviation === country)?.available_regions ?? [],
        ['name', 'id'],
      ).sort((a, b) => a.name.localeCompare(b.name)),
    [country, countryList],
  )

  return { ...form, country, countryList, regionList, loading: countryQuery.loading }
}

type AddressCountryRegionComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: AddressFieldsOptions<TFieldValues, TName>,
) => React.ReactNode

export function AddressCountryRegionBase(props: AddressFieldsOptions) {
  const form = useAddressCountryRegion(props)
  const { control, name, readOnly, required, countryList, regionList, loading } = form

  if (loading) {
    return (
      <FormRow>
        <TextFieldElement
          label={<Trans id='Country' />}
          control={control}
          required={required[name.countryCode]}
          name={name.countryCode}
          showValid
          InputProps={{ readOnly }}
        />
      </FormRow>
    )
  }

  return (
    <FormRow>
      <SelectElement
        control={control}
        name={name.countryCode}
        SelectProps={{ autoWidth: true }}
        variant='outlined'
        label={<Trans id='Country' />}
        required={required[name.countryCode]}
        showValid
        InputProps={{ readOnly }}
        options={countryList.map((country) => ({
          id: country.two_letter_abbreviation,
          label: country.full_name_locale,
        }))}
      />

      {regionList.length > 0 && (
        <SelectElement
          control={control}
          name={name.regionId}
          variant='outlined'
          label={<Trans id='Region' />}
          required
          showValid
          InputProps={{ readOnly }}
          options={regionList.map((region) => ({ ...region, label: region.name }))}
        />
      )}
    </FormRow>
  )
}

export const AddressCountryRegion = AddressCountryRegionBase as AddressCountryRegionComponent
