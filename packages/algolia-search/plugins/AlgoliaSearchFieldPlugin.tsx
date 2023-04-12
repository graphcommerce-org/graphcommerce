import { SearchFormProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useSearchBox } from 'react-instantsearch-hooks'
import { SearchBox } from '../components/SearchBox/SearchBox'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaSearchFieldPlugin(props: PluginProps<SearchFormProps>) {
  const { search } = props

  const { refine } = useSearchBox()

  return <SearchBox defaultValue={search} refine={refine} />
}

export const Plugin = AlgoliaSearchFieldPlugin
