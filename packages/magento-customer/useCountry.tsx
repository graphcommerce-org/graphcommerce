import { Country } from '@reachdigital/magento-graphql'
import { CountryRegionsQuery } from '@reachdigital/magento-store/CountryRegions.gql'

export default function useCountry(
  countries: CountryRegionsQuery['countries'],
  countryCode: string,
): Country | undefined {
  const country = countries?.filter((c) => c?.two_letter_abbreviation === countryCode)[0]

  if (!country) return undefined

  return country
}
