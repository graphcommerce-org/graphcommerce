import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { Form, FormActions, FormDivider, Button, MessageSnackbar } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { AddressFields } from '../AddressFields/AddressFields'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { NameFields } from '../NameFields/NameFields'
import { TelephoneField } from '../CustomerFields/TelephoneField'
import { CreateCustomerAddressDocument } from './CreateCustomerAddress.gql'

export function CreateCustomerAddressForm({ children }: PropsWithChildren) {
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

  const { handleSubmit, formState, error, data } = form
  const submitHandler = handleSubmit((_, e) => {
    if (!formState.errors) e?.target.reset()
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler} noValidate>
        {children ?? (
          <>
            <NameFields />
            <AddressFields />
            <TelephoneField />

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
            <ApolloCustomerErrorAlert />
            <MessageSnackbar open={Boolean(data) && !error} variant='pill'>
              <Trans id='Your address has been added' components={{ 0: <strong /> }} />
            </MessageSnackbar>
          </>
        )}
      </Form>
    </FormProvider>
  )
}
