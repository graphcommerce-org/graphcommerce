/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestShippingAddressFormDocument } from '../__mocks__/TestShippingAddressForm.graphql'
import { useFormGqlMutation } from '../src/useFormGqlMutation'

describe('useFormGqlMutation', () => {
  const { register, required, defaultVariables } = useFormGqlMutation(
    TestShippingAddressFormDocument,
  )

  it('can register stuff', () => {
    register('address.telephone')
    register('customerNote')
    register('address.street.0')

    // @ts-expect-error should not be posssible
    register('address.street.hoi')
  })

  it('extracts required fields correctly', () => {
    expect(required).toEqual({ address: true, cartId: true, customerNote: false })
  })
  it('extracts defaults correctly', () => {
    expect(defaultVariables).toEqual({ customerNote: 'joi' })
  })
})
