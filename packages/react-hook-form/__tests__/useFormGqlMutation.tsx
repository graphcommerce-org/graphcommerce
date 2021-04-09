/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestShippingAddressFormDocument } from '../__mocks__/TestShippingAddressForm.gql'
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

  const address = {
    cartId: '12',
    customerNote: 'hoi',
    address: {
      firstname: 'Paul',
      lastname: 'Hachmang',
      company: 'Reach Digital',
      country_code: 'NL',
      street: ['Noordplein 85', '3e etage'],
      city: 'Roelofarendsveen',
      telephone: '0654716972',
      postcode: '2371DJ',
      save_in_address_book: 'true',
    },
  }

  it('extracts required fields correctly', () => {
    expect(required).toEqual({ address: true, cartId: true, customerNote: false })
  })
  it('extracts defaults correctly', () => {
    expect(defaultVariables).toEqual({ customerNote: 'joi' })
  })
})
