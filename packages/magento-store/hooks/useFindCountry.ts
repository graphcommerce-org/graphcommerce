import { useQuery } from '@graphcommerce/graphql'
import type { CountryRegionsQuery } from '../queries/CountryRegions.gql'
import { CountryRegionsDocument } from '../queries/CountryRegions.gql'

export function useFindCountry(
  countryCode?: string | null,
): NonNullable<CountryRegionsQuery['countries']>[0] | null | undefined {
  const countryRegions = useQuery(CountryRegionsDocument)
  return countryRegions.data?.countries?.filter(
    (c) => c?.two_letter_abbreviation === countryCode,
  )?.[0]
}
