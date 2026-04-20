import { useQuery } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import { useCheckoutGuestEnabled } from '@graphcommerce/magento-cart'
import { StoreConfigDocument, StoreSwitcherButton } from '@graphcommerce/magento-store'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { DateFormat, FindAndReplace, Footer as FooterBase } from '@graphcommerce/next-ui'
import { storyblokEditable } from '@graphcommerce/storyblok-ui'
import { Trans } from '@lingui/react/macro'
import { Button, IconButton, Link } from '@mui/material'
import { useRouter } from 'next/router'
import type { MouseEventHandler } from 'react'
import { useGlobalConfig } from '../Storyblok/GlobalConfigProvider'
import type { StoryblokGlobalConfig } from '../Storyblok/types'

export type FooterProps = { globalConfig?: StoryblokGlobalConfig | null }

export function Footer(props: FooterProps) {
  const contextConfig = useGlobalConfig()
  const globalConfig = props.globalConfig ?? contextConfig
  const isEditor = Boolean(useRouter().query._storyblok)
  const preventNav: MouseEventHandler | undefined = isEditor ? (e) => e.preventDefault() : undefined
  const cartEnabled = useCheckoutGuestEnabled()
  const config = useQuery(StoreConfigDocument).data?.storeConfig

  const websiteName = config?.website_name
  const year = <DateFormat dateStyle={undefined} year='numeric' date={new Date()} />

  return (
    <FooterBase
      socialLinks={globalConfig?.social_links?.map((link) => (
        <IconButton
          {...storyblokEditable(link)}
          key={link._uid}
          href={link.url ?? ''}
          onClick={preventNav}
          color='inherit'
          size='medium'
          edge='start'
        >
          {link.asset?.filename ? (
            <Image
              layout='fill'
              src={link.asset.filename}
              width={24}
              height={24}
              unoptimized
              alt={link.title ?? ''}
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
          <span {...storyblokEditable(globalConfig)}>
            {globalConfig?.copyright ? (
              <FindAndReplace source={globalConfig.copyright} findAndReplace={[['{YYYY}', year]]} />
            ) : config?.copyright ? (
              <FindAndReplace source={config.copyright} findAndReplace={[['{YYYY}', year]]} />
            ) : null}
          </span>

          {globalConfig?.legal_links?.map((link) => (
            <Link
              {...storyblokEditable(link)}
              key={link._uid}
              href={link.url ?? ''}
              onClick={preventNav}
              color='textPrimary'
              underline='always'
            >
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
