import { LazyHydrate } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { StoreFragment } from '../Store.gql'
import { useFilteredStores } from '../helpers/useFilteredStores'
import { PositionProps } from '../helpers/usePosition'
import { useStores } from '../helpers/useStores'
import { FindLocation } from './FindLocation'
import { StoreListItem } from './StoreListItem'

export const StoreListResults = React.memo<{ stores: StoreFragment[]; first?: string }>((props) => {
  const { stores: locations, first } = props

  return (
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
            key={`${store.pickup_location_code}`}
          >
            <StoreListItem
              key={`${store.pickup_location_code}`}
              isClosestStore={first === store.pickup_location_code}
              store={store}
            />
          </LazyHydrate>
        )
      })}
    </Box>
  )
})

export function StoreListNoResults(props: { updatePosition: (pos: PositionProps) => void }) {
  const { updatePosition } = props
  return (
    <Box
      sx={(theme) => ({
        padding: `${theme.spacings.md} ${theme.spacings.xxs} `,
        backgroundColor: 'primary.contrastText',
        textAlign: 'center',
        borderRadius: theme.shape.borderRadius * 2,
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Trans id='No results found' />
      <FindLocation updatePosition={updatePosition} />
    </Box>
  )
}

export function StoreListLoader() {
  return (
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
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <CircularProgress />
      <Trans id='Loading stores...' />
    </Box>
  )
}

export type StoreListProps = {
  position: PositionProps
  stores: StoreFragment[]
  updatePosition: (pos: PositionProps) => void
}

export function StoreList(props: StoreListProps) {
  const { position, stores, updatePosition } = props
  const { sortedStores } = useStores(position, stores)
  const filteredStores = useFilteredStores(sortedStores)
  const first = sortedStores?.[0]?.pickup_location_code
  const storeList = filteredStores || sortedStores

  return (
    <>
      {storeList.length > 0 ? (
        <StoreListResults
          first={position && first ? first : undefined}
          stores={filteredStores || sortedStores}
        />
      ) : (
        <StoreListNoResults updatePosition={updatePosition} />
      )}
    </>
  )
}
