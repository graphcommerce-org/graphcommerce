import { makeStyles, Container, Theme, IconButton } from '@material-ui/core'
import Facebook from '@material-ui/icons/Facebook'
import Instagram from '@material-ui/icons/Instagram'
import LinkedIn from '@material-ui/icons/LinkedIn'
import Twitter from '@material-ui/icons/Twitter'
import StoreSwitcherButton from '@reachdigital/magento-store/switcher/StoreSwitcherButton'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import Button from '../PageLink/Button'
import { FooterQuery } from './Footer.gql'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    borderTop: '1px solid rgba(0,0,0,0.08)',
    paddingTop: `${theme.spacings.xs}`,
    paddingBottom: `${theme.spacings.xs}`,
    display: 'grid',
    gridAutoRows: '1fr',
    gap: `${theme.spacings.xs}`,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyItems: 'center',
      '& > *': {
        maxWidth: 'max-content',
      },
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: `${theme.spacings.md}`,
      paddingBottom: `${theme.spacings.md}`,
      gridTemplateColumns: 'auto auto',
      gridTemplateRows: 'auto',
      justifyContent: 'space-between',
    },
  },
  copyright: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignContent: 'center',
    fontSize: '9px',
    gap: `${theme.spacings.sm}`,
    [theme.breakpoints.up('md')]: {
      order: '3',
      ...theme.typography.body2,
    },
    '& a': {
      color: '#000',
    },
  },
  support: {
    [theme.breakpoints.up('md')]: {
      order: '4',
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

export type FooterProps = FooterQuery

export default function Footer(props: FooterProps) {
  const { footer } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.footer}>
      <div className={classes.social}>
        {footer?.socialLinks?.map((link) => (
          <PageLink key={link.title} href={link.url}>
            <IconButton color='inherit' size='small' disableRipple disableFocusRipple edge='start'>
              {link.title.toLowerCase() === 'instagram' ? <Instagram color='inherit' /> : false}
              {link.title.toLowerCase() === 'linkedin' ? <LinkedIn color='inherit' /> : false}
              {link.title.toLowerCase() === 'twitter' ? <Twitter color='inherit' /> : false}
              {link.title.toLowerCase() === 'facebook' ? <Facebook color='inherit' /> : false}
            </IconButton>
          </PageLink>
        ))}
      </div>
      <StoreSwitcherButton />
      <Button
        key='#'
        url='#'
        title='Customer Service'
        variant='pill'
        color='inherit'
        className={classes.support}
      />
      <div className={classes.copyright}>
        <span>{footer?.copyright}</span>
        {footer?.legalLinks?.map((link) => (
          <PageLink key={link.title} href={link.url}>
            {link.title}
          </PageLink>
        ))}
      </div>
    </Container>
  )
}
