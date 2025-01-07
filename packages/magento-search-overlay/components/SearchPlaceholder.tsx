import { FullPageMessage, iconSearch, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRecentSearches } from '../hooks/useRecentSearches'
import { SearchOverlayRecent } from './SearchOverlayRecent'

export function SearchPlaceholder() {
  const { recentSearches } = useRecentSearches()

  return (
    <>
      {recentSearches.length > 0 ? (
        <SearchOverlayRecent recentSearches={recentSearches} />
      ) : (
        <FullPageMessage
          title={<Trans id='What are you looking for?' />}
          icon={<IconSvg src={iconSearch} size='xl' />}
          disableMargin
        >
          <Trans id='Discover our collection by searching for products, categories or features.' />
        </FullPageMessage>
      )}
    </>
  )
}
