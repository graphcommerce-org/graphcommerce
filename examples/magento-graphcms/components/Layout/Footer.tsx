import { Image } from '@graphcommerce/image'
import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Footer as FooterBase, Button, Link } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { IconButton } from '@mui/material'
import PageLink from 'next/link'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

export type FooterProps = FooterQueryFragment

export function Footer(props: FooterProps) {
  const { footer } = props

  return (
    <FooterBase
      socialLinks={footer?.socialLinks?.map(({ url, title, asset }) => (
        <IconButton
          key={title}
          LinkComponent={PageLink}
          href={url}
          title={title}
          color='inherit'
          size='medium'
          edge='start'
        >
          {asset ? (
            <Image
              layout='fill'
              src={asset.url}
              width={24}
              height={24}
              unoptimized
              alt={title}
              sx={(theme) => ({
                filter: theme.palette.mode === 'dark' ? 'invert(100%)' : 'invert(0%)',
              })}
            />
          ) : (
            title
          )}
        </IconButton>
      ))}
      storeSwitcher={<StoreSwitcherButton />}
      customerService={
        <Button href='/service' variant='pill'>
          <Trans id='Customer Service' />
        </Button>
      }
      copyright={
        <>
          <span>{footer?.copyright}</span>
          {footer?.legalLinks?.map((link) => (
            <Link key={link.title} href={link.url} color='textPrimary' underline='always'>
              {link.title}
            </Link>
          ))}
        </>
      }
    />
  )
}
