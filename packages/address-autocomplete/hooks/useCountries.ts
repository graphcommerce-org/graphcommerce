import { useQuery } from '@graphcommerce/graphql'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'

export function useCountries() {
  const countryQuery = useQuery(CountryRegionsDocument)
  const countries = countryQuery.data?.countries ?? countryQuery.previousData?.countries

  return countries
}
