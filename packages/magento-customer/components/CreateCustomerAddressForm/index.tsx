import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import {
  Form,
  FormActions,
  FormDivider,
  FormRow,
  InputCheckmark,
  Button,
} from '@graphcommerce/next-ui'
import { phonePattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans, t } from '@lingui/macro'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import AddressFields from '../AddressFields'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import NameFields from '../NameFields'
import { CreateCustomerAddressDocument } from './CreateCustomerAddress.gql'

export default function CreateCustomerAddressForm() {
  const countries = useQuery(CountryRegionsDocument).data?.countries
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
      onComplete: (e) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/account/addresses/edit?addressId=${e.data?.createCustomerAddress?.id}`)
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, required, error, muiRegister, valid } = form
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
            label={<Trans>Telephone</Trans>}
            {...muiRegister('telephone', {
              required: required.telephone,
              pattern: { value: phonePattern, message: t`Invalid phone number` },
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
            variant='contained'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            <Trans>Save changes</Trans>
          </Button>
        </FormActions>
      </Form>

      <ApolloCustomerErrorAlert error={error} />
    </>
  )
}
