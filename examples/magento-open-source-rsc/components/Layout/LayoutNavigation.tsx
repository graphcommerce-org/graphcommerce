'use client'

import { Container } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'
import { Footer } from './Footer'
import { Logo } from './Logo'

export type LayoutNavigationProps = {
  children: React.ReactNode
}

/**
 * Simplified Layout for App Router This version doesn't use LayoutDefault which depends on
 * framer-next-pages hooks Instead, it provides a basic header/content/footer structure
 */
export function LayoutNavigation(props: LayoutNavigationProps) {
  const { children } = props

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position='sticky'
        color='default'
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo />
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Link href='/men' color='inherit' underline='hover'>
              <Typography variant='body1'>
                <Trans>Men</Trans>
              </Typography>
            </Link>
            <Link href='/women' color='inherit' underline='hover'>
              <Typography variant='body1'>
                <Trans>Women</Trans>
              </Typography>
            </Link>
            <Link href='/account' color='inherit' underline='hover'>
              <Typography variant='body1'>
                <Trans>Account</Trans>
              </Typography>
            </Link>
            <Link href='/cart' color='inherit' underline='hover'>
              <Typography variant='body1'>
                <Trans>Cart</Trans>
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component='main' sx={{ flex: 1 }}>
        <Container>{children}</Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}
