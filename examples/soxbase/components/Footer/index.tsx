import { makeStyles, Container, Theme, IconButton } from '@material-ui/core'
import Facebook from '@material-ui/icons/Facebook'
import Instagram from '@material-ui/icons/Instagram'
import LinkedIn from '@material-ui/icons/LinkedIn'
import Twitter from '@material-ui/icons/Twitter'
import Youtube from '@material-ui/icons/Youtube'
import StoreSwitcherButton from '@reachdigital/magento-store/switcher/StoreSwitcherButton'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import Button from '../PageLink/Button'
import { FooterQuery } from './Footer.gql'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    borderTop: '1px solid rgba(0,0,0,0.15)',
    paddingTop: `${theme.spacings.md}`,
    paddingBottom: `${theme.spacings.md}`,
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    justifyContent: 'space-between',
    gap: `${theme.spacings.xs}`,
  },
  copyright: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, auto)',
    alignContent: 'center',
    gap: `${theme.spacings.sm}`,
    '& a': {
      color: '#000',
    },
  },
}))

export type FooterProps = FooterQuery

export default function Footer(props: FooterProps) {
  const { footer } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.footer}>
      <div>
        {footer?.socialLinks?.map((link) => (
          <PageLink key={link.title} href={link.url}>
            <IconButton color='inherit'>
              {link.title.toLowerCase() === 'instagram' ? <Instagram color='inherit' /> : false}
              {link.title.toLowerCase() === 'linkedin' ? <LinkedIn color='inherit' /> : false}
              {link.title.toLowerCase() === 'twitter' ? <Twitter color='inherit' /> : false}
              {link.title.toLowerCase() === 'facebook' ? <Facebook color='inherit' /> : false}
              {link.title.toLowerCase() === 'youtube' ? <Youtube color='inherit' /> : false}
            </IconButton>
          </PageLink>
        ))}
      </div>
      <StoreSwitcherButton />
      <div className={classes.copyright}>© Copyright Reach Digital</div>
      <Button
        key='#'
        url='#'
        title='Customer Service'
        variant='pill'
        size='large'
        color='inherit'
      />
    </Container>
  )
}
