import { useWatch } from '@graphcommerce/react-hook-form'
import { Box, Theme, useMediaQuery } from '@mui/material'
import { usePosition } from '../helpers/usePosition'
import { useStoreMarkers } from '../helpers/useStoreMarkers'
import { useStores } from '../helpers/useStores'
import { useCurrentPositionMarker } from './CurrentPositionMarker'
import { StoreFilters } from './StoreFilters'
import { StoreList } from './StoreList'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'
import { Marker } from './Marker'

export function StoreLocator() {
  const { ref, map } = useStoreLocatorMap()
  const { position, updatePosition } = usePosition()
  const { stores } = useStores(position)
  const { control } = useStoreLocatorForm()
  const [selected] = useWatch({ control, name: ['selected'] })

  // const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
  useCurrentPositionMarker(position)
  // useStoreMarkers(stores, isMobile, selected, map)
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
        <StoreList position={position} onLocationLookup={updatePosition} />
      </Box>

      <Box sx={{ height: '100%', gridArea: 'map' }} className='Scroller-root'>
        <Box sx={{ height: '100%' }} ref={ref} id='map' />
        {stores.map((store) => (
          <Marker key={store.pickup_location_code} store={store} />
        ))}
      </Box>
    </Box>
  )
}
