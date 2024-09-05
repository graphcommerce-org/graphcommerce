import {
  ProductListSearchSuggestionFragment,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import {
  filterNonNullableKeys,
  SectionContainer,
  memoDeep,
  SectionContainerProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { forwardRef } from 'react'
import { SearchOverlayItem } from './SearchOverlayItem'
import { useSearchOverlay } from './SearchOverlayProvider'

type SearchOverlaySuggestionProps = ProductListSearchSuggestionFragment &
  React.ComponentPropsWithoutRef<typeof SearchOverlayItem>

export const SearchOverlaySuggestion = memoDeep(
  forwardRef<HTMLLIElement, SearchOverlaySuggestionProps>((props, ref) => {
    const { search, ...rest } = props
    const { form } = useProductFiltersPro()

    return (
      <SearchOverlayItem ref={ref} onClick={() => form.setValue('search', search)} {...rest}>
        {search}
      </SearchOverlayItem>
    )
  }),
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
