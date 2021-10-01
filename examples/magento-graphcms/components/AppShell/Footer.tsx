import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Button, SvgImageSimple, UseStyles } from '@graphcommerce/next-ui'
import { Container, IconButton, Link, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    footer: {
      borderTop: '1px solid rgba(0,0,0,0.08)',
      padding: `${theme.page.vertical} ${theme.page.horizontal} ${theme.page.vertical}`,
      display: 'grid',
      gridAutoRows: '1fr',
      gap: theme.spacings.xs,
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        justifyItems: 'center',
        marginBottom: 50,
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
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
      },
    },
    copyright: {
      display: 'grid',
      gridAutoFlow: 'column',
      alignContent: 'center',
      ...theme.typography.caption,
      gap: theme.spacings.sm,
      [theme.breakpoints.up('md')]: {
        order: 3,
      },
    },
    support: {
      [theme.breakpoints.up('md')]: {
        order: 4,
      },
    },
    social: {
      display: 'none',
      justifyContent: 'start',
      gridAutoFlow: 'column',
      gap: `0 ${theme.spacings.xs}`,
      [theme.breakpoints.up('md')]: {
        display: 'grid',
      },
      '& > *': {
        minWidth: 'min-content',
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
      <StoreSwitcherButton />
      <PageLink href='/service' passHref>
        <Button variant='pill' color='inherit' className={classes.support}>
          Customer Service
        </Button>
      </PageLink>
      <div className={classes.copyright}>
        <span>{footer?.copyright}</span>
        {footer?.legalLinks?.map((link) => (
          <PageLink key={link.title} href={link.url} passHref>
            <Link color='textPrimary' underline='always'>
              {link.title}
            </Link>
          </PageLink>
        ))}
      </div>
    </Container>
  )
}
