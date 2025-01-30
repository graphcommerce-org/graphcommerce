import { useQuery } from '@graphcommerce/graphql'
import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
import { StoreConfigDocument, StoreSwitcherButton } from '@graphcommerce/magento-store'
import { DateFormat, Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, Link } from '@mui/material'

export function Footer(props: { socialLinks?: React.ReactNode }) {
  const { socialLinks } = props
  const cartEnabled = useCheckoutGuestEnabled()
  const config = useQuery(StoreConfigDocument)

  const websiteName = config.data?.storeConfig?.website_name
  const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />

  return (
    <FooterBase
      socialLinks={socialLinks}
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
