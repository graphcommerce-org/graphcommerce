import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Button, Footer as NextFooter, SocialIcon } from '@graphcommerce/next-ui'
import { IconButton, Link } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

export type FooterProps = FooterQueryFragment & { disableMargin?: boolean }

export default function Footer(props: FooterProps) {
  const { footer, disableMargin } = props

  return (
    <NextFooter
      socialLinks={
        <>
          {footer?.socialLinks?.map((link) => (
            <PageLink key={link.title} href={link.url} passHref>
              <IconButton
                color='inherit'
                size='small'
                disableRipple
                disableFocusRipple
                edge='start'
              >
                {link.asset ? (
                  <SocialIcon
                    src={link.asset.url}
                    width={24}
                    height={24}
                    alt={link.title}
                    size='small'
                  />
                ) : (
                  link.title
                )}
              </IconButton>
            </PageLink>
          ))}
        </>
      }
      storeSwitcher={<StoreSwitcherButton />}
      customerService={
        <PageLink href='/service' passHref>
          <Button variant='pill' color='inherit'>
            Customer Service
          </Button>
        </PageLink>
      }
      copyright={
        <>
          <span>{footer?.copyright}</span>
          {footer?.legalLinks?.map((link) => (
            <PageLink key={link.title} href={link.url} passHref>
              <Link color='textPrimary' underline='always'>
                {link.title}
              </Link>
            </PageLink>
          ))}
        </>
      }
      disableMargin={disableMargin}
    />
  )
}
