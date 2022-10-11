import { TestShippingAddressFormDocument } from '../__mocks__/TestShippingAddressForm.gql'
import { handlerFactory } from '../src/useGqlDocumentHandler'

describe('useGqlDocumentHandler', () => {
  const {
    required,
    defaultVariables: defaults,
    encode,
  } = handlerFactory(TestShippingAddressFormDocument)

  const address = {
    cartId: '12',
    customerNote: 'hoi',
    address: {
      firstname: 'Firstname',
      lastname: 'Lastname',
      company: 'GraphComemrce',
      country_code: 'NL',
      street: ['Streetline 1', 'Streetline 2'],
      city: 'City',
      telephone: '0987654321',
      postcode: '1234AB',
      save_in_address_book: true,
    },
  }

  it('extracts required fields correctly', () => {
    expect(required).toEqual({ address: true, cartId: true, customerNote: false })
  })
  it('extracts defaults correctly', () => {
    expect(defaults).toEqual({ customerNote: 'joi' })
  })

  it('encodes objects correctly', () => {
    const result = encode(address)
    expect(result).toEqual({
      cartId: '12',
      customerNote: 'hoi',
      address: {
        firstname: 'Firstname',
        lastname: 'Lastname',
        company: 'GraphComemrce',
        country_code: 'NL',
        street: ['Streetline 1', 'Streetline 2'],
        city: 'City',
        telephone: '0987654321',
        postcode: '1234AB',
        save_in_address_book: true,
      },
    })
  })
})
