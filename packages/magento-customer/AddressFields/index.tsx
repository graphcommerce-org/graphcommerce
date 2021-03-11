import { TextField, TextFieldProps } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { Autocomplete } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
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
    countryCode: string
    disableFields: boolean
    fieldOptions: { [key: string]: FieldOptions }
  }

export default function AddressFields(props: AddressFieldsProps) {
  const {
    errors,
    register,
    watch,
    formState,
    control,
    countryCode,
    countries,
    disableFields,
    fieldOptions,
  } = props
  const classes = useFormStyles()

  const country = watch(fieldOptions.countryCode.name) ?? countryCode
  const regionId = watch(fieldOptions.regionId.name)

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

  return (
    <>
      <div className={classes.formRow} key='street'>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.street}
          name={fieldOptions.street.name}
          label='Street'
          required={!!required.street}
          inputRef={register({ required: required.street })}
          helperText={formState.isSubmitted && errors.street?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: !errors.street && <CheckIcon className={classes.checkmark} />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.houseNumber}
          name={fieldOptions.houseNumber.name}
          label='Housenumber'
          required={!!required.houseNumber}
          inputRef={register({
            required: required.houseNumber,
            pattern: { value: houseNumber, message: 'Please provide a valid house number' },
          })}
          helperText={formState.isSubmitted && errors.houseNumber?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: !errors.houseNumber && <CheckIcon className={classes.checkmark} />,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.addition}
          required={!!required.addition}
          name={fieldOptions.addition.name}
          label='Addition'
          inputRef={register({ required: required.addition })}
          helperText={formState.isSubmitted && errors.addition?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: !errors.addition && <CheckIcon className={classes.checkmark} />,
          }}
        />
      </div>
      <div className={classes.formRow} key='postcode-city'>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.postcode}
          required={!!required.postcode}
          name={fieldOptions.postcode.name}
          label='Postcode'
          inputRef={register({ required: required.postcode })}
          helperText={formState.isSubmitted && errors.postcode?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: !errors.postcode && !!watch('postcode') && (
              <CheckIcon className={classes.checkmark} />
            ),
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.city}
          required={!!required.city}
          name={fieldOptions.city.name}
          label='City'
          inputRef={register({ required: required.city })}
          helperText={formState.isSubmitted && errors.city?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: !errors.city && <CheckIcon className={classes.checkmark} />,
          }}
        />
      </div>
      <div className={classes.formRow} key='countryRegion'>
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
                  error={!!errors.countryCode}
                  name={name}
                  label='Country'
                  required={!!required.countryCode}
                  helperText={errors.countryCode?.message}
                  disabled={disableFields}
                  onBlur={onBlur}
                />
              )}
            />
          )}
          InputProps={{
            endAdornment: !errors.countryCode && <CheckIcon color='primary' />,
          }}
        />
        {regionList.length > 0 && (
          <Controller
            defaultValue={regionId ?? ''}
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
                    error={!!errors.regionId}
                    name={name}
                    label='Region'
                    required={!!required.regionId}
                    helperText={errors.regionId?.message}
                    disabled={disableFields}
                    onBlur={onBlur}
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
