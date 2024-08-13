import {
  ProductAttributeFilterInput,
  AlgoliafacetFilters_Input,
  AlgolianumericFilters_Input,
} from '@graphcommerce/graphql-mesh'
import {
  isFilterTypeEqual,
  isFilterTypeRange,
  isFilterTypeMatch,
} from '@graphcommerce/magento-product'
import { InputMaybe } from '@graphcommerce/next-config'
import { GetStoreConfigReturn } from './getStoreConfig'
import { nonNullable } from './utils'

/**
 * Map filters recieved from arguments to algolia facetfilter format
 *
 * https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/
 */
export function productFilterInputToAlgoliaFacetFiltersInput(
  filters?: InputMaybe<ProductAttributeFilterInput>,
) {
  const filterArray: AlgoliafacetFilters_Input[] = []
  if (!filters) {
    return []
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (isFilterTypeEqual(value)) {
      const valueArray = ((value?.in ? value?.in : [value?.eq]) ?? []).filter(nonNullable)

      const keyArray: string[] = []
      let orString = false
      valueArray.forEach((v, i) => {
        if (key === 'category_uid') {
          if (i === 0) {
            keyArray.push(`categoryIds:${atob(v)}`)
          } else {
            keyArray.push(`categoryIds:${atob(v)}`)
            orString = true
          }
        } else {
          if (i === 0) {
            keyArray.push(`${key}:${v}`)
          } else {
            keyArray.push(`${key}:${v}`)
            orString = true
          }
        }
      })
      if (orString) {
        filterArray.push(keyArray)
      } else {
        filterArray.push(...keyArray)
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
