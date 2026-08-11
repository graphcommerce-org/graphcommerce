import { addressValues } from './addressValues'
import type { FormattedAddress } from './formatAddress'

const emptyAddress: FormattedAddress = {
  street: '',
  houseNumber: '',
  addition: '',
  postcode: '',
  city: '',
  country: 'NL',
  region: '',
  regionCode: '',
}

describe('addressValues', () => {
  it('provides explicit empty values so a partial selection clears stale form data', () => {
    expect(addressValues(emptyAddress)).toEqual({
      street: '',
      houseNumber: '',
      addition: '',
      postcode: '',
      city: '',
      countryCode: 'NL',
      regionId: null,
    })
  })

  it('resolves the region when country metadata is available', () => {
    expect(
      addressValues({ ...emptyAddress, country: 'US', region: 'California', regionCode: 'CA' }, [
        {
          two_letter_abbreviation: 'US',
          available_regions: [{ id: 12, code: 'CA', name: 'California' }],
        },
      ]).regionId,
    ).toBe(12)
  })
})
