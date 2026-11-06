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

  it.each([
    ['94a', 'NL', '94', 'a'],
    ['221B', 'GB', '221', 'B'],
    ['12/1β', 'GR', '12/1', 'β'],
  ])(
    'maps the street-number suffix in %s to the addition field',
    (streetNumber, country, expectedHouseNumber, expectedAddition) => {
      const result = formatAddress({
        addressComponents: [
          component(streetNumber, streetNumber, ['street_number']),
          component('Example Street', 'Example St', ['route']),
          component(country, country, ['country']),
        ],
      })

      expect(result.houseNumber).toBe(expectedHouseNumber)
      expect(result.addition).toBe(expectedAddition)
    },
  )

  it('maps Antonie van Leeuwenhoekweg 38C6 to house number and addition', () => {
    const result = formatAddress({
      addressComponents: [
        component('38C6', '38C6', ['street_number']),
        component('Antonie van Leeuwenhoekweg', 'Antonie van Leeuwenhoekweg', ['route']),
        component('Nederland', 'NL', ['country']),
      ],
    })

    expect(result).toMatchObject({
      street: 'Antonie van Leeuwenhoekweg',
      houseNumber: '38',
      addition: 'C6',
    })
  })

  it('preserves an explicit subpremise instead of splitting the street number', () => {
    const result = formatAddress({
      addressComponents: [
        component('221B', '221B', ['street_number']),
        component('Flat A', 'A', ['subpremise']),
      ],
    })

    expect(result.houseNumber).toBe('221B')
    expect(result.addition).toBe('A')
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
