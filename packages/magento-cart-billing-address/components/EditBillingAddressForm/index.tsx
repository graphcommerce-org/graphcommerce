import { useQuery } from '@apollo/client'
import { makeStyles, TextField } from '@material-ui/core'
import {
  AddressFields,
  ApolloCustomerErrorAlert,
  CustomerDocument,
  NameFields,
} from '@reachdigital/magento-customer'
import { CountryRegionsDocument } from '@reachdigital/magento-store'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  InputCheckmark,
} from '@reachdigital/next-ui'
import { phonePattern, useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { SetBillingAddressOnCartDocument } from '../../api/SetBillingAddressOnCart.gql'

const useStyles = makeStyles(
  () => ({
    editActions: {
      paddingBottom: 0,
    },
  }),
  { name: 'EditBillingAddressForm' },
)

type EditBillingAddressFormProps = { cartId: any; address: any } // TODO.. BillingAddressFragment?

export default function EditBillingAddressForm(props: EditBillingAddressFormProps) {
  const countries = useQuery(CountryRegionsDocument).data?.countries
  const { cartId, address } = props
  const classes = useStyles()
  const router = useRouter()

  const { data: customerQuery } = useQuery(CustomerDocument)

  console.log(customerQuery)

  // TODO: const {region} = useRegion(formData..)

  const form = useFormGqlMutation(
    SetBillingAddressOnCartDocument,
    {
      defaultValues: {
        addressId: 73,
        cartId: cartId ?? '',
        firstname: address?.firstname,
        lastname: address?.lastname,
        postcode: address?.postcode,
        city: address?.city,
        countryCode: address?.country.code,
        street: address?.street?.[0] ?? undefined,
        telephone: address?.telephone,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        houseNumber: address?.street?.[1],
        addition: address?.street?.[2],
      },
      onBeforeSubmit: (formData) => {
        // const region = countries
        //   ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
        //   ?.available_regions?.find((r) => r?.id === formData?.region)

        const a = 'b'

        // const regionData = {
        //   region:
        //     (region && {
        //       region: region.name,
        //       region_code: region.code,
        //       region_id: region.id,
        //     }) ??
        //     null,
        // }

        return {
          ...formData,
          // ...regionData,
        }
      },
      onComplete: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/checkout/payment')
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, required, error, muiRegister, valid } = form
  const submitHandler = handleSubmit(() => {})

  console.log(error)

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
