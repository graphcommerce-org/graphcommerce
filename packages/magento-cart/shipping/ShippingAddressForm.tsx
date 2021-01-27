import { useQuery } from '@apollo/client'
import { cloneDeep } from '@apollo/client/utilities'
import { TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { Autocomplete } from '@material-ui/lab'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import Button from '@reachdigital/next-ui/Button'
import { Controller, useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import useMutationFormPersist from '@reachdigital/next-ui/useMutationForm/useMutationFormPersist'
import { houseNumber, phonePattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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

  const mutationForm = useMutationForm(ShippingAddressFormDocument, {
    defaultValues: {
      cartId: cartQuery?.cart?.id,
      // todo(paales): change to something more sustainable
      address: {
        firstname: currentAddress?.firstname ?? currentCustomer?.firstname ?? undefined, // todo: allow for null values in defaultValues
        lastname: currentAddress?.lastname ?? currentCustomer?.lastname ?? undefined,
        // telephone: currentAddress?.telephone,
        city: currentAddress?.city,
        company: currentAddress?.company,
        // postcode: currentAddress?.postcode,
        street: currentAddress?.street,
        region: currentAddress?.region?.label,
        region_id: currentAddress?.region?.region_id,
        // todo: replace by the default shipping country of the store
        // todo: implement geo ip location
        country_code: currentAddress?.country.code ?? 'NL',
        save_in_address_book: true,
      },
    },
    onBeforeSubmit: (variables) => {
      variables.address.telephone ||= '000 0000 000'
      return variables
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
  const { register, errors, handleSubmit, control, formState, watch } = mutationForm

  // Als isValid en isDirty en !isSubmitting, dan het formulier submitten

  useEffect(() => {
    if (!formState.isValid || !formState.isDirty || formState.isSubmitting) return

    console.log('joejoeleoe')

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // handleSubmit()

    console.log('nu lekker submitten')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // handleSubmit()
    // Submitten
    // isDirty resetten als er nieuwe values zijn
    // Weer op isDirty zetten als er in de tussentijd toch dingen zijn veranderd??
  }, [formState.isValid, formState.isDirty, handleSubmit, formState.isSubmitting])

  // todo: Move to a validateAndSubmit method or something?
  useEffect(() => {
    doSubmit.current = async () =>
      !formState.isDirty ? Promise.resolve(true) : handleSubmit().then(() => true)
  }, [doSubmit, formState.isDirty, handleSubmit])

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
    <form onSubmit={handleSubmit} noValidate className={classes.form} ref={ref}>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.firstname}
          name='address.firstname'
          label='First Name'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.firstname?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.firstname && watch('address.firstname') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.lastname}
          name='address.lastname'
          label='Last Name'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.lastname?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.lastname && watch('address.lastname') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.street?.[0]}
          name='address.street[0]'
          label='Street'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.street?.[0]?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.street?.[0] && watch('address.street[0]') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
        <TextField
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
          InputProps={{
            endAdornment:
              !errors.address?.street?.[1] && watch('address.street[1]') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.street?.[2]}
          name='address.street[2]'
          label='Addition'
          inputRef={register({ required: false })}
          helperText={formState.isSubmitted && errors.address?.street?.[2]?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.street?.[2] && watch('address.street[2]') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.postcode}
          name='address.postcode'
          label='Postcode'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.postcode?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.postcode && watch('address.postcode') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.city}
          name='address.city'
          label='City'
          required
          inputRef={register({ required: true })}
          helperText={formState.isSubmitted && errors.address?.city?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.city && watch('address.city') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          defaultValue={country ?? ''}
          control={control}
          name='address.country_code'
          rules={{ required: true }}
          render={({ onChange, name, value, onBlur }) => (
            // todo: implement default selected country?
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
          )}
          InputProps={{
            endAdornment: !errors.address?.country_code && <CheckIcon color='primary' />,
          }}
        />
        {regionList.length > 0 && (
          <Controller
            defaultValue={regionId ?? ''}
            control={control}
            name='address.region_id'
            rules={{ required: true }}
            render={({ onChange, name, value, onBlur }) => (
              // todo: implement default selected country?
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
                    InputProps={{
                      endAdornment:
                        !errors.address?.region_id && watch('address.region_id') ? (
                          <CheckIcon className={classes.checkmark} />
                        ) : (
                          <></>
                        ),
                    }}
                  />
                )}
              />
            )}
          />
        )}
      </div>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.address?.telephone}
          name='address.telephone'
          label='Telephone'
          required
          inputRef={register({
            // required: true,
            pattern: { value: phonePattern, message: 'Invalid phone number' },
          })}
          helperText={formState.isSubmitted && errors.address?.telephone?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment:
              !errors.address?.telephone && watch('address.telephone') ? (
                <CheckIcon className={classes.checkmark} />
              ) : (
                <></>
              ),
          }}
        />
      </div>
      <Button type='submit' disabled={formState.isSubmitting} variant='pill' disableElevation>
        Save shipping address
      </Button>
      {errors.submission?.message}
    </form>
  )
}
