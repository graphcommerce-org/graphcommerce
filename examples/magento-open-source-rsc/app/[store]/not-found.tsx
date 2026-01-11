'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'

/**
 * Store-specific 404 page. This is rendered within the store layout (header, footer, navigation) so
 * it maintains the site structure.
 */
export default function NotFound() {
  const params = useParams<{ store: string }>()
  const store = params?.store ?? 'en'

  return (
    <Container maxWidth='sm' sx={{ py: 8, textAlign: 'center' }}>
      <Typography
        variant='h1'
        component='h1'
        sx={{
          fontSize: { xs: '6rem', md: '8rem' },
          fontWeight: 800,
          color: 'text.disabled',
          lineHeight: 1,
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant='h4'
        component='h2'
        sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
      >
        Page Not Found
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          component={Link}
          href={`/${store}`}
          variant='contained'
          color='primary'
          size='large'
          sx={{ px: 4 }}
        >
          Go to Home
        </Button>
        <Button
          component={Link}
          href={`/${store}/service`}
          variant='outlined'
          color='inherit'
          size='large'
          sx={{ px: 4 }}
        >
          Contact Support
        </Button>
      </Box>
    </Container>
  )
}
