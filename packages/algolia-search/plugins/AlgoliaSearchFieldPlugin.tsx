import { SearchFormProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import dynamic from 'next/dynamic'
import { useSearchRoute } from '../hooks/useSearchRoute'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaSearchFieldPlugin(props: PluginProps<SearchFormProps>) {
  const { Prev, search } = props
  const onSearch = useSearchRoute()

  if (!onSearch) return <Prev {...props} />

  const SearchBox = dynamic(
    async () => (await import('../components/SearchBox/SearchBox')).SearchBox,
  )

  return <SearchBox defaultValue={search} />
}

export const Plugin = AlgoliaSearchFieldPlugin
