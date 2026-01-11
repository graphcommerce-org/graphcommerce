'use client'

import { LayoutProvider, useScrollY } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box, Container, styled } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { Logo } from './Logo'

export type LayoutMinimalRscProps = {
  children: ReactNode
  footer?: ReactNode
  sx?: SxProps<Theme>
}

const MotionBox = styled(m.div)({})

/**
 * Minimal layout component for App Router. Used for checkout pages where we want a clean,
 * distraction-free interface with just the logo in the header.
 */
export function LayoutMinimalRsc(props: LayoutMinimalRscProps) {
  const { children, footer, sx } = props

  const scrollY = useScrollY()

  // Header shadow based on scroll
  const headerShadow = useTransform(scrollY, [0, 10], [0, 1])

  return (
    <LayoutProvider>
      <Box
        sx={[
          (theme) => ({
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: theme.vars.palette.background.paper,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {/* Minimal Header - just logo */}
        <MotionBox
          style={{ opacity: headerShadow }}
          sx={(theme) => ({
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar,
            bgcolor: 'background.paper',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              bgcolor: 'divider',
            },
          })}
        >
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2,
            }}
          >
            <Logo />
          </Container>
        </MotionBox>

        {/* Main content */}
        <Box
          component='main'
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        {footer}
      </Box>
    </LayoutProvider>
  )
}
