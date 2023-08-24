import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import {
  Form,
  FormActions,
  FormDivider,
  FormRow,
  InputCheckmark,
  Button,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { phonePattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { AddressFields } from '../AddressFields/AddressFields'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { NameFields } from '../NameFields/NameFields'
import { CreateCustomerAddressDocument } from './CreateCustomerAddress.gql'

export function CreateCustomerAddressForm() {
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const router = useRouter()

  const form = useFormGqlMutation(
    CreateCustomerAddressDocument,
    {
      onBeforeSubmit: (formData) => {
        const region = countries
          ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
          ?.available_regions?.find((r) => r?.id === formData.region)

        return {
          ...formData,
          region:
            (region && {
              region: region.name,
              region_code: region.code,
              region_id: region.id,
            }) ??
            {},
        }
      },
      onComplete: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/account/addresses`)
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, required, error, muiRegister, valid, data } = form
  const submitHandler = handleSubmit((_, e) => {
    if (!formState.errors) e?.target.reset()
  })

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
            label={<Trans id='Telephone' />}
            {...muiRegister('telephone', {
              required: required.telephone,
              pattern: { value: phonePattern, message: i18n._(/* i18n */ 'Invalid phone number') },
            })}
            helperText={formState.isSubmitted && formState.errors.telephone?.message}
            disabled={formState.isSubmitting}
            InputProps={{ endAdornment: <InputCheckmark show={valid.telephone} /> }}
          />
        </FormRow>

        <FormDivider />

        <FormActions>
          <Button
            type='submit'
            variant='pill'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            <Trans id='Save changes' />
          </Button>
        </FormActions>
      </Form>

      <MessageSnackbar open={Boolean(data) && !error} variant='pill'>
        <Trans id='Your address has been added' components={{ 0: <strong /> }} />
      </MessageSnackbar>

      <ApolloCustomerErrorAlert error={error} />
    </>
  )
}
