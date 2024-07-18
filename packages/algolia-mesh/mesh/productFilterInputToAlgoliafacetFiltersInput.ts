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

      valueArray.forEach((v) => {
        if (key === 'category_uid') {
          filterArray.push({ facetFilters_Input: { String: `categoryIds:${atob(v)}` } })
        } else {
          filterArray.push({ facetFilters_Input: { String: `${key}:${v}` } })
        }
      })
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
export function productFilterInputToAlgoliaNumericFiltersInput(
  storeConfig: GetStoreConfigReturn,
  filters?: InputMaybe<ProductAttributeFilterInput>,
) {
  const filterArray: AlgolianumericFilters_Input[] = []
  if (!storeConfig) {
    throw Error('StoreConfig is missing')
  }
  if (!filters) {
    return []
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (isFilterTypeRange(value)) {
      if (key === 'price') {
        filterArray.push(
          {
            numericFilters_Input: {
              String: `price.${storeConfig.default_display_currency_code}.default >= ${value.from}`,
            },
          },
          {
            numericFilters_Input: {
              String: `price.${storeConfig.default_display_currency_code}.default <= ${value.to}`,
            },
          },
        )
      } else {
        filterArray.push(
          {
            numericFilters_Input: {
              String: `${key} >= ${value.from}`,
            },
          },
          {
            numericFilters_Input: {
              String: `${key} <= ${value.to}`,
            },
          },
        )
      }
    }
  })

  return filterArray
}
