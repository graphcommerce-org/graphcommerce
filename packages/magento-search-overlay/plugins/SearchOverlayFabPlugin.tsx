import { useMotionValueValue } from '@graphcommerce/framer-utils'
import type { SearchFabProps } from '@graphcommerce/magento-search'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { searchOverlayLoading } from '../components/SearchOverlayLoader'
import { searchOverlayIsOpen } from '../components/SearchOverlayProvider'
import { useOpenWithShortKey } from '../hooks/useOpenWithShortKey'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-search',
}

export function SearchFab(props: PluginProps<SearchFabProps>) {
  const { Prev, ...rest } = props
  const loading = useMotionValueValue(searchOverlayLoading, (v) => v)
  useOpenWithShortKey()
  return <Prev {...rest} loading={loading} onClick={() => searchOverlayIsOpen.set(true)} />
}
