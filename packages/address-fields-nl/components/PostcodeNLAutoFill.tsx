import { FieldPath, FieldValues, FormAutoSubmit, PathValue } from '@graphcommerce/ecommerce-ui'
import { useApolloClient } from '@graphcommerce/graphql'
import { AddressFieldsOptions, useAddressFieldsForm } from '@graphcommerce/magento-customer'
import { useEventCallback } from '@mui/material'
import { PostCodeNLDocument } from '../graphql/PostcodeNL.gql'

const postCodeRegex = /^[1-9][0-9]{3}[a-z]{2}$/i

export function PostcodeNLAutoFill<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: AddressFieldsOptions<TFieldValues, TName>) {
  const { control, name, getValues, setValue } = useAddressFieldsForm(options)

  const client = useApolloClient()

  const submit = useEventCallback(async () => {
    const postcodeRaw = getValues(name.postcode) as string
    const housenumber = getValues(name.houseNumber) as string
    const addition = getValues(name.addition) as string
    const country = getValues(name.countryCode) as string

    if (!housenumber || !postcodeRaw || country !== 'NL') return

    const postcode = postcodeRaw.trim().replace(/ /g, '')
    if (!postCodeRegex.test(postcode)) return

    const result = await client.query({
      query: PostCodeNLDocument,
      variables: { postcode, housenumber: `${housenumber}${addition ?? ''}` },
      // fetchPolicy: process.env.NODE_ENV !== 'production' ? 'no-cache' : 'cache-first',
    })

    const { street, city } = result.data?.postcodeNL ?? {}
    if (street && city) {
      setValue(name.street, street as PathValue<TFieldValues, TName>)
      setValue(name.city, city as PathValue<TFieldValues, TName>)
    } else {
      setValue(name.street, '' as PathValue<TFieldValues, TName>)
      setValue(name.city, '' as PathValue<TFieldValues, TName>)
    }
  })

  return (
    <FormAutoSubmit
      initialWait={0}
      control={control}
      submit={submit}
      noValidate
      name={[name.postcode, name.houseNumber, name.addition, name.countryCode]}
    />
  )
}
