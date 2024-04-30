import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { LazyHydrate } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Box, CircularProgress } from '@mui/material'
import { Suspense, useEffect, useRef } from 'react'

import { useFilteredStores } from '../helpers/useFilteredStores'
import { usePosition } from '../helpers/usePosition'
import { FindLocation, FindLocationProps } from './FindLocation'
import { StoreListItem } from './StoreListItem'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

type StoreListProps = Pick<FindLocationProps, 'onLocationLookup'> &
  Pick<ReturnType<typeof usePosition>, 'position'>

export function StoreList(props: StoreListProps) {
  const { position, onLocationLookup } = props
  const { locations: allLocations, visibleLocations, loading } = useFilteredStores(position)

  const locations = visibleLocations || allLocations

  const { control } = useStoreLocatorForm()
  const [selectedStore, selected] = useWatch({
    control,
    name: ['selectedStore', 'selected'],
  })

  const selectedElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedStore?.pickup_location_code && selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView()
    }
  }, [selectedStore, selectedElementRef])

  const fallbackLoader = (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacings.md,
        backgroundColor: theme.palette.background.image,
        height: '100%',
        rowGap: theme.spacings.xs,
        borderRadius: '10px',
        marginTop: { xs: theme.spacings.xs, md: 0 },
        border: '1px solid #00000010',
      })}
    >
      <CircularProgress />
      <Trans id='Loading stores...' />
    </Box>
  )

  return (
    <Suspense>
      <WaitForQueries waitFor={!loading} fallback={fallbackLoader}>
        {locations && locations?.length > 0 ? (
          <Box
            className='storeList'
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              maxHeight: { xs: '30vh', md: 'unset' },
              overflowY: 'auto',
              marginTop: { xs: theme.spacings.xs, md: 0 },
              scrollbarWidth: 'none',

              '&::-webkit-scrollbar': {
                display: 'none',
              },

              '& > section': {
                display: 'contents',
              },
            })}
          >
            {locations?.map((store, index) => {
              if (!store) return null

              return (
                <LazyHydrate
                  hydrated={index < 8 ? true : undefined}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${store.pickup_location_code}_${store.lng}x${store.lng}_${index}`}
                >
                  <StoreListItem
                    isClosestStore={!!(allLocations?.[0]?.name === store.name && position)}
                    selected={selected}
                    ref={
                      selectedStore?.pickup_location_code === store.pickup_location_code
                        ? selectedElementRef
                        : null
                    }
                    {...store}
                  />
                </LazyHydrate>
              )
            })}
          </Box>
        ) : (
          <Box
            sx={(theme) => ({
              padding: `${theme.spacings.md} ${theme.spacings.xxs} `,
              backgroundColor: 'primary.contrastText',
              textAlign: 'center',
              borderRadius: theme.shape.borderRadius * 2,
              border: '1px solid #00000010',
            })}
          >
            <Trans id='No results found' />
            <FindLocation onLocationLookup={onLocationLookup} />
          </Box>
        )}
      </WaitForQueries>
    </Suspense>
  )
}
