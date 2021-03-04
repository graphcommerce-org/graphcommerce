import { useQuery } from '@apollo/client'
import { FormControl, FormHelperText, TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { Autocomplete } from '@material-ui/lab'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller } from '@reachdigital/react-hook-form/useForm'
import useFormAutoSubmit from '@reachdigital/react-hook-form/useFormAutoSubmit'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import useFormPersist from '@reachdigital/react-hook-form/useFormPersist'
import { houseNumber, phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { CountryRegionsQuery } from '../countries/CountryRegions.gql'
import { ShippingAddressFormDocument } from './ShippingAddressForm.gql'

type ShippingAddressFormProps = CountryRegionsQuery & {
  doSubmit: React.MutableRefObject<(() => Promise<boolean>) | undefined>
}

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
  const { countries, doSubmit } = props
  const classes = useFormStyles()
  const ref = useRef<HTMLFormElement>(null)
  const { data: cartQuery } = useQuery(ClientCartDocument)
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const currentCustomer = customerQuery?.customer
  const currentCountryCode = currentAddress?.country.code ?? 'NLD'

  const form = useFormGqlMutation(ShippingAddressFormDocument, {
    defaultValues: {
      cartId: cartQuery?.cart?.id,
      // todo(paales): change to something more sustainable
      firstname: currentAddress?.firstname ?? currentCustomer?.firstname ?? undefined, // todo: allow for null values in defaultValues
      lastname: currentAddress?.lastname ?? currentCustomer?.lastname ?? undefined,
      telephone:
        currentAddress?.telephone !== '000 - 000 0000' ? currentAddress?.telephone : undefined,
      city: currentAddress?.city,
      company: currentAddress?.company,
      postcode: currentAddress?.postcode ?? '',
      street: currentAddress?.street?.[0] ?? undefined,
      houseNumber: currentAddress?.street?.[1] ?? undefined,
      addition: currentAddress?.street?.[2] ?? undefined,
      region: currentAddress?.region?.label,
      regionId: currentAddress?.region?.region_id,
      countryCode: currentCountryCode, // todo: replace by the default shipping country of the store + geoip
    },
    mode: 'onChange',
    onBeforeSubmit: (variables) => {
      const regionId = countries
        ?.find((country) => country?.two_letter_abbreviation === variables.countryCode)
        ?.available_regions?.find((region) => region?.id === variables.regionId)?.id
      return { ...variables, regionId, saveInAddressBook: true, customerNote: '' }
    },
  })
  const { register, errors, handleSubmit, control, formState, required, watch, error } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: 'ShippingAddressForm' })
  const autoSubmitting = useFormAutoSubmit({
    form,
    submit,
    fields: ['postcode', 'countryCode', 'regionId'],
  })
  const disableFields = formState.isSubmitting && !autoSubmitting

  // todo: Move to a validateAndSubmit method or something?
  useEffect(() => {
    doSubmit.current = async () =>
      !formState.isDirty ? Promise.resolve(true) : submit().then(() => true)
  }, [doSubmit, formState.isDirty, submit])

  const country = watch('countryCode') ?? currentCountryCode
  const regionId = watch('regionId')
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

  return (
    <form onSubmit={submit} noValidate className={classes.form} ref={ref}>
      <AnimatePresence initial={false}>
        <div className={classes.formRow} key='firstname'>
          <TextField
            variant='outlined'
            type='text'
            name='firstname'
            label='First Name'
            required={required.firstname}
            inputRef={register({ required: required.firstname })}
            disabled={disableFields}
            error={!!errors.firstname}
            helperText={formState.isSubmitted && errors.firstname?.message}
            InputProps={{
              endAdornment: !errors.firstname && <CheckIcon className={classes.checkmark} />,
            }}
          />
          <TextField
            variant='outlined'
            type='text'
            error={!!errors.lastname}
            name='lastname'
            label='Last Name'
            required={required.lastname}
            inputRef={register({ required: required.lastname })}
            helperText={formState.isSubmitted && errors.lastname?.message}
            disabled={disableFields}
            InputProps={{
              endAdornment: !errors.lastname && <CheckIcon className={classes.checkmark} />,
            }}
          />
        </div>
        <div className={classes.formRow} key='street'>
          <TextField
            variant='outlined'
            type='text'
            error={!!errors.street}
            name='street'
            label='Street'
            required={required.street}
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
            name='houseNumber'
            label='Housenumber'
            required={required.houseNumber}
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
            required={required.addition}
            name='addition'
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
            required={required.postcode}
            name='postcode'
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
            required={required.city}
            name='city'
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
            name='countryCode'
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
                    required={required.countryCode}
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
              name='regionId'
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
                      required={required.regionId}
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

        <div className={classes.formRow} key='telephone'>
          <TextField
            variant='outlined'
            type='text'
            error={!!errors.telephone}
            required={required.telephone}
            name='telephone'
            label='Telephone'
            inputRef={register({
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && errors.telephone?.message}
            disabled={disableFields}
            InputProps={{
              endAdornment: !errors.telephone && <CheckIcon className={classes.checkmark} />,
            }}
          />
        </div>

        <ApolloErrorAlert error={error} />
      </AnimatePresence>
    </form>
  )
}
