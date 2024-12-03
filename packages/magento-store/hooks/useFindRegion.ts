import type { Maybe, Region } from '@graphcommerce/graphql-mesh'
import { useFindCountry } from './useFindCountry'

export function useFindRegion(
  countryCode?: Maybe<string>,
  regionId?: Maybe<number>,
): Region | undefined {
  const country = useFindCountry(countryCode)

  if (!country || !regionId) return undefined

  const region =
    country.available_regions && country.available_regions.filter((r) => r?.id === regionId)[0]

  if (!region) return undefined

  return region
}
