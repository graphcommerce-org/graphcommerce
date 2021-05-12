import { Region } from '@reachdigital/magento-graphql'
import { CountryRegionsQuery } from '@reachdigital/magento-store'
import useCountry from './useCountry'

export default function useRegion(
  countries: CountryRegionsQuery['countries'],
  countryCode: string,
  regionId?: number,
): Region | undefined {
  const country = useCountry(countries, countryCode)

  if (!country || !regionId) return undefined

  const region =
    country.available_regions && country.available_regions.filter((r) => r?.id === regionId)[0]

  if (!region) return undefined

  return region
}
