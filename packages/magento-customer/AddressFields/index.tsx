import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, UseFormReturn } from '@reachdigital/react-hook-form/useForm'
import { assertFormGqlOperation } from '@reachdigital/react-hook-form/useFormGqlMutation'
import { houseNumberPattern } from '@reachdigital/react-hook-form/validationPatterns'
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

type AddressFieldsProps = CountryRegionsQuery & {
  form: UseFormReturn<any>
  disabled?: boolean
}

export default function AddressFields(props: AddressFieldsProps) {
  const { form, disabled, countries } = props
  assertFormGqlOperation<AddressFieldValues>(form)

  const { watch, formState, control, required, muiRegister, valid } = form
  const classes = useFormStyles()

  const country = watch('countryCode')
  const region = watch('regionId')

  const countryList = useMemo(
    () =>
      (countries ?? [])
        ?.filter((c) => c?.full_name_locale)
        .sort((a, b) => (a?.full_name_locale ?? '')?.localeCompare(b?.full_name_locale ?? '')),
    [countries],
  )
  const regionList = useMemo(() => {
    const regions =
      countryList
        .find((c) => c?.two_letter_abbreviation === country)
        ?.available_regions?.sort((a, b) => (a?.name ?? '')?.localeCompare(b?.name ?? '')) ?? []
    return regions
  }, [country, countryList])

  return (
    <>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.street}
          label='Street'
          required={!!required?.street}
          {...muiRegister('street', { required: required?.street })}
          helperText={formState.isSubmitted && formState.errors.street?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: valid.street && <InputCheckmark />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.houseNumber}
          label='Housenumber'
          required={!!required?.houseNumber}
          {...muiRegister('houseNumber', {
            required: required?.houseNumber,
            pattern: { value: houseNumberPattern, message: 'Please provide a valid house number' },
          })}
          helperText={formState.isSubmitted && formState.errors.houseNumber?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: valid.houseNumber && <InputCheckmark />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.addition}
          required={!!required?.addition}
          label='Addition'
          {...muiRegister('addition', { required: required?.addition })}
          helperText={formState.isSubmitted && formState.errors.addition?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: valid.addition && <InputCheckmark />,
          }}
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.postcode}
          required={!!required?.postcode}
          label='Postcode'
          {...muiRegister('postcode', { required: required?.postcode })}
          helperText={formState.isSubmitted && formState.errors.postcode?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: validFields.postcode && <InputCheckmark />,
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
          disabled={disabled}
          InputProps={{
            endAdornment: valid.city && <InputCheckmark />,
          }}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          control={control}
          name='countryCode'
          rules={{ required: required?.countryCode }}
          render={({ onChange, name, value, onBlur, ref }) => (
            <Autocomplete
              value={countryList?.find((c) => c?.two_letter_abbreviation === value)}
              defaultValue={null}
              options={countryList}
              getOptionLabel={(option) => `${option?.full_name_locale}`}
              onChange={(_, input) => onChange(input?.two_letter_abbreviation)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  error={!!formState.errors.countryCode}
                  name={name}
                  label='Country'
                  inputRef={ref}
                  required={!!required?.countryCode}
                  helperText={formState.errors.countryCode?.message}
                  disabled={disabled}
                  onBlur={onBlur}
                  InputProps={{
                    endAdornment: valid.countryCode && <InputCheckmark />,
                  }}
                />
              )}
            />
          )}
        />
        {regionList.length > 0 && (
          <Controller
            control={control}
            name={regionId}
            rules={{ required: true }}
            render={({ onChange, name, value, onBlur, ref }) => (
              <Autocomplete
                value={regionList?.find((c) => c?.id === value)}
                options={regionList}
                defaultValue={null}
                getOptionLabel={(option) => `${option?.name}`}
                onChange={(_, input) => onChange(input?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    error={!!formState.errors.regionId}
                    name={name}
                    label='Region'
                    inputRef={ref}
                    required={!!required?.regionId}
                    helperText={formState.errors.regionId?.message}
                    disabled={disabled}
                    onBlur={onBlur}
                    InputProps={{
                      endAdornment: valid.regionId && <InputCheckmark />,
                    }}
                  />
                )}
              />
            )}
          />
        )}
      </div>
    </>
  )
}
