import { Image } from '@graphcommerce/image'
import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, IconButton, Link } from '@mui/material'
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
                filter: 'invert(0%)',
                ...theme.applyStyles('dark', {
                  filter: 'invert(100%)',
                }),
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
          <Trans>Customer Service</Trans>
        </Button>
      }
      copyright={
        <>
          <span>{footer?.copyright}</span>

          {footer?.legalLinks?.map((link) => (
            <Link key={link.title} href={link.url} underline='always' sx={{ color: 'textPrimary' }}>
              {link.title}
            </Link>
          ))}
          {import.meta.graphCommerce.magentoVersion >= 247 && (
            <Link href='/guest/orderstatus' underline='always' sx={{ color: 'textPrimary' }}>
              <Trans>Order status</Trans>
            </Link>
          )}
          {import.meta.graphCommerce.magentoVersion >= 247 && (
            <Link href='/service/contact-us' underline='always' sx={{ color: 'textPrimary' }}>
              <Trans>Contact</Trans>
            </Link>
          )}
          <Link href='/service/newsletter' underline='always' sx={{ color: 'textPrimary' }}>
            <Trans>Newletter</Trans>
          </Link>
        </>
      }
    />
  )
}
