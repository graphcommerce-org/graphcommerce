import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  StoreLocatorMapLoader,
  StoreLocator,
  StoreLocatorFormProvider,
} from '@graphcommerce/magento-store-locator'
import { StoreFragment } from '@graphcommerce/magento-store-locator/Store.gql'
import { StoresDocument } from '@graphcommerce/magento-store-locator/Stores.gql'
import { GetStaticProps, LayoutTitle, LayoutOverlayHeader, PageMeta } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function Stores({ stores }: { stores: StoreFragment[] }) {
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
        <StoreLocatorMapLoader
          mapOptions={{
            center: {
              lat: 52.21305320395243,
              lng: 5.7388971606916925,
            },
            restriction: {
              latLngBounds: {
                north: 53.793538,
                south: 50.748514,
                west: 3.394408,
                east: 7.149987,
              },
              strictBounds: false,
            },
            zoom: 6,
            minZoom: 6,
            zoomControl: true,
            mapId: 'e827860a9d12894b',
            mapTypeControl: false,
            streetViewControl: true,
          }}
        >
          <StoreLocator
            stores={stores}
            markerConfig={{
              markerImageSrc: '/icons/marker.svg',
              activeMarkerImageSrc: '/icons/marker-active.svg',
              preferredStoreMarkerImageSrc: '/icons/marker-my-store.svg',
              imageHeight: 45,
              imageWidth: 45,
              onMarkerClick: (store: StoreFragment) =>
                console.log('hello from', store.pickup_location_code),
            }}
          />
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
        minHeight: '80vh',
      },
      '& .LayoutOverlayBase-background': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
    },
  },
}
Stores.pageOptions = pageOptions

export default Stores

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const stores = client.query({ query: StoresDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      stores: (await stores).data.pickupLocations?.items ?? [],
    },
  }
}
