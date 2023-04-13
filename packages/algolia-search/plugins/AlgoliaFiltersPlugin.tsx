import { ProductFiltersProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import dynamic from 'next/dynamic'
import { useSearchRoute } from '../hooks/useSearchRoute'

export const component = 'ProductListFilters'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaFiltersPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev, ...rest } = props
  const search = useSearchRoute()
  if (!search) return <Prev {...props} />

  const AlgoliaFilters = dynamic(
    async () => (await import('../components/Filters/AlgoliaFilters')).AlgoliaFilters,
  )

  return <AlgoliaFilters {...rest} />
}

export const Plugin = AlgoliaFiltersPlugin
