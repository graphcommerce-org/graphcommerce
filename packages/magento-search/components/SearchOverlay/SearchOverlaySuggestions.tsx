import {
  ProductListSearchSuggestionFragment,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import { filterNonNullableKeys, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { SearchOverlayItem } from './SearchOverlayItem'
import { useSearchOverlay } from './SearchOverlayProvider'

export const SearchOverlaySuggestion = forwardRef<
  HTMLLIElement,
  ProductListSearchSuggestionFragment
>((props, ref) => {
  const { search } = props
  const { form } = useProductFiltersPro()
  const { resetFocus } = useSearchOverlay()

  return (
    <SearchOverlayItem
      ref={ref}
      onClick={() => {
        form.setValue('search', search)
        resetFocus()
      }}
    >
      {search}
    </SearchOverlayItem>
  )
})

SearchOverlaySuggestion.displayName = 'SearchOverlaySuggestion'

export function SearchOverlaySuggestions() {
  const { products } = useSearchOverlay()

  if (!products?.suggestions || products.suggestions.length === 0) return null

  return (
    <SectionContainer labelLeft={<Trans>Did you mean?</Trans>}>
      {filterNonNullableKeys(products.suggestions).map((suggestion) => (
        <SearchOverlaySuggestion key={suggestion.search} {...suggestion} />
      ))}
    </SectionContainer>
  )
}
