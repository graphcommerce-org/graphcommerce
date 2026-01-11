'use client'

import { DateFormat, Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Button, Link } from '@mui/material'

export type FooterProps = {
  socialLinks?: string | null
  store: string
}

export function Footer(props: FooterProps) {
  const { socialLinks, store } = props

  const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />

  return (
    <FooterBase
      socialLinks={
        socialLinks ? <div dangerouslySetInnerHTML={{ __html: socialLinks }} /> : <div />
      }
      customerService={
        <Button href={`/${store}/service`} variant='pill'>
          <Trans>Customer Service</Trans>
        </Button>
      }
      copyright={
        <>
          <span>
            <Trans>Copyright © {year} GraphCommerce. All rights reserved.</Trans>
          </span>
          <Link href={`/${store}/service/contact-us`} color='textPrimary' underline='always'>
            <Trans>Contact</Trans>
          </Link>
          <Link href={`/${store}/service/newsletter`} color='textPrimary' underline='always'>
            <Trans>Newsletter</Trans>
          </Link>
        </>
      }
    />
  )
}
