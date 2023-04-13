import { ProductPaginationProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { AlgoliaPagination } from '../components/Pagination/AlgoliaPagination'

export const component = 'ProductListPaginationSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaPaginationPlugin(props: PluginProps<ProductPaginationProps>) {
  const { Prev, ...rest } = props
  const router = useRouter()
  if (!router.asPath.includes('/search')) return <Prev {...props} />

  return <AlgoliaPagination {...rest} />
}

export const Plugin = AlgoliaPaginationPlugin
