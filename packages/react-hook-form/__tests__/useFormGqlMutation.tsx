/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { renderHook } from '@testing-library/react'
import { TestShippingAddressFormDocument } from '../__mocks__/TestShippingAddressForm.gql'
import { useFormGqlMutation } from '../src/useFormGqlMutation'

describe('useFormGqlMutation', () => {
  const { result } = renderHook(() =>
    useFormGqlMutation(
      TestShippingAddressFormDocument,
      {},
      {
        client: new ApolloClient({
          cache: new InMemoryCache(),
        }),
      },
    ),
  )

  it('can register stuff', () => {
    result.current.register('address.telephone')
    result.current.register('customerNote')
    result.current.register('address.street.0')

    // @ts-expect-error should not be posssible
    result.current.register('address.street.hoi')
  })

  it('extracts required fields correctly', () => {
    expect(result.current.required).toEqual({ address: true, cartId: true, customerNote: false })
  })
  it('extracts defaults correctly', () => {
    expect(result.current.defaultVariables).toEqual({ customerNote: 'joi' })
  })
})
