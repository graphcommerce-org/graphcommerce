'use client'

import { Trans } from '@lingui/react/macro'
import { Box, Container, Divider, Link, Typography } from '@mui/material'

/** Simplified Footer for App Router Doesn't depend on next/router or framer-next-pages hooks */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: 'background.paper',
        py: 4,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant='h6' gutterBottom>
              GraphCommerce
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Trans>Open Source E-commerce with Next.js</Trans>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href='/service' color='textSecondary' underline='hover'>
              <Trans>Customer Service</Trans>
            </Link>
            <Link href='/service/contact-us' color='textSecondary' underline='hover'>
              <Trans>Contact</Trans>
            </Link>
            <Link href='/service/newsletter' color='textSecondary' underline='hover'>
              <Trans>Newsletter</Trans>
            </Link>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant='body2' color='text.secondary' align='center'>
          <Trans>Copyright © {year} GraphCommerce. All rights reserved.</Trans>
        </Typography>
      </Container>
    </Box>
  )
}
