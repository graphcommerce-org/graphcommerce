import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { isFilterTypeEqual } from '@graphcommerce/magento-product'
import type { InputMaybe, Scalars } from '@graphcommerce/next-config'

export function getAlgoliaContext(
  filters?: InputMaybe<ProductAttributeFilterInput>,
): InputMaybe<ProductAttributeFilterInput['ruleContexts']> {
  let context = 'search'
  if (!filters) {
    return [context]
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (isFilterTypeEqual(value)) {
      if (value.in) {
        if (key === 'category_uid') {
          context = 'catalog'
        }
      }
    }
  })
  return [context]
}
