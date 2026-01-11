'use client'

import { icon404, iconSearch, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'

/**
 * Store-specific 404 page. Matches the Pages Router 404 page design. This is rendered within the
 * store layout (header, footer, navigation) so it maintains the site structure.
 *
 * Note: In App Router, we can't easily fetch CMS data in not-found.tsx since it's a special page
 * that doesn't support async data fetching in the same way. The CMS content would need to be passed
 * via a different mechanism if needed.
 */
export default function NotFound() {
  const params = useParams<{ store: string }>()
  const store = params?.store ?? 'en'

  return (
    <Container maxWidth='sm'>
      <Box sx={{ textAlign: 'center', mt: 16, mb: 16 }}>
        <IconSvg src={icon404} size='xxl' />

        <Typography variant='h3' component='h1' gutterBottom>
          <Trans>Whoops our bad...</Trans>
        </Typography>

        <Typography variant='body1'>
          <Trans>We couldn't find the page you were looking for</Trans>
        </Typography>

        <Box sx={{ mt: 4, mb: 2 }}>
          <MuiLink
            component={NextLink}
            href={`/${store}/search`}
            underline='none'
            sx={(theme) => ({
              justifySelf: 'center',
              width: '100%',
              borderRadius: 2,
              typography: 'body1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: theme.spacings.xs,
              color: 'text.secondary',
              border: 1,
              borderColor: 'divider',
              py: 2,
              px: 1.5,
              '&:hover': {
                borderColor: 'text.secondary',
              },
            })}
          >
            <Trans>Search...</Trans>
            <IconSvg src={iconSearch} sx={{ color: 'text.primary', fontSize: '1.4em' }} />
          </MuiLink>
        </Box>
      </Box>
    </Container>
  )
}
