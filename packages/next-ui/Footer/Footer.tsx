import { ContainerProps, Container } from '@mui/material'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, typography, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'Footer' })((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.up('sm')]: {
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
    ...typography(theme, 'body2'),
    gap: theme.spacings.sm,
    [theme.breakpoints.down('sm')]: {
      gridAutoFlow: 'row',
      textAlign: 'center',
      gap: 8,
    },
  },
  support: {
    gridArea: 'support',
    justifySelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      gap: `0 ${theme.spacings.sm}`,
    },
  },
  storeSwitcher: {
    gridArea: 'switcher',
    justifySelf: 'end',
    [theme.breakpoints.down('sm')]: {
      justifySelf: 'center',
    },
  },
}))

export type FooterProps = UseStyles<typeof useStyles> & {
  storeSwitcher?: React.ReactNode
  socialLinks?: React.ReactElement
  customerService?: React.ReactNode
  copyright?: React.ReactElement
} & Omit<ContainerProps, 'children'>

export function Footer(props: FooterProps) {
  const { socialLinks, storeSwitcher, customerService, copyright, ...containerProps } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Container maxWidth={false} className={classes.footer} {...containerProps}>
      <div className={classes.social}>{socialLinks}</div>
      <div className={classes.storeSwitcher}>{storeSwitcher}</div>
      <div className={classes.support}>{customerService}</div>
      <div className={classes.copyright}>{copyright}</div>
    </Container>
  )
}
