// eslint-disable-next-line import/no-extraneous-dependencies
import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import dynamic from 'next/dynamic'
import { useSearchRoute } from '../hooks/useSearchRoute'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaSearchPlugin(props: PluginProps<ProductItemsGridProps>) {
  const { Prev } = props
  const search = useSearchRoute()

  if (!search) return <Prev {...props} />

  const AlgoliaResults = dynamic(
    async () => (await import('../components/Filters/AlgoliaResults')).AlgoliaResults,
  )

  return <AlgoliaResults {...props} />
}

export const Plugin = AlgoliaSearchPlugin
