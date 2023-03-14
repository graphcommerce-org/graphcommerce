import { Image } from '@graphcommerce/image'
import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

export type FooterProps = FooterQueryFragment

export function Footer(props: FooterProps) {
  const { footer } = props

  return (
    <FooterBase
      socialLinks={footer?.socialLinks?.map((link) => (
        <IconButton key={link.title} href={link.url} color='inherit' size='medium' edge='start'>
          {link.asset ? (
            <Image
              layout='fill'
              src={link.asset.url}
              width={24}
              height={24}
              unoptimized
              alt={link.title}
              sx={(theme) => ({
                filter: theme.palette.mode === 'dark' ? 'invert(100%)' : 'invert(0%)',
              })}
            />
          ) : (
            link.title
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
