import { Image } from '@graphcommerce/image'
import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, IconButton, Link } from '@mui/material'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

export type FooterProps = FooterQueryFragment

export function Footer(props: FooterProps) {
  const { footer } = props
  const cartEnabled = useCheckoutGuestEnabled()

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
          <Trans>Customer Service</Trans>
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
          {import.meta.graphCommerce.magentoVersion >= 247 && cartEnabled && (
            <Link href='/guest/orderstatus' color='textPrimary' underline='always'>
              <Trans>Order status</Trans>
            </Link>
          )}
          {import.meta.graphCommerce.magentoVersion >= 247 && (
            <Link href='/service/contact-us' color='textPrimary' underline='always'>
              <Trans>Contact</Trans>
            </Link>
          )}
          <Link href='/service/newsletter' color='textPrimary' underline='always'>
            <Trans>Newletter</Trans>
          </Link>
        </>
      }
    />
  )
}
