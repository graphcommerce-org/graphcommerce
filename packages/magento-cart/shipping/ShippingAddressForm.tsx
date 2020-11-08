import { useQuery } from '@apollo/client'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import Button from '@reachdigital/next-ui/Button'
import { Controller, useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { houseNumber, phonePattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import React, { useMemo, useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { CountryRegionsQuery } from '../countries/CountryRegions.gql'
import { ShippingAddressFormDocument } from './ShippingAddressForm.gql'

type ShippingAddressFormProps = CountryRegionsQuery

export default function ShippingAddressForm(props: ShippingAddressFormProps) {
  const { countries } = props
  const classes = useFormStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })

  const isCustomer = !!customerQuery?.customer
  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const currentCustomer = customerQuery?.customer

  const mutationForm = useMutationForm(ShippingAddressFormDocument, {
    defaultValues: {
      cartId: cartQuery?.cart?.id,
      address: {
        firstname: currentCustomer?.firstname ?? undefined,
        lastname: currentCustomer?.lastname ?? undefined,
        ...currentAddress,
        region: currentAddress?.region?.label,
        region_id: currentAddress?.region?.region_id,

        // todo: replace by the default shipping country of the store
        // todo: implement geo ip header
        country_code: currentAddress?.country.code ?? 'NL',
        save_in_address_book: true,
      },
    },
  })
  const { register, errors, handleSubmit, Field, control, formState, watch } = mutationForm

  const country = watch('address.country_code')
  const regionId = watch('address.region_id')
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
    <form onSubmit={handleSubmit} noValidate className={classes.form}>
      <div className={classes.formRow}>
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.firstname}
          name='address.firstname'
          label='First Name'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.firstname?.message}
          disabled={formState.isSubmitting}
        />
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.lastname}
          name='address.lastname'
          label='Last Name'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.lastname?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <div className={classes.formRow}>
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.street?.[0]}
          name='address.street[0]'
          label='Street'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.street?.[0]?.message}
          disabled={formState.isSubmitting}
        />
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.street?.[1]}
          name='address.street[1]'
          label='Housenumber'
          required
          inputRef={register({
            required: true,
            pattern: { value: houseNumber, message: 'Please provide a valid house number' },
          })}
          helperText={formState.isSubmitted && errors.address?.street?.[1]?.message}
          disabled={formState.isSubmitting}
        />
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.street?.[2]}
          name='address.street[2]'
          label='Addition'
          inputRef={register({ required: false })}
          helperText={formState.isSubmitted && errors.address?.street?.[2]?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <div className={classes.formRow}>
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.postcode}
          name='address.postcode'
          label='Postcode'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.postcode?.message}
          disabled={formState.isSubmitting}
        />
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.city}
          name='address.city'
          label='City'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.city?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <div className={classes.formRow}>
        <Field
          Component={Controller}
          defaultValue={country ?? ''}
          control={control}
          name='address.country_code'
          rules={{ required: true }}
          render={({ onChange, name, value, onBlur }) => {
            // todo: implement default selected country?
            return (
              <Autocomplete
                defaultValue={null}
                value={countryList?.find((c) => c?.two_letter_abbreviation === value)}
                options={countryList}
                getOptionLabel={(option) =>
                  `${option?.full_name_locale} (${option?.three_letter_abbreviation})`
                }
                onChange={(e, input) => {
                  onChange(input?.two_letter_abbreviation)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    error={!!errors.address?.country_code}
                    name={name}
                    label='Country'
                    required
                    helperText={errors.address?.country_code?.message}
                    disabled={formState.isSubmitting}
                    onBlur={onBlur}
                  />
                )}
              />
            )
          }}
        />
        {regionList.length > 0 && (
          <Field
            defaultValue={regionId ?? ''}
            Component={Controller}
            control={control}
            name='address.region_id'
            rules={{ required: true }}
            render={({ onChange, name, value, onBlur }) => {
              // todo: implement default selected country?
              return (
                <Autocomplete
                  defaultValue={null}
                  value={regionList?.find((c) => c?.id === value)}
                  options={regionList}
                  getOptionLabel={(option) => `${option?.name}`}
                  onChange={(e, input) => {
                    onChange(input?.id)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      error={!!errors.address?.region_id}
                      name={name}
                      label='Region'
                      required
                      helperText={errors.address?.region_id?.message}
                      disabled={formState.isSubmitting}
                      onBlur={onBlur}
                    />
                  )}
                />
              )
            }}
          />
        )}
      </div>
      <div className={classes.formRow}>
        <Field
          Component={TextField}
          variant='outlined'
          type='text'
          error={!!errors.address?.telephone}
          name='address.telephone'
          label='Telephone'
          required
          inputRef={register({
            required: true,
            pattern: { value: phonePattern, message: 'Invalid phone number' },
          })}
          helperText={formState.isSubmitted && errors.address?.telephone?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <Button type='submit' disabled={formState.isSubmitting} variant='pill' disableElevation>
        Save shipping
      </Button>
      {errors.submission?.message}
    </form>
  )
}
