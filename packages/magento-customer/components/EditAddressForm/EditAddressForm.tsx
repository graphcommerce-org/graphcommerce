import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { Button, Form, FormActions, FormDivider } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import { AddressFields } from '../AddressFields/AddressFields'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { TelephoneField } from '../CustomerFields/TelephoneField'
import { NameFields } from '../NameFields/NameFields'
import { UpdateCustomerAddressDocument } from './UpdateCustomerAddress.gql'

type EditAddressFormProps = {
  address?: AccountAddressFragment
  sx?: SxProps<Theme>
  onCompleteRoute?: string
  children?: React.ReactNode
}

export function EditAddressForm(props: EditAddressFormProps) {
  const countryQuery = useQuery(CountryRegionsDocument, { fetchPolicy: 'cache-and-network' })
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries
  const { address, sx, children } = props

  const { closeSteps } = usePageContext()
  const onComplete = useGo(closeSteps * -1)

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
        houseNumber: address?.street?.[1] ?? '',
        addition: address?.street?.[2] ?? '',
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
      onComplete,
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler} noValidate sx={sx}>
        {children ?? (
          <>
            <NameFields prefixes={false} />
            <AddressFields />
            <TelephoneField />
            <FormDivider />
            <FormActions sx={{ paddingBottom: 0 }}>
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
          </>
        )}
      </Form>
    </FormProvider>
  )
}
