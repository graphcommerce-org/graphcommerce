import { ProductFiltersProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { storefrontConfig } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { useRouter } from 'next/router'
import { useSortBy } from 'react-instantsearch-hooks-web'
import { RenderChip } from '../components/Chip/RenderChip'

export const component = 'ProductListSort'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaProductSortPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev, ...rest } = props
  const { locale } = useRouter()
  const options = storefrontConfig(locale)?.sortOptions
  const sort = useSortBy({
    items: options ?? [],
  })

  if (!options) return null

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
