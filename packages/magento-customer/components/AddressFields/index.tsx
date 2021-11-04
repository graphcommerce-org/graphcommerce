import { useQuery } from '@apollo/client'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import {
  assertFormGqlOperation,
  houseNumberPattern,
  UseFormReturn,
} from '@graphcommerce/react-hook-form'
import { TextField } from '@material-ui/core'
import React, { useMemo } from 'react'

type AddressFieldValues = {
  street?: string
  houseNumber?: string
  addition?: string
  countryCode?: string
  regionId?: string
  postcode?: string
  city?: string
}

type AddressFieldsProps = { form: UseFormReturn<any>; readOnly?: boolean }

export default function AddressFields(props: AddressFieldsProps) {
  const { form, readOnly } = props
  const countries = useQuery(CountryRegionsDocument).data?.countries
  assertFormGqlOperation<AddressFieldValues>(form)
  const { watch, formState, required, muiRegister, valid } = form

  const country = watch('countryCode')

  const countryList = useMemo(() => {
    const countriesWithLocale = (countries ?? [])?.filter((c) => c?.full_name_locale)
    return countriesWithLocale.sort((a, b) =>
      (a?.full_name_locale ?? '')?.localeCompare(b?.full_name_locale ?? ''),
    )
  }, [countries])

  const regionList = useMemo(() => {
    const availableRegions = Object.values(
      countryList.find((c) => c?.two_letter_abbreviation === country)?.available_regions ?? {},
    )
    type Region = typeof availableRegions[0]

    const compare: (a: Region, b: Region) => number = (a, b) =>
      (a?.name ?? '')?.localeCompare(b?.name ?? '')

    const regions = availableRegions?.sort(compare)
    return regions
  }, [country, countryList])

  return (
    <>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.street}
          label='Street'
          autoComplete='address-line1'
          required={!!required?.street}
          {...muiRegister('street', { required: required?.street })}
          helperText={formState.isSubmitted && formState.errors.street?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.street} />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.houseNumber}
          label='Housenumber'
          autoComplete='address-line2'
          required={!!required?.houseNumber}
          {...muiRegister('houseNumber', {
            required: required?.houseNumber,
            pattern: { value: houseNumberPattern, message: 'Please provide a valid house number' },
          })}
          helperText={formState.isSubmitted && formState.errors.houseNumber?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.houseNumber} />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.addition}
          required={!!required?.addition}
          label='Addition'
          autoComplete='address-line3'
          {...muiRegister('addition', { required: required?.addition })}
          helperText={formState.isSubmitted && formState.errors.addition?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.addition} />,
          }}
        />
      </FormRow>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.postcode}
          required={!!required?.postcode}
          label='Postcode'
          {...muiRegister('postcode', { required: required?.postcode })}
          helperText={formState.isSubmitted && formState.errors.postcode?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.postcode} />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.city}
          required={!!required?.city}
          label='City'
          {...muiRegister('city', { required: required?.city })}
          helperText={formState.isSubmitted && formState.errors.city?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.city} />,
          }}
        />
      </FormRow>
      <FormRow>
        <TextField
          select
          SelectProps={{ native: true, displayEmpty: true }}
          {...muiRegister('countryCode', { required: required.countryCode })}
          variant='outlined'
          error={!!formState.errors.countryCode}
          label='Country'
          required={!!required?.countryCode}
          helperText={formState.errors.countryCode?.message}
          // onBlur={onBlur}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.countryCode} select />,
          }}
        >
          <option value='' />
          {countryList.map((c) => {
            if (!c?.two_letter_abbreviation) return null
            return (
              <option key={c.two_letter_abbreviation} value={c.two_letter_abbreviation}>
                {c.full_name_locale}
              </option>
            )
          })}
        </TextField>

        {regionList.length > 0 && (
          <TextField
            select
            SelectProps={{ native: true, displayEmpty: true }}
            variant='outlined'
            error={!!formState.errors.regionId}
            label='Region'
            {...muiRegister('regionId', {
              required: true,
              shouldUnregister: true,
              valueAsNumber: true,
            })}
            required
            helperText={formState.errors.regionId?.message}
            InputProps={{
              readOnly,
              endAdornment: <InputCheckmark show={valid.regionId} select />,
            }}
          >
            <option value='' />
            {regionList.map((r) => {
              if (!r?.id) return null
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              )
            })}
          </TextField>
        )}
      </FormRow>
    </>
  )
}
