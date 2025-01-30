import type { SearchFieldProps } from '@graphcommerce/magento-search'
import { SearchFab as SearchFabBase } from '@graphcommerce/magento-search'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import type { SearchOverlayProps } from '../components/SearchOverlay'
import { SearchOverlayLoader } from '../components/SearchOverlayLoader'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-search',
}

export function SearchField(
  props: PluginProps<Omit<SearchFieldProps, 'searchField'>> & { searchField?: SearchOverlayProps },
) {
  const { Prev, searchField, ...rest } = props
  const isSearchPage = useRouter().asPath.startsWith('/search')

  if (isSearchPage) return <Prev {...rest} />
  if (!searchField) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        '<SearchField searchField={{ productListRenderer }}/> required when rendering the SearchOverlay',
      )
    }
    return null
  }

  return (
    <>
      <SearchFabBase size='large' slotProps={{ icon: { size: 'large' } }} {...rest.fab} />
      <SearchOverlayLoader {...searchField} />
    </>
  )
}
