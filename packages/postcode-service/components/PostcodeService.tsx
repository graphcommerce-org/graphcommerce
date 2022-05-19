import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { useLazyQuery } from '@graphcommerce/graphql'
import { useEffect } from 'react'
import { PostcodeDocument } from './Postcode.gql'
import { PostcodeFieldsFragment } from './PostcodeFields.gql'

const postCodeRegex = /^[1-9][0-9]{3}[a-z]{2}$/i

type PostcodeFieldnames = {
  postcode: string
  houseNumber: string
  street: string
  city: string
}

const defaultPostcodeFieldnames = {
  postcode: 'postcode',
  houseNumber: 'houseNumber',
  street: 'street',
  city: 'city',
}

export function usePostcodeService(
  form: UseFormReturn<any>,
  fieldNames: PostcodeFieldnames = defaultPostcodeFieldnames,
): readonly [PostcodeFieldsFragment | null | undefined, boolean] {
  const { watch, setValue, resetField } = form

  const postcode = watch(fieldNames.postcode, '') as string
  const houseNumber = watch(fieldNames.houseNumber, '') as string
  const [execute, result] = useLazyQuery(PostcodeDocument)

  useEffect(() => {
    if (!houseNumber || !postcode || !postCodeRegex.test(postcode.trim())) return () => {}

    const handler = () => execute({ variables: { postcode, houseNumber } })
    const clear = setTimeout(handler, 300)

    return () => clearInterval(clear)
  }, [execute, houseNumber, postcode])

  if (process.env.NODE_ENV !== 'production') {
    if (result.error) {
      console.warn(result.error)
    }
  }

  useEffect(() => {
    const { success, straatnaam, woonplaats } = result.data?.postcodeServiceNL ?? {}
    if (success && straatnaam && woonplaats) {
      setValue(fieldNames.street, straatnaam)
      setValue(fieldNames.city, woonplaats)
    } else {
      resetField(fieldNames.street)
      resetField(fieldNames.city)
    }
  }, [result.data?.postcodeServiceNL, setValue, resetField, fieldNames.street, fieldNames.city])
  return [result.data?.postcodeServiceNL, result.loading] as const
}
