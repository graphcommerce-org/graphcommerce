import { useQuery } from '@apollo/client'
import { useHistoryGo } from '@graphcommerce/framer-next-pages'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  AddressFields,
  ApolloCustomerErrorAlert,
  NameFields,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  InputCheckmark,
  UseStyles,
} from '@graphcommerce/next-ui'
import { phonePattern } from '@graphcommerce/react-hook-form'
import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { GetBillingAddressDocument } from './GetBillingAddress.gql'
import { SetBillingAddressOnCartDocument } from './SetBillingAddressOnCart.gql'

const useStyles = makeStyles(
  () => ({
    editActions: {
      paddingBottom: 0,
    },
  }),
  { name: 'EditBillingAddressForm' },
)

type EditBillingAddressFormProps = UseStyles<typeof useStyles>

export default function EditBillingAddressForm(props: EditBillingAddressFormProps) {
  const countriesData = useQuery(CountryRegionsDocument).data
  const address = useCartQuery(GetBillingAddressDocument)?.data?.cart?.billing_address
  const classes = useStyles(props)
  const goToCheckout = useHistoryGo({ href: '/checkout/payment' })

  const form = useFormGqlMutationCart(SetBillingAddressOnCartDocument, {
    defaultValues: {
      firstname: address?.firstname,
      lastname: address?.lastname,
      postcode: address?.postcode ?? undefined,
      city: address?.city,
      countryCode: address?.country.code,
      street: address?.street?.[0] ?? undefined,
      telephone: address?.telephone,
      houseNumber: address?.street?.[1] ?? undefined,
      addition: address?.street?.[2] ?? undefined,
    },
    onBeforeSubmit: (variables) => {
      const regionId = countriesData?.countries
        ?.find((country) => country?.two_letter_abbreviation === variables.countryCode)
        ?.available_regions?.find((region) => region?.id === variables.regionId)?.id

      return {
        ...variables,
        telephone: variables.telephone || '000 - 000 0000',
        regionId,
      }
    },
    onComplete: goToCheckout,
  })

  const { handleSubmit, formState, required, error, muiRegister, valid } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <>
      <Form onSubmit={submitHandler} noValidate>
        <NameFields form={form} prefix />
        <AddressFields form={form} />

        <FormRow>
          <TextField
            variant='outlined'
            type='text'
            error={!!formState.errors.telephone}
            required={required.telephone}
            label='Telephone'
            {...muiRegister('telephone', {
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && formState.errors.telephone?.message}
            disabled={formState.isSubmitting}
            InputProps={{ endAdornment: <InputCheckmark show={valid.telephone} /> }}
          />
        </FormRow>

        <FormDivider />

        <FormActions classes={{ root: classes.editActions }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            Save changes
          </Button>
        </FormActions>
      </Form>

      <ApolloCustomerErrorAlert error={error} />
    </>
  )
}
