import { SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { SearchOverlaySuggestion } from './SearchOverlaySuggestions'

export function RecentSearches({ recentSearches }: { recentSearches: string[] }) {
  return (
    <Box
      sx={(theme) => ({
        marginTop: theme.spacings.md,
        marginBottom: theme.spacings.md,
      })}
    >
      <SectionContainer labelLeft={<Trans id='Continue searching' />}>
        {recentSearches.map((suggestion) => (
          <SearchOverlaySuggestion key={suggestion} search={suggestion} />
        ))}
      </SectionContainer>
    </Box>
  )
}
