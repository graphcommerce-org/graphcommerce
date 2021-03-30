import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, RegisterOptions, UseFormMethods } from '@reachdigital/react-hook-form/useForm'
import { houseNumber } from '@reachdigital/react-hook-form/validationPatterns'
import React, { useMemo } from 'react'

type FieldOptions = Pick<RegisterOptions, 'required'> & { name: string }
type AddressFieldsProps = Pick<
  UseFormMethods,
  'register' | 'watch' | 'errors' | 'formState' | 'control'
> &
  CountryRegionsQuery & {
    countryCode?: string
    regionId?: number
    disableFields: boolean
    fieldOptions: {
      street: FieldOptions
      houseNumber: FieldOptions
      addition: FieldOptions
      countryCode: FieldOptions
      regionId: FieldOptions
      postcode: FieldOptions
      city: FieldOptions
    }
  } & {
    validFields: Record<string, boolean>
  }

export default function AddressFields(props: AddressFieldsProps) {
  const {
    errors,
    register,
    watch,
    formState,
    control,
    countryCode,
    regionId,
    countries,
    disableFields,
    fieldOptions,
    validFields,
  } = props
  const classes = useFormStyles()

  const country = watch(fieldOptions.countryCode.name) ?? countryCode
  const region = watch(fieldOptions.regionId.name) ?? regionId

  const countryList = useMemo(
    () =>
      countries
        ?.filter((c) => c?.full_name_locale)
        .sort((a, b) => (a?.full_name_locale ?? '')?.localeCompare(b?.full_name_locale ?? '')) ??
      [],
    [countries],
  )
  const regionList = useMemo(() => {
    const regions =
      countryList
        .find((c) => c?.two_letter_abbreviation === country)
        ?.available_regions?.sort((a, b) => (a?.name ?? '')?.localeCompare(b?.name ?? '')) ?? []
    return regions
  }, [country, countryList])

  const required = Object.fromEntries(Object.values(fieldOptions).map((r) => [r.name, r.required]))
  const checkIcon = <InputCheckmark />

  return (
    <>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[fieldOptions.street.name]}
          name={fieldOptions.street.name}
          label='Street'
          key='street'
          required={!!required.street}
          inputRef={register({ required: required.street })}
          helperText={formState.isSubmitted && errors[fieldOptions.street.name]?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: validFields[fieldOptions.street.name] && checkIcon,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[fieldOptions.houseNumber.name]}
          name={fieldOptions.houseNumber.name}
          label='Housenumber'
          key='housenumber'
          required={!!required.houseNumber}
          inputRef={register({
            required: required.houseNumber,
            pattern: { value: houseNumber, message: 'Please provide a valid house number' },
          })}
          helperText={formState.isSubmitted && errors[fieldOptions.houseNumber.name]?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: validFields[fieldOptions.houseNumber.name] && checkIcon,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[fieldOptions.addition.name]}
          required={!!required.addition}
          name={fieldOptions.addition.name}
          label='Addition'
          key='addition'
          inputRef={register({ required: required.addition })}
          helperText={formState.isSubmitted && errors[fieldOptions.addition.name]?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: validFields[fieldOptions.addition.name] && checkIcon,
          }}
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[fieldOptions.postcode.name]}
          required={!!required.postcode}
          name={fieldOptions.postcode.name}
          label='Postcode'
          key='postcode'
          inputRef={register({ required: required.postcode })}
          helperText={formState.isSubmitted && errors[fieldOptions.postcode.name]?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: validFields[fieldOptions.postcode.name] && checkIcon,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[fieldOptions.city.name]}
          required={!!required.city}
          name={fieldOptions.city.name}
          label='City'
          key='city'
          inputRef={register({ required: required.city })}
          helperText={formState.isSubmitted && errors[fieldOptions.city.name]?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: validFields[fieldOptions.city.name] && checkIcon,
          }}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          defaultValue={country ?? ''}
          control={control}
          name={fieldOptions.countryCode.name}
          rules={{ required: required.countryCode }}
          render={({ onChange, name, value, onBlur }) => (
            <Autocomplete
              value={countryList?.find((c) => c?.two_letter_abbreviation === value)}
              options={countryList}
              getOptionLabel={(option) => `${option?.full_name_locale}`}
              onChange={(_, input) => onChange(input?.two_letter_abbreviation)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  error={!!errors[fieldOptions.countryCode.name]}
                  name={name}
                  label='Country'
                  key='country'
                  required={!!required.countryCode}
                  helperText={errors[fieldOptions.countryCode.name]?.message}
                  disabled={disableFields}
                  onBlur={onBlur}
                />
              )}
            />
          )}
          InputProps={{
            endAdornment: validFields[fieldOptions.countryCode.name] && checkIcon,
          }}
        />
        {regionList.length > 0 && (
          <Controller
            defaultValue={region ?? ''}
            control={control}
            name={fieldOptions.regionId.name}
            rules={{ required: true }}
            render={({ onChange, name, value, onBlur }) => (
              <Autocomplete
                value={regionList?.find((c) => c?.id === value)}
                options={regionList}
                getOptionLabel={(option) => `${option?.name}`}
                onChange={(_, input) => onChange(input?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    error={!!errors[fieldOptions.regionId.name]}
                    name={name}
                    label='Region'
                    key='region'
                    required={!!required.regionId}
                    helperText={errors[fieldOptions.regionId.name]?.message}
                    disabled={disableFields}
                    onBlur={onBlur}
                  />
                )}
              />
            )}
            InputProps={{
              endAdornment: validFields[fieldOptions.regionId.name] && checkIcon,
            }}
          />
        )}
      </div>
    </>
  )
}
