import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, SheetVariant } from '@graphcommerce/next-ui'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components/Layout/LayoutOverlay'
import apolloClient from '../../../lib/apolloClient'
import { AppShellDemo } from '../minimal-page-shell/[[...url]]'

function SheetDemo() {
  return <AppShellDemo baseUrl='/test/sheet' />
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'test',
  Layout: LayoutOverlay,
  sharedKey: (router) => {
    const key = [
      router.pathname,
      router.asPath.includes('left') ? 'left' : false,
      router.asPath.includes('right') ? 'right' : false,
      router.asPath.includes('bottom') ? 'bottom' : false,
      router.asPath.includes('primary') ? 'primary' : false,
      router.asPath.includes('stepper') ? 'stepper' : false,
      router.asPath.includes('icon') ? 'icon' : false,
    ]
      .filter(Boolean)
      .join('-')

    return key
  },
}
SheetDemo.pageOptions = pageOptions

export const getStaticPaths = async ({ locales = [] }) =>
  // Disable getStaticPaths for test pages
  ({ paths: [], fallback: 'blocking' })

export const getStaticProps: GetStaticProps<
  LayoutOverlayProps,
  Record<string, unknown>,
  { url: string[] }
> = async ({ params, locale }) => {
  const url = params?.url ?? []
  const isLeftSidebar = url?.[0] === 'left'
  const isRightSidebar = url?.[0] === 'right'
  const client = apolloClient(locale, true)

  const conf = client.query({ query: StoreConfigDocument })

  const variant = (((isLeftSidebar || isRightSidebar) && url?.[0]) || 'bottom') as SheetVariant

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantSm: variant,
      variantMd: variant,
    },
  }
}

export default SheetDemo
