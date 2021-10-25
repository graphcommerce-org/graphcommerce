import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { SvgImageSimple, UseStyles, Button } from '@graphcommerce/next-ui'
import { Container, IconButton, Link, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    footer: {
      gridTemplateColumns: '2.5fr 1.5fr',
      gridTemplateAreas: `
        'social switcher'
        'links support'
      `,
      borderTop: '1px solid rgba(0,0,0,0.08)',
      padding: `${theme.page.vertical} ${theme.page.horizontal} ${theme.page.vertical}`,
      display: 'grid',
      gap: theme.spacings.xs,
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacings.lg,
        justifyItems: 'center',
        gridTemplateAreas: `
          'switcher switcher'
          'support support'
          'social social'
          'links links'
        `,
        gap: theme.spacings.lg,
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
    disableMargin: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: 0,
      },
    },
    copyright: {
      display: 'grid',
      gridAutoFlow: 'column',
      alignContent: 'center',
      gridArea: 'links',
      ...theme.typography.caption,
      gap: theme.spacings.sm,
      [theme.breakpoints.down('xs')]: {
        gridAutoFlow: 'row',
        textAlign: 'center',
        gap: 0,
      },
    },
    support: {
      gridArea: 'support',
      justifySelf: 'flex-end',
      [theme.breakpoints.down('xs')]: {
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
      [theme.breakpoints.down('xs')]: {
        gap: `0 ${theme.spacings.sm}`,
      },
    },
    storeSwitcher: {
      gridArea: 'switcher',
      justifySelf: 'end',
      [theme.breakpoints.down('xs')]: {
        justifySelf: 'center',
      },
    },
    link: {
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
      },
    },
  }),
  { name: 'Footer' },
)

export type FooterProps = FooterQueryFragment &
  UseStyles<typeof useStyles> & { disableMargin?: boolean }

export default function Footer(props: FooterProps) {
  const { footer, disableMargin } = props
  const classes = useStyles(props)

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.footer, disableMargin && classes.disableMargin)}
    >
      <div className={classes.social}>
        {footer?.socialLinks?.map((link) => (
          <PageLink key={link.title} href={link.url} passHref>
            <IconButton color='inherit' size='small' disableRipple disableFocusRipple edge='start'>
              {link.asset ? <SvgImageSimple src={link.asset.url} width={24} /> : link.title}
            </IconButton>
          </PageLink>
        ))}
      </div>
      <div className={classes.storeSwitcher}>
        <StoreSwitcherButton />
      </div>
      <PageLink href='/service' passHref>
        <Button variant='pill' color='inherit' className={classes.support}>
          Customer Service
        </Button>
      </PageLink>
      <div className={classes.copyright}>
        <span>{footer?.copyright}</span>
        {footer?.legalLinks?.map((link) => (
          <PageLink key={link.title} href={link.url} passHref>
            <Link color='textPrimary' underline='always' classes={{ root: classes.link }}>
              {link.title}
            </Link>
          </PageLink>
        ))}
      </div>
    </Container>
  )
}
