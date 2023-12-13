import { SelectElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import {
  assertFormGqlOperation,
  houseNumberPattern,
  useFormContext,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import React, { useMemo } from 'react'

export type AddressFieldValues = {
  street?: string
  houseNumber?: string
  addition?: string
  countryCode?: string
  regionId?: string
  postcode?: string
  city?: string
}

export type AddressFieldsProps = {
  countryFirst?: boolean
}

export function AddressFields(props: AddressFieldsProps) {
  const { countryFirst } = props

  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const form = useFormContext()
  assertFormGqlOperation<AddressFieldValues>(form)
  const { watch, required, valid, control, formState } = form

  const country = watch('countryCode')

  const countryList = useMemo(() => {
    const countriesWithLocale = (countries ?? [])?.filter((c) => c?.full_name_locale)
    return countriesWithLocale.sort(
      (a, b) => (a?.full_name_locale ?? '')?.localeCompare(b?.full_name_locale ?? ''),
    )
  }, [countries])

  const regionList = useMemo(() => {
    const availableRegions = Object.values(
      countryList.find((c) => c?.two_letter_abbreviation === country)?.available_regions ?? {},
    )
    type Region = (typeof availableRegions)[0]

    const compare: (a: Region, b: Region) => number = (a, b) =>
      (a?.name ?? '')?.localeCompare(b?.name ?? '')

    return availableRegions?.sort(compare)
  }, [country, countryList])

  const readOnly = formState.isSubmitting

  const countryFields = (
    <FormRow>
      <SelectElement
        control={control}
        name='countryCode'
        SelectProps={{ autoWidth: true }}
        variant='outlined'
        label={<Trans id='Country' />}
        required={required.countryCode}
        InputProps={{
          readOnly,
          endAdornment: <InputCheckmark show={valid.countryCode} select />,
        }}
        options={filterNonNullableKeys(countryList, [
          'two_letter_abbreviation',
          'full_name_locale',
        ]).map(({ two_letter_abbreviation: id, full_name_locale: label }) => ({ id, label }))}
      />

      {regionList.length > 0 && (
        <SelectElement
          control={control}
          name='regionId'
          // SelectProps={{ native: true, displayEmpty: true }}
          variant='outlined'
          label={<Trans id='Region' />}
          required
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.regionId} select />,
          }}
          options={filterNonNullableKeys(regionList, ['id', 'name']).map(({ id, name: label }) => ({
            id,
            label,
          }))}
        />
      )}
    </FormRow>
  )

  return (
    <>
      {countryFirst && countryFields}
      <FormRow>
        <TextFieldElement
          variant='outlined'
          control={control}
          required={required.street}
          name='street'
          type='text'
          label={<Trans id='Street' />}
          autoComplete='address-line1'
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.street} />,
          }}
        />
        <TextFieldElement
          control={control}
          name='houseNumber'
          required={required.houseNumber}
          validation={{
            pattern: {
              value: houseNumberPattern,
              message: i18n._(/* i18n */ 'Please provide a valid house number'),
            },
          }}
          variant='outlined'
          type='text'
          label={<Trans id='Housenumber' />}
          autoComplete='address-line2'
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.houseNumber} />,
          }}
        />
        <TextFieldElement
          control={control}
          name='addition'
          variant='outlined'
          type='text'
          required={required.addition}
          label={<Trans id='Addition' />}
          autoComplete='address-line3'
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.addition} />,
          }}
        />
      </FormRow>
      <FormRow>
        <TextFieldElement
          control={control}
          name='postcode'
          variant='outlined'
          type='text'
          required={required.postcode}
          label={<Trans id='Postcode' />}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.postcode} />,
          }}
        />
        <TextFieldElement
          control={control}
          name='city'
          variant='outlined'
          type='text'
          required={required.city}
          label={<Trans id='City' />}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.city} />,
          }}
        />
      </FormRow>
      {!countryFirst && countryFields}
    </>
  )
}
