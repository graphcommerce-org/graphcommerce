import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useStores } from '../helpers/useStores'
import type { StoreFragment } from '../Store.gql'
import { useCurrentPositionMarker } from './CurrentPositionMarker'
import { Marker } from './Marker'
import { usePositionContext } from './PositionProvider'
import { StoreFilters } from './StoreFilters'
import { StoreList } from './StoreList'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export type MarkerConfig = {
  defaultMarker?: React.ReactNode
  activeMarker?: React.ReactNode
  preferredStoreMarker?: React.ReactNode
  onMarkerClick?: (store: StoreFragment) => void
}

type StoreLocatorProps = {
  stores: StoreFragment[]
  markerConfig: MarkerConfig
  sx?: SxProps<Theme>
}

export function StoreLocator({ stores, markerConfig, sx }: StoreLocatorProps) {
  const { ref } = useStoreLocatorMap()
  const { position } = usePositionContext()
  const { sortedStores } = useStores(position, stores)

  useCurrentPositionMarker(position)

  return (
    <Box
      className='StoreLocator-root'
      sx={[
        (theme) => ({
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: '100%',
          paddingTop: {
            xs: theme.appShell.headerHeightSm,
            md: theme.appShell.appBarHeightMd,
          },
          maxWidth: '100vw',
          '& .gm-style .gm-style-iw-c': {
            maxWidth: { xs: '90vw !important' },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className='StoreLocator-listContainer'
        sx={(theme) => ({
          width: { xs: '100%', md: '30%' },
          minWidth: { md: '300px' },
          display: 'flex',
          flexDirection: 'column',
          flexGrow: {
            xs: 1,
            md: 0,
          },
          borderRight: { md: `1px solid ${theme.palette.divider}` },
          borderColor: 'divider',
          background: theme.palette.background.default,
          order: { xs: 2, md: 1 },
          height: { xs: 'auto', md: '100%' },
          overflowY: 'auto',
        })}
      >
        <StoreFilters />
        <Box
          sx={{ flexGrow: 1, overflowY: 'auto', scrollbarWidth: 'none' }}
          className='StoreLocator-list'
        >
          <StoreList position={position} stores={sortedStores} />
        </Box>
      </Box>

      <Box
        className='StoreLocator-mapContainer'
        sx={{
          flexGrow: 1,
          position: 'relative',
          order: { xs: 1, md: 2 },
          minHeight: { xs: '35vh', md: '100%' },
          maxHeight: { xs: '35vh', md: '100%' },
        }}
      >
        <Box
          ref={ref}
          id='map'
          sx={{ width: '100%', height: '100%' }}
          className='Scroller-root StoreLocator-map'
        />
        {sortedStores.map((store) => (
          <Marker key={store.pickup_location_code} store={store} markerConfig={markerConfig} />
        ))}
      </Box>
    </Box>
  )
}
