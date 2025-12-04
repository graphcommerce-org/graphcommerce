import { FullPageMessage, iconSearch, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
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
          title={<Trans>What are you looking for?</Trans>}
          icon={<IconSvg src={iconSearch} size='xl' />}
          disableMargin
        >
          <Trans>Discover our collection by searching for products, categories or features.</Trans>
        </FullPageMessage>
      )}
    </>
  )
}
