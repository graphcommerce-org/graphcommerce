import { ProductCountProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import dynamic from 'next/dynamic'
import { useSearchRoute } from '../hooks/useSearchRoute'

export const component = 'ProductListCount'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaProductListCountPlugin(props: PluginProps<ProductCountProps>) {
  const { Prev, ...rest } = props
  const search = useSearchRoute()

  if (!search) return <Prev {...rest} />

  const ProductListCount = dynamic(
    async () => (await import('../components/Filters/ProductListCount')).ProductListCount,
  )

  return <ProductListCount {...props} />
}

export const Plugin = AlgoliaProductListCountPlugin
