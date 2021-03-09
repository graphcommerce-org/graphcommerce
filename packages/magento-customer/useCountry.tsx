import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import { Country } from '@reachdigital/magento-graphql'

export default function useCountry(
  countries: CountryRegionsQuery['countries'],
  countryCode: string,
): Country | undefined {
  const country = countries?.filter((c) => c?.two_letter_abbreviation === countryCode)[0]

  if (!country) return undefined

  return country
}
