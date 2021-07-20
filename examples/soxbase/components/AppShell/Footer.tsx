import { Container, IconButton, Link, makeStyles, Theme } from '@material-ui/core'
import Facebook from '@material-ui/icons/Facebook'
import Instagram from '@material-ui/icons/Instagram'
import LinkedIn from '@material-ui/icons/LinkedIn'
import Twitter from '@material-ui/icons/Twitter'
import Youtube from '@material-ui/icons/YouTube'
import { StoreSwitcherButton } from '@reachdigital/magento-store'
import PageLink from 'next/link'
import React from 'react'
import Button from '../PageLink/Button'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    borderTop: '1px solid rgba(0,0,0,0.08)',
    padding: `${theme.page.vertical} ${theme.page.horizontal} ${theme.page.vertical}`,
    display: 'grid',
    gridAutoRows: '1fr',
    gap: theme.spacings.xs,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
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
}))

export type FooterProps = FooterQueryFragment

export default function Footer(props: FooterProps) {
  const { footer } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.footer}>
      <div className={classes.social}>
        {footer?.socialLinks?.map((link) => (
          <PageLink key={link.title} href={link.url} passHref>
            <IconButton color='inherit' size='small' disableRipple disableFocusRipple edge='start'>
              {link.title.toLowerCase() === 'instagram' && <Instagram color='inherit' />}
              {link.title.toLowerCase() === 'linkedin' && <LinkedIn color='inherit' />}
              {link.title.toLowerCase() === 'twitter' && <Twitter color='inherit' />}
              {link.title.toLowerCase() === 'facebook' && <Facebook color='inherit' />}
              {link.title.toLowerCase() === 'youtube' && <Youtube color='inherit' />}
            </IconButton>
          </PageLink>
        ))}
      </div>
      <StoreSwitcherButton />
      <Button
        url='/service'
        title='Customer Service'
        variant='pill'
        color='inherit'
        className={classes.support}
      />
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
