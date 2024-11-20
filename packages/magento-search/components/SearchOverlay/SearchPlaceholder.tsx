import { FullPageMessage, iconSearch, IconSvg, useMatchMedia } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { RecentSearches } from './RecentSearches'
import { useRecentSearches } from './useRecentSearches'

export function SearchPlaceholder() {
  const matchMedia = useMatchMedia()
  const { recentSearches } = useRecentSearches()

  if (matchMedia.up('md')) {
    return null
  }

  return (
    <>
      {recentSearches.length > 0 ? (
        <RecentSearches recentSearches={recentSearches} />
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
