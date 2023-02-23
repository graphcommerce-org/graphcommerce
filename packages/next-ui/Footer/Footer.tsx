import { ContainerProps, Container, Box } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../Styles'

export type FooterProps = {
  storeSwitcher?: React.ReactNode
  socialLinks?: React.ReactNode
  customerService?: React.ReactNode
  copyright?: React.ReactElement
} & Omit<ContainerProps, 'children'>

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
    ...containerProps
  } = props

  return (
    <Container
      sx={[
        (theme) => ({
          gridTemplateColumns: '5fr 3fr',
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'grid',
          alignItems: 'center',
          py: theme.page.vertical,
          px: theme.page.horizontal,
          justifyItems: 'center',
          gridTemplateAreas: `
            'switcher switcher'
            'support support'
            'social social'
            'links links'
          `,
          gap: theme.spacings.sm,
          '& > *': { maxWidth: 'max-content' },

          [theme.breakpoints.up('sm')]: {
            gridTemplateAreas: `
              'social switcher'
              'links support'
            `,
            justifyItems: 'start',
            gridTemplateColumns: 'auto auto',
            gridTemplateRows: 'auto',
            justifyContent: 'space-between',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      maxWidth={false}
      className={classes.root}
      {...containerProps}
    >
      <Box
        sx={(theme) => ({
          display: 'grid',
          justifyContent: 'start',
          gridAutoFlow: 'column',
          gridArea: 'social',
          gap: theme.spacings.xs,
          '& > *': {
            minWidth: 'min-content',
          },
        })}
        className={classes.social}
      >
        {socialLinks}
      </Box>
      <Box
        sx={(theme) => ({
          gridArea: 'switcher',
          justifySelf: 'end',
          [theme.breakpoints.down('sm')]: {
            justifySelf: 'center',
          },
        })}
        className={classes.storeSwitcher}
      >
        {storeSwitcher}
      </Box>
      <Box
        sx={(theme) => ({
          gridArea: 'support',
          justifySelf: 'flex-end',
          [theme.breakpoints.down('sm')]: {
            justifySelf: 'center',
          },
        })}
        className={classes.support}
      >
        {customerService}
      </Box>
      <Box
        sx={(theme) => ({
          typography: 'body2',
          display: 'grid',
          gridAutoFlow: 'column',
          alignContent: 'center',
          gridArea: 'links',
          gap: theme.spacings.sm,
          [theme.breakpoints.down('sm')]: {
            gridAutoFlow: 'row',
            textAlign: 'center',
            gap: `8px`,
          },
        })}
        className={classes.copyright}
      >
        {copyright}
      </Box>
    </Container>
  )
}

Footer.selectors = selectors
