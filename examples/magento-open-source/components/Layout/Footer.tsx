import { useQuery } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
import { StoreConfigDocument, StoreSwitcherButton } from '@graphcommerce/magento-store'
import { DateFormat, Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, IconButton, Link } from '@mui/material'

export function Footer() {
  const cartEnabled = useCheckoutGuestEnabled()
  const config = useQuery(StoreConfigDocument)

  const websiteName = config.data?.storeConfig?.website_name
  const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />

  return (
    <FooterBase
      socialLinks={[
        <IconButton
          href='https://www.graphcommerce.org/'
          color='inherit'
          size='medium'
          edge='start'
        >
          <Image
            layout='fill'
            src='https://www.graphcommerce.org/favicon.svg'
            width={24}
            height={24}
            alt='GraphCommerce website'
            unoptimized
            sx={(theme) => ({
              filter: theme.palette.mode === 'dark' ? 'invert(100%)' : 'invert(0%)',
            })}
          />
        </IconButton>,
      ]}
      storeSwitcher={<StoreSwitcherButton />}
      customerService={
        <Button href='/service' variant='pill'>
          <Trans>Customer Service</Trans>
        </Button>
      }
      copyright={
        <>
          <span>
            <Trans>
              Copyright© {year} {websiteName}
            </Trans>
          </span>

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
