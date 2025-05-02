import type {
  AlgolianumericFilters_Input,
  AlgoliasettingsResponse,
  ProductAttributeFilterInput,
} from '@graphcommerce/graphql-mesh'
import {
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
} from '@graphcommerce/magento-product'
import type { InputMaybe } from '@graphcommerce/next-config'
import type { GetStoreConfigReturn } from './getStoreConfig'
import { nonNullable } from './utils'

/**
 * Map filters recieved from arguments to algolia facetfilter format
 *
 * https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/
 */
export function productFilterInputToAlgoliaFacetFiltersInput(
  settings: AlgoliasettingsResponse,
  filters?: InputMaybe<ProductAttributeFilterInput>,
  query?: string,
) {
  const filterArray: (string | string[])[] = []
  if (!filters) {
    return []
  }

  const hasVisibility = settings?.attributesForFaceting?.some(
    (attr) => typeof attr === 'string' && attr.includes('visibility'),
  )

  if (hasVisibility) {
    if (typeof query === 'string') {
      filterArray.push(['visibility:Catalog, Search', 'visibility:Search'])
    } else {
      filterArray.push(['visibility:Catalog, Search', 'visibility:Catalog'])
    }
  }

  // @see algoliaFacetsToAggregations for the other side.
  const maybeDecode = (value: string) => value.replaceAll('_OR_', '/').replaceAll('_AND_', ',')

  Object.entries(filters).forEach(([key, value]) => {
    if (isFilterTypeEqual(value)) {
      if (value.in) {
        const values = value.in.filter(nonNullable)
        if (key === 'category_uid') {
          filterArray.push(values.map((v) => `categoryIds:${atob(v)}`))
        } else {
          filterArray.push(values.map((v) => `${key}:${maybeDecode(v)}`))
        }
      }

      if (value.eq) {
        if (key === 'category_uid') filterArray.push(`categoryIds:${atob(value.eq)}`)
        else filterArray.push(`${key}:${maybeDecode(value.eq)}`)
      }
    }

    if (isFilterTypeMatch(value)) {
      throw Error('Match filters are not supported')
    }
  })
  return filterArray
}

/**
 * Map filters recieved from arguments to algolia facetfilter format
 *
 * https://www.algolia.com/doc/api-reference/api-parameters/numericFilters/#examples
 */
export async function productFilterInputToAlgoliaNumericFiltersInput(
  storeConfig: Promise<GetStoreConfigReturn>,
  filters?: InputMaybe<ProductAttributeFilterInput>,
) {
  if (!filters) return []

  const filterArray: AlgolianumericFilters_Input[] = []

  for (const [key, value] of Object.entries(filters)) {
    if (isFilterTypeRange(value)) {
      if (key === 'price') {
        // eslint-disable-next-line no-await-in-loop
        const currencyCode = (await storeConfig)?.default_display_currency_code
        filterArray.push(
          { numericFilters_Input: { String: `${key}.${currencyCode}.default >= ${value.from}` } },
          { numericFilters_Input: { String: `${key}.${currencyCode}.default <= ${value.to}` } },
        )
      } else {
        filterArray.push(
          { numericFilters_Input: { String: `${key} >= ${value.from}` } },
          { numericFilters_Input: { String: `${key} <= ${value.to}` } },
        )
      }
    }
  }

  return filterArray
}
