import { useQuery } from '@graphcommerce/graphql'
import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
import { StoreConfigDocument, StoreSwitcherButton } from '@graphcommerce/magento-store'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { DateFormat, FindAndReplace, Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Button, Link } from '@mui/material'

export function Footer(props: { socialLinks?: React.ReactNode }) {
  const { socialLinks } = props
  const cartEnabled = useCheckoutGuestEnabled()
  const config = useQuery(StoreConfigDocument).data?.storeConfig

  const websiteName = config?.website_name
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
            {config?.copyright ? (
              <FindAndReplace source={config.copyright} findAndReplace={[['{YYYY}', year]]} />
            ) : (
              <Trans>
                Copyright© {year} {websiteName}
              </Trans>
            )}
          </span>

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
