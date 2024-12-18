import type { ProductListSearchSuggestionFragment } from '@graphcommerce/magento-product'
import { useProductFiltersPro } from '@graphcommerce/magento-product'
import type { SectionContainerProps } from '@graphcommerce/next-ui'
import { filterNonNullableKeys, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { useRecentSearches } from '../hooks/useRecentSearches'
import { SearchOverlayItem } from './SearchOverlayItem'
import { useSearchOverlay } from './SearchOverlayProvider'

type SearchOverlaySuggestionProps = ProductListSearchSuggestionFragment &
  React.ComponentPropsWithoutRef<typeof SearchOverlayItem>

export const SearchOverlaySuggestion = forwardRef<HTMLLIElement, SearchOverlaySuggestionProps>(
  (props, ref) => {
    const { search, ...rest } = props
    const { form } = useProductFiltersPro()
    const { updateRecentSearches } = useRecentSearches()
    const { setSelectedIndex } = useSearchOverlay()

    return (
      <SearchOverlayItem
        ref={ref}
        onClick={() => {
          form.setValue('search', search)
          updateRecentSearches(search)
          setSelectedIndex(-1)
        }}
        {...rest}
      >
        {search}
      </SearchOverlayItem>
    )
  },
)

SearchOverlaySuggestion.displayName = 'SearchOverlaySuggestion'

type SearchOverlaySuggestionsProps = {
  slotProps?: {
    section?: SectionContainerProps
    suggestion?: Omit<
      React.ComponentProps<typeof SearchOverlaySuggestion>,
      keyof ProductListSearchSuggestionFragment
    >
  }
}

export function SearchOverlaySuggestions(props: SearchOverlaySuggestionsProps) {
  const { products } = useSearchOverlay()
  const { slotProps } = props

  if (!products?.suggestions || products.suggestions.length === 0) return null

  return (
    <SectionContainer labelLeft={<Trans>Did you mean?</Trans>} {...slotProps?.section}>
      {filterNonNullableKeys(products.suggestions).map((suggestion) => (
        <SearchOverlaySuggestion
          key={suggestion.search}
          {...suggestion}
          {...slotProps?.suggestion}
        />
      ))}
    </SectionContainer>
  )
}
