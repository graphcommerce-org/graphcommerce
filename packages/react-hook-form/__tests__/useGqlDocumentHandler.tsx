import { TestShippingAddressFormDocument } from '../__mocks__/TestShippingAddressForm.gql'
import { handlerFactory } from '../src/useGqlDocumentHandler'

describe('useGqlDocumentHandler', () => {
  const { required, defaultVariables: defaults, encode } = handlerFactory(
    TestShippingAddressFormDocument,
  )

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
    expect(defaults).toEqual({ customerNote: 'joi' })
  })

  it('encodes objects correctly', () => {
    const result = encode(address)
    expect(result).toEqual({
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
        save_in_address_book: true,
      },
    })
  })
})
