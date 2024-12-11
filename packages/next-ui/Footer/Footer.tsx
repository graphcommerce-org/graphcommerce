import type { ContainerProps } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { Container } from '../Container/Container'
import { LazyHydrate } from '../LazyHydrate'
import { extendableComponent } from '../Styles'

export type FooterProps = {
  storeSwitcher?: React.ReactNode
  socialLinks?: React.ReactNode
  customerService?: React.ReactNode
  copyright?: React.ReactElement
  children?: React.ReactNode
} & ContainerProps

const { classes, selectors } = extendableComponent('Footer', [
  'root',
  'social',
  'storeSwitcher',
  'support',
  'copyright',
] as const)

export function Footer(props: FooterProps) {
  const {
    socialLinks,
    storeSwitcher,
    customerService,
    copyright,
    sx = [],
    children,
    ...containerProps
  } = props

  return (
    <LazyHydrate height={300}>
      <Container
        maxWidth={false}
        sizing='shell'
        sx={[
          (theme) => ({
            gridTemplateColumns: '5fr 3fr',
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'grid',
            alignItems: 'center',
            pt: theme.spacings.lg,
            pb: theme.spacings.lg,
            justifyItems: 'center',
            gridTemplateAreas: `
              'switcher switcher'
              'support support'
              'social social'
              'links links'
            `,
            gap: theme.spacings.md,
            '& > *': { maxWidth: 'max-content' },

            [theme.breakpoints.up('md')]: {
              gap: theme.spacings.sm,
              gridTemplateAreas: `
              'social switcher'
              'links support'
            `,
              justifyItems: 'start',
              py: theme.page.vertical,
              gridTemplateColumns: 'auto auto',
              gridTemplateRows: 'auto',
              justifyContent: 'space-between',
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        className={classes.root}
        {...containerProps}
      >
        {socialLinks && (
          <Box
            sx={(theme) => ({
              display: 'grid',
              justifyContent: 'start',
              gridAutoFlow: 'column',
              gridArea: 'social',
              gap: { xs: `0 ${theme.spacings.xs}`, md: `0 ${theme.spacings.xs}` },
              '& > *': {
                minWidth: 'min-content',
              },
            })}
            className={classes.social}
          >
            {socialLinks}
          </Box>
        )}
        {storeSwitcher && (
          <Box
            sx={(theme) => ({
              gridArea: 'switcher',
              justifySelf: 'end',
              [theme.breakpoints.down('md')]: {
                justifySelf: 'center',
              },
            })}
            className={classes.storeSwitcher}
          >
            {storeSwitcher}
          </Box>
        )}
        {customerService && (
          <Box
            sx={(theme) => ({
              gridArea: 'support',
              justifySelf: 'flex-end',
              [theme.breakpoints.down('md')]: {
                justifySelf: 'center',
              },
            })}
            className={classes.support}
          >
            {customerService}
          </Box>
        )}
        {copyright && (
          <Box
            sx={(theme) => ({
              typography: 'body2',
              display: 'grid',
              gridAutoFlow: 'column',
              alignContent: 'center',
              gridArea: 'links',
              gap: theme.spacings.sm,
              [theme.breakpoints.down('md')]: {
                gridAutoFlow: 'row',
                textAlign: 'center',
                gap: '8px',
              },
            })}
            className={classes.copyright}
          >
            {copyright}
          </Box>
        )}
        {children}
      </Container>
    </LazyHydrate>
  )
}

Footer.selectors = selectors
