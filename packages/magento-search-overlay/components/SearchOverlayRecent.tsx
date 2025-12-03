import { SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box } from '@mui/material'
import { SearchOverlaySuggestion } from './SearchOverlaySuggestions'

export function SearchOverlayRecent({ recentSearches }: { recentSearches: string[] }) {
  return (
    <Box>
      <SectionContainer labelLeft={<Trans>Continue searching</Trans>}>
        {recentSearches.map((suggestion) => (
          <SearchOverlaySuggestion key={suggestion} search={suggestion} />
        ))}
      </SectionContainer>
    </Box>
  )
}
