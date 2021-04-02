import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, UseFormMethods } from '@reachdigital/react-hook-form/useForm'
import { numberRegex } from '@reachdigital/react-hook-form/validationPatterns'
import React, { useMemo } from 'react'

type RequiredFields =
  | 'street'
  | 'houseNumber'
  | 'addition'
  | 'countryCode'
  | 'regionId'
  | 'postcode'
  | 'city'
type OptionalFields = never

type Fields = Record<RequiredFields, string> & Partial<Record<OptionalFields, string>>
type Required = Record<string, boolean>

type AddressFieldsProps = CountryRegionsQuery &
  Fields & {
    form: UseFormMethods
    required?: Required
    validFields: Partial<Record<RequiredFields | OptionalFields, boolean>>
    disabled?: boolean
  }

export default function AddressFields(props: AddressFieldsProps) {
  const {
    form,
    disabled,
    street,
    houseNumber,
    addition,
    countryCode,
    regionId,
    countries,
    validFields,
    postcode,
    city,
    required,
  } = props

  const { errors, register, watch, formState, control } = form
  const classes = useFormStyles()

  const country = watch(countryCode)
  const region = watch(regionId)

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
          error={!!errors[street]}
          name={street}
          label='Street'
          required={!!required?.street}
          inputRef={register({ required: required?.street })}
          helperText={formState.isSubmitted && errors[street]?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: validFields[street] && <InputCheckmark />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[houseNumber]}
          name={houseNumber}
          label='Housenumber'
          required={!!required?.houseNumber}
          inputRef={register({
            required: required?.houseNumber,
            pattern: { value: numberRegex, message: 'Please provide a valid house number' },
          })}
          helperText={formState.isSubmitted && errors[houseNumber]?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: validFields[houseNumber] && <InputCheckmark />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[addition]}
          required={!!required?.addition}
          name={addition}
          label='Addition'
          inputRef={register({ required: required?.addition })}
          helperText={formState.isSubmitted && errors[addition]?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: validFields[addition] && <InputCheckmark />,
          }}
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[postcode]}
          required={!!required?.postcode}
          name={postcode}
          label='Postcode'
          inputRef={register({ required: required?.postcode })}
          helperText={formState.isSubmitted && errors[postcode]?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: validFields[postcode] && <InputCheckmark />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[city]}
          required={!!required?.city}
          name={city}
          label='City'
          inputRef={register({ required: required?.city })}
          helperText={formState.isSubmitted && errors[city]?.message}
          disabled={disabled}
          InputProps={{
            endAdornment: validFields[city] && <InputCheckmark />,
          }}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          control={control}
          name={countryCode}
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
                  error={!!errors[countryCode]}
                  name={name}
                  label='Country'
                  inputRef={ref}
                  required={!!required?.countryCode}
                  helperText={errors[countryCode]?.message}
                  disabled={disabled}
                  onBlur={onBlur}
                />
              )}
            />
          )}
          InputProps={{
            endAdornment: validFields[countryCode] && <InputCheckmark />,
          }}
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
                    error={!!errors[regionId]}
                    name={name}
                    label='Region'
                    inputRef={ref}
                    required={!!required?.regionId}
                    helperText={errors[regionId]?.message}
                    disabled={disabled}
                    onBlur={onBlur}
                  />
                )}
              />
            )}
            InputProps={{
              endAdornment: validFields[regionId] && <InputCheckmark />,
            }}
          />
        )}
      </div>
    </>
  )
}
