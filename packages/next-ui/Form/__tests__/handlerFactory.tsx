import { TextField } from '@material-ui/core'
import { TestShippingAddressFormDocument } from '../__mocks__/TestShippingAddressForm.gql'
import handlerFactory from '../handlerFactory'

describe('useMutationForm/nestedToFlat', () => {
  const { required, defaultVariables: defaults, encode, validate, Field } = handlerFactory(
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
  it('validates objects correctly', () => {
    expect(validate({ address: { city: 'roeloe' } })).toBe(false)
    expect(validate(address)).toBe(true)
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
  it('Field component', () => {
    const myField = <Field Component={TextField} name='customerNote' />
    const cartComponent = <Field Component={TextField} name='cartId' />
    const customerNode = <Field Component={TextField} name='customerNote' />
    const firstName = <Field Component={TextField} name='address.firstname' />
    const streetOne = <Field Component={TextField} name='address.street[0]' />
    const streetTwo = <Field Component={TextField} name='address.street[1]' />

    const wrongNestedField = <Field Component={TextField} name='address.street[]' />

    // typescript 4.1 support not yet available. @-ts-expect-error the field is not allowed
    const wrongField = <Field Component={TextField} name='asdf' />

    // typescript 4.1 support not yet available. @-ts-expect-error the field is not allowed, should use address.street[]
    const wrongField2 = <Field Component={TextField} name='address.street[1000]' />
  })
})
