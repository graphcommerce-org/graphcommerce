import { ProductPaginationProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { AlgoliaPagination } from '../components/Pagination/AlgoliaPagination'

export const component = 'ProductListPagination'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaPaginationPlugin(props: PluginProps<ProductPaginationProps>) {
  const { Prev, ...rest } = props
  const router = useRouter()
  if (!router.asPath.includes('/search')) return <Prev {...props} />

  // const AlgoliaPagination = dynamic(
  //   async () => (await import('../components/Pagination/AlgoliaPagination')).AlgoliaPagination,
  // )

  return <AlgoliaPagination {...rest} />
}

export const Plugin = AlgoliaPaginationPlugin
