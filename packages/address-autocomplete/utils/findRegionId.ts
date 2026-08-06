import type { FormattedAddress } from './formatAddress'

export type AddressRegion = {
  code?: string | null
  id?: number | null
  name?: string | null
}

export type AddressCountry = {
  available_regions?: readonly (AddressRegion | null)[] | null
  two_letter_abbreviation?: string | null
}

function normalize(value?: string | null) {
  return value
    ?.normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLocaleLowerCase()
}

export function findRegionId(
  countries: readonly (AddressCountry | null)[] | null | undefined,
  address: Pick<FormattedAddress, 'country' | 'region' | 'regionCode'>,
): number | null {
  const countryCode = normalize(address.country)
  const country = countries?.find(
    (candidate) => normalize(candidate?.two_letter_abbreviation) === countryCode,
  )

  if (!country) return null

  const regionCode = normalize(address.regionCode)
  const regionName = normalize(address.region)
  const region = country.available_regions?.find((candidate) => {
    if (!candidate) return false
    if (regionCode && normalize(candidate.code) === regionCode) return true
    return Boolean(regionName && normalize(candidate.name) === regionName)
  })

  return region?.id ?? null
}
