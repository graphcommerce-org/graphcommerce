import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { useLazyQuery } from '@graphcommerce/graphql'
import { AddressFieldValues } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { postcodeNLDocument } from '../graphql/PostcodeNL.gql'

const postCodeRegex = /^[1-9][0-9]{3}[a-z]{2}$/i

const defaultPostcodeFieldnames = {
  postcode: 'postcode',
  houseNumber: 'houseNumber',
  addition: 'addition',
  street: 'street',
  city: 'city',
}

export function usePostcodeService(
  form: UseFormReturn<any>,
  fieldNames: AddressFieldValues = defaultPostcodeFieldnames,
) {
  const { watch, setValue, resetField } = form

  const postcode = watch(fieldNames.postcode ?? '', '') as string
  const houseNumber = watch(fieldNames.houseNumber ?? '', '') as string
  const addition = watch(fieldNames.addition ?? '', '') as string
  const [execute, result] = useLazyQuery(postcodeNLDocument)

  useEffect(() => {
    if (!houseNumber || !postcode || !postCodeRegex.test(postcode.trim().replace(/ /g, '')))
      return () => {}

    const handler = () =>
      execute({
        variables: {
          postcode: postcode.trim().replace(/ /g, ''),
          housenumber: addition ? houseNumber + addition : houseNumber,
        },
      })
    const clear = setTimeout(handler, 300)

    return () => clearInterval(clear)
  }, [execute, houseNumber, postcode, addition])

  if (process.env.NODE_ENV !== 'production') {
    if (result.error) {
      console.warn(result.error)
    }
  }

  useEffect(() => {
    const { street, city } = result.data?.postcodeNL ?? {}
    if (street && city) {
      setValue(fieldNames.street ?? '', street, { shouldValidate: true })
      setValue(fieldNames.city ?? '', city, { shouldValidate: true })
    } else {
      resetField(fieldNames.street ?? '')
      resetField(fieldNames.city ?? '')
    }
  }, [result.data?.postcodeNL, setValue, resetField, fieldNames.street, fieldNames.city])
  return [result.data?.postcodeNL, result.loading] as const
}
