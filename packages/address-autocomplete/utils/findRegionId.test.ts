import { findRegionId } from './findRegionId'

const countries = [
  {
    two_letter_abbreviation: 'CA',
    available_regions: [
      { id: 1, code: 'QC', name: 'Québec' },
      { id: 2, code: 'ON', name: 'Ontario' },
    ],
  },
]

describe('findRegionId', () => {
  it('prefers the stable region code', () => {
    expect(
      findRegionId(countries, {
        country: 'ca',
        regionCode: 'QC',
        region: 'Different localized name',
      }),
    ).toBe(1)
  })

  it('falls back to a normalized region name', () => {
    expect(
      findRegionId(countries, {
        country: 'CA',
        regionCode: '',
        region: 'Quebec',
      }),
    ).toBe(1)
  })

  it('returns null rather than retaining an unrelated region', () => {
    expect(
      findRegionId(countries, {
        country: 'US',
        regionCode: 'CA',
        region: 'California',
      }),
    ).toBeNull()
  })
})
