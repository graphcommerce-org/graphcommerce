import { ContainerProps, Theme, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    footer: {
      gridTemplateColumns: '5fr 3fr',
      gridTemplateAreas: `
        'social switcher'
        'links support'
      `,
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: `${theme.page.vertical} ${theme.page.horizontal}`,
      display: 'grid',
      gap: theme.spacings.xs,
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacings.lg,
        paddingBottom: theme.spacings.lg,
        justifyItems: 'center',
        gridTemplateAreas: `
          'switcher switcher'
          'support support'
          'social social'
          'links links'
        `,
        gap: theme.spacings.md,
        '& > *': {
          maxWidth: 'max-content',
        },
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto',
        justifyContent: 'space-between',
      },
    },
    copyright: {
      display: 'grid',
      gridAutoFlow: 'column',
      alignContent: 'center',
      gridArea: 'links',
      ...theme.typography.body2,
      gap: theme.spacings.sm,
      [theme.breakpoints.down('md')]: {
        gridAutoFlow: 'row',
        textAlign: 'center',
        gap: 8,
      },
    },
    support: {
      gridArea: 'support',
      justifySelf: 'flex-end',
      [theme.breakpoints.down('md')]: {
        justifySelf: 'center',
      },
    },
    social: {
      display: 'grid',
      justifyContent: 'start',
      gridAutoFlow: 'column',
      gridArea: 'social',
      gap: `0 ${theme.spacings.xs}`,
      '& > *': {
        minWidth: 'min-content',
      },
      [theme.breakpoints.down('md')]: {
        gap: `0 ${theme.spacings.sm}`,
      },
    },
    storeSwitcher: {
      gridArea: 'switcher',
      justifySelf: 'end',
      [theme.breakpoints.down('md')]: {
        justifySelf: 'center',
      },
    },
  }),
  { name: 'Footer' },
)

export type FooterProps = UseStyles<typeof useStyles> & {
  storeSwitcher?: React.ReactNode
  socialLinks?: React.ReactElement
  customerService?: React.ReactNode
  copyright?: React.ReactElement
} & Omit<ContainerProps, 'children'>

export function Footer(props: FooterProps) {
  const { socialLinks, storeSwitcher, customerService, copyright, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth={false} className={classes.footer} {...containerProps}>
      <div className={classes.social}>{socialLinks}</div>
      <div className={classes.storeSwitcher}>{storeSwitcher}</div>
      <div className={classes.support}>{customerService}</div>
      <div className={classes.copyright}>{copyright}</div>
    </Container>
  )
}
