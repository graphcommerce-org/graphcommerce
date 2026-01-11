'use client'

import { dvh } from '@graphcommerce/framer-utils'
import { Container, LayoutProvider, sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useScroll } from 'framer-motion'
import type { ReactNode } from 'react'

export type LayoutDefaultRscProps = {
  className?: string
  beforeHeader?: ReactNode
  header: ReactNode
  footer: ReactNode
  menuFab?: ReactNode
  cartFab?: ReactNode
  children?: ReactNode
  noSticky?: boolean
  sx?: SxProps<Theme>
}

/**
 * App Router compatible LayoutDefault This version doesn't depend on useScrollOffset from
 * framer-next-pages
 */
export function LayoutDefaultRsc(props: LayoutDefaultRscProps) {
  const {
    children,
    header,
    beforeHeader,
    footer,
    menuFab,
    cartFab,
    noSticky,
    className,
    sx = [],
  } = props

  const { scrollY } = useScroll()
  // For App Router we use the direct scroll position without offset
  // (no framer-next-pages page stacking)

  const fabIconSize = '56px' // Standard MUI fab size

  return (
    <Box
      className={className ?? ''}
      sx={sxx(
        (theme) => ({
          minHeight: dvh(100),
          '@supports (-webkit-touch-callout: none)': {
            minHeight: '-webkit-fill-available',
          },
          display: 'grid',
          gridTemplateRows: { xs: 'auto 1fr auto', md: 'auto auto 1fr auto' },
          gridTemplateColumns: '100%',
          background: theme.vars.palette.background.default,
        }),
        sx,
      )}
    >
      <LayoutProvider scroll={scrollY}>
        {beforeHeader}
        <Container
          sizing='shell'
          maxWidth={false}
          component='header'
          sx={(theme) => ({
            zIndex: theme.zIndex.appBar - 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: theme.appShell.headerHeightSm,
            pointerEvents: 'none',
            '& > *': {
              pointerEvents: 'all',
            },
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.headerHeightMd,
              top: 0,
              display: 'flex',
              justifyContent: 'left',
              width: '100%',
            },
            ...(!noSticky && {
              [theme.breakpoints.down('md')]: {
                position: 'sticky',
                top: 0,
              },
            }),
          })}
        >
          {header}
        </Container>
        {menuFab || cartFab ? (
          <Container
            sizing='shell'
            maxWidth={false}
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: 0,
              zIndex: 'speedDial',
              [theme.breakpoints.up('sm')]: {
                position: 'sticky',
                marginTop: `calc(${theme.appShell.headerHeightMd} * -1 - calc(${fabIconSize} / 2))`,
                top: `calc(${theme.appShell.headerHeightMd} / 2 - (${fabIconSize} / 2))`,
              },
              [theme.breakpoints.down('md')]: {
                position: 'fixed',
                top: 'unset',
                bottom: `calc(20px + ${fabIconSize})`,
                padding: '0 20px',
                '@media (max-height: 530px) and (orientation: portrait)': {
                  display: 'none',
                },
              },
            })}
          >
            {menuFab}
            {cartFab && (
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: theme.spacings.sm,
                  [theme.breakpoints.up('md')]: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  },
                })}
              >
                {cartFab}
              </Box>
            )}
          </Container>
        ) : (
          <div />
        )}
        <div>
          <div id='skip-nav' tabIndex={-1} />
          {children}
        </div>
        <div>{footer}</div>
      </LayoutProvider>
    </Box>
  )
}
