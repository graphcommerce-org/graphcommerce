import { ProductFiltersProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { storefrontConfig } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { useSortBy } from 'react-instantsearch-hooks-web'
import { RenderChip } from '../components/Chip/RenderChip'

export const component = 'ProductListSort'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaProductSortPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev, ...rest } = props
  const sort = useSortBy({
    items: storefrontConfig(i18n.locale)?.sortOptions ?? [],
  })

  return (
    <RenderChip
      __typename='Sort'
      title={rest.title ?? i18n._(/* i18n */ 'Sort')}
      attribute='sort'
      {...sort}
    />
  )
}

export const Plugin = AlgoliaProductSortPlugin
