import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  StoreLocatorMapLoader,
  StoreLocator,
  StoreLocatorFormProvider,
} from '@graphcommerce/magento-store-locator'
import { GetStaticProps, LayoutTitle, LayoutOverlayHeader, PageMeta } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function Stores() {
  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Stores')} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        divider={<Box sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })} />}
      >
        <LayoutTitle size='small' component='span'>
          <Trans id='Stores' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <StoreLocatorFormProvider>
        <StoreLocatorMapLoader>
          <StoreLocator />
        </StoreLocatorMapLoader>
      </StoreLocatorFormProvider>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'stores',
  Layout: LayoutOverlay,
  layoutProps: {
    variantSm: 'bottom',
    justifyMd: 'stretch',
    variantMd: 'bottom',
    sizeMd: 'floating',
    sizeSm: 'floating',
    sx: {
      '& .LayoutOverlayBase-overlay': {
        justifyItems: 'center',
      },
      '& .LayoutOverlayBase-overlayPane': {
        maxWidth: 1980,
        width: '100%',
      },
    },
  },
}
Stores.pageOptions = pageOptions

export default Stores

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
