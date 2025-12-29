import { Image } from '@graphcommerce/image'
import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
import { StoreConfigDocument, StoreSwitcherButton } from '@graphcommerce/magento-store'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { DateFormat, FindAndReplace, Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Button, IconButton, Link } from '@mui/material'
import { FooterQueryFragment } from './FooterQueryFragment.gql'
import { useQuery } from '@graphcommerce/graphql'

export type FooterProps = FooterQueryFragment

export function Footer(props: FooterProps) {
  const { footer } = props
  const cartEnabled = useCheckoutGuestEnabled()
  const config = useQuery(StoreConfigDocument).data?.storeConfig
  const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />

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
          <span>
            {config?.copyright ? (
              <FindAndReplace source={config.copyright} findAndReplace={[['{YYYY}', year]]} />
            ) : (
              footer?.copyright
            )}
          </span>

          {footer?.legalLinks?.map((link) => (
            <Link key={link.title} href={link.url} color='textPrimary' underline='always'>
              {link.title}
            </Link>
          ))}
          {magentoVersion >= 247 && cartEnabled && (
            <Link href='/guest/orderstatus' color='textPrimary' underline='always'>
              <Trans>Order status</Trans>
            </Link>
          )}
          {magentoVersion >= 247 && (
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
