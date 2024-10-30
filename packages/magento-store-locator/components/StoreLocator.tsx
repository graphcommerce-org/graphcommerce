import { Box } from '@mui/material'
import { StoreFragment } from '../Store.gql'
import { useStores } from '../helpers/useStores'
import { useCurrentPositionMarker } from './CurrentPositionMarker'
import { Marker } from './Marker'
import { usePositionContext } from './PositionProvider'
import { StoreFilters } from './StoreFilters'
import { StoreList } from './StoreList'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export type MarkerConfig = {
  markerImageSrc?: string
  activeMarkerImageSrc?: string
  preferredStoreMarkerImageSrc?: string
  imageWidth?: number
  imageHeight?: number
  onMarkerClick?: (store: StoreFragment) => void
}

type StoreLocatorProps = {
  stores: StoreFragment[]
  markerConfig: MarkerConfig
}

export function StoreLocator({ stores, markerConfig }: StoreLocatorProps) {
  const { ref } = useStoreLocatorMap()
  const { position } = usePositionContext()
  const { sortedStores } = useStores(position, stores)

  useCurrentPositionMarker(position)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
        paddingTop: (theme) => ({
          xs: theme.appShell.headerHeightSm,
          md: theme.appShell.appBarHeightMd,
        }),
        maxWidth: '100vw',
        '& .gm-style .gm-style-iw-c': {
          maxWidth: { xs: '90vw !important' },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '30%' },
          minWidth: { md: '300px' },
          display: 'flex',
          flexDirection: 'column',
          flexGrow: {
            xs: 1,
            md: 0,
          },
          borderRight: { md: '1px solid' },
          borderColor: 'divider',
          background: (theme) => theme.palette.background.default,
          order: { xs: 2, md: 1 },
          height: { xs: 'auto', md: '100%' },
          overflowY: 'auto',
        }}
      >
        <StoreFilters />
        <Box sx={{ flexGrow: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
          <StoreList position={position} stores={sortedStores} />
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          order: { xs: 1, md: 2 },
          minHeight: { xs: '35vh', md: '100%' },
          maxHeight: { xs: '35vh', md: '100%' },
        }}
      >
        <Box ref={ref} id='map' sx={{ width: '100%', height: '100%' }} className='Scroller-root' />
        {sortedStores.map((store) => (
          <Marker key={store.pickup_location_code} store={store} markerConfig={markerConfig} />
        ))}
      </Box>
    </Box>
  )
}
