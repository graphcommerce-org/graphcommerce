import type { AddressComponent } from './formatAddress'
import { formatAddress } from './formatAddress'

function component(longText: string, shortText: string, types: string[]): AddressComponent {
  return { longText, shortText, types }
}

describe('formatAddress', () => {
  it('maps a selected address to the GraphCommerce address fields', () => {
    const result = formatAddress({
      addressComponents: [
        component('221B', '221B', ['premise', 'street_number']),
        component('Baker Street', 'Baker St', ['political', 'route']),
        component('Flat A', 'A', ['subpremise']),
        component('London', 'London', ['postal_town']),
        component('England', 'ENG', ['administrative_area_level_1']),
        component('United Kingdom', 'GB', ['country']),
        component('NW1 6XE', 'NW1 6XE', ['postal_code']),
      ],
    })

    expect(result).toEqual({
      street: 'Baker Street',
      houseNumber: '221B',
      addition: 'A',
      postcode: 'NW1 6XE',
      city: 'London',
      country: 'GB',
      region: 'England',
      regionCode: 'ENG',
    })
  })

  it('uses locality first and falls back to sublocality for cities', () => {
    const locality = formatAddress({
      addressComponents: [
        component('Montréal', 'Montréal', ['locality']),
        component('Outremont', 'Outremont', ['sublocality_level_1']),
      ],
    })
    const sublocality = formatAddress({
      addressComponents: [component('Brooklyn', 'Brooklyn', ['sublocality_level_1'])],
    })

    expect(locality.city).toBe('Montréal')
    expect(sublocality.city).toBe('Brooklyn')
  })

  it('maps a Dutch street-number suffix to the addition field', () => {
    const result = formatAddress({
      addressComponents: [
        component('94a', '94a', ['street_number']),
        component('Noordeinde', 'Noordeinde', ['route']),
        component('Nederland', 'NL', ['country']),
      ],
    })

    expect(result.houseNumber).toBe('94')
    expect(result.addition).toBe('a')
  })

  it('recognizes postal-code prefixes and suffixes', () => {
    expect(
      formatAddress({
        addressComponents: [component('SW1A', 'SW1A', ['postal_code_prefix'])],
      }).postcode,
    ).toBe('SW1A')

    expect(
      formatAddress({
        addressComponents: [
          component('12345', '12345', ['postal_code']),
          component('6789', '6789', ['postal_code_suffix']),
        ],
      }).postcode,
    ).toBe('12345-6789')
  })

  it('supports legacy geocoder components for backwards compatibility', () => {
    const result = formatAddress({
      addressComponents: [{ long_name: 'Main Street', short_name: 'Main St', types: ['route'] }],
    })

    expect(result.street).toBe('Main Street')
  })
})
