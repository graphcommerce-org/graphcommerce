import { useQuery } from '@apollo/client'
import { Country, Maybe } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '../queries/CountryRegions.gql'

export function useFindCountry(countryCode?: Maybe<string>): Maybe<Country> | undefined {
  const countryRegions = useQuery(CountryRegionsDocument)
  return countryRegions.data?.countries?.filter(
    (c) => c?.two_letter_abbreviation === countryCode,
  )?.[0]
}
