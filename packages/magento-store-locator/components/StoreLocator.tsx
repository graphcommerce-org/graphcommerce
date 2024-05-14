import { Box } from '@mui/material'
import { StoreFragment } from '../Store.gql'
import { usePosition } from '../helpers/usePosition'
import { useStores } from '../helpers/useStores'
import { useCurrentPositionMarker } from './CurrentPositionMarker'

import { StoreFilters } from './StoreFilters'
import { StoreList } from './StoreList'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'
import { Marker } from './Marker'

export type MarkerConfig = {
  markerImageSrc?: string
  activeMarkerImageSrc?: string
  imageWidth?: number
  imageHeight?: number
  onMarkerClick?: (store: StoreFragment) => void
}

type StoreLocatorProps = {
  stores: StoreFragment[]
  markerConfig?: MarkerConfig
}

export function StoreLocator({ stores, markerConfig }: StoreLocatorProps) {
  const { ref } = useStoreLocatorMap()
  const { position } = usePosition()
  const { sortedStores } = useStores(position, stores)

  useCurrentPositionMarker(position)

  console.log('rendering storelocator')

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        flexDirection: { xs: 'column' },
        gridTemplateAreas: {
          md: '"filters map" "filters map"',
        },
        gridTemplateColumns: {
          md: 'minmax(375px, 700px) 1fr',
        },
        maxWidth: {
          md: '98vw',
        },
        height: '100%',
        '& .gm-style .gm-style-iw-c': {
          maxWidth: { xs: '90vw !important' },
        },
      }}
    >
      <Box
        sx={(theme) => ({
          gridArea: 'filters',
          padding: theme.spacings.xs,
          backgroundColor: theme.palette.background.default,
          height: { md: '100%' },
          gridTemplateAreas: { xs: 'none' },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxHeight: { md: 'calc(100vh - 80px)' }, // 80px is the height of the header @todo
          overflowY: { md: 'scroll' },
          scrollbarWidth: 'none',
        })}
      >
        <StoreFilters />
        <StoreList position={position} stores={sortedStores} />
      </Box>

      <Box sx={{ height: '100%', gridArea: 'map' }} className='Scroller-root'>
        <Box sx={{ height: '100%' }} ref={ref} id='map' />
        {sortedStores.map((store) => (
          <Marker key={store.pickup_location_code} store={store} markerConfig={markerConfig} />
        ))}
      </Box>
    </Box>
  )
}
