import { useQuery } from '@apollo/client'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  InputCheckmark,
} from '@graphcommerce/next-ui'
import { phonePattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { makeStyles, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import AddressFields from '../AddressFields'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import NameFields from '../NameFields'
import { UpdateCustomerAddressDocument } from './UpdateCustomerAddress.gql'

const useStyles = makeStyles(
  () => ({
    editActions: {
      paddingBottom: 0,
    },
  }),
  { name: 'EditAddressForm' },
)

type EditAddressFormProps = { address?: AccountAddressFragment }

export default function EditAddressForm(props: EditAddressFormProps) {
  const countries = useQuery(CountryRegionsDocument).data?.countries
  const { address } = props
  const classes = useStyles()
  const router = useRouter()

  const form = useFormGqlMutation(
    UpdateCustomerAddressDocument,
    {
      defaultValues: {
        id: address?.id ?? undefined,
        firstname: address?.firstname,
        lastname: address?.lastname,
        street: address?.street?.[0] ?? undefined,
        postcode: address?.postcode,
        city: address?.city,
        countryCode: address?.country_code,
        telephone: address?.telephone,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        houseNumber: address?.street?.[1],
        addition: address?.street?.[2],
      },
      onBeforeSubmit: (formData) => {
        const region = countries
          ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
          ?.available_regions?.find((r) => r?.id === formData.region)
        const regionData = {
          region:
            (region && {
              region: region.name,
              region_code: region.code,
              region_id: region.id,
            }) ??
            null,
        }

        return {
          ...formData,
          ...regionData,
        }
      },
      onComplete: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/account/addresses')
      },
    },
    { errorPolicy: 'all' },
  )

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
            text='bold'
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
