import { Trans } from '@lingui/react'
import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { useFilteredStores } from '../helpers/useFilteredStores'
import { useStores } from '../helpers/useStores'
import type { StoreFragment } from '../Store.gql'
import { FindLocation } from './FindLocation'
import type { PositionProps } from './PositionProvider'
import { StoreListItem } from './StoreListItem'

export const StoreListResults = React.memo<{ stores: StoreFragment[]; first?: string }>((props) => {
  const { stores: locations, first } = props

  return (
    <Box
      className='storeList'
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        scrollbarWidth: '100px',
        padding: theme.spacings.xs,
        pt: 0,

        '&::-webkit-scrollbar': {
          display: 'none',
        },

        '& > section': {
          display: 'contents',
        },
      })}
    >
      {locations?.map((store) => {
        if (!store) return null

        return (
          <StoreListItem
            key={`${store.pickup_location_code}`}
            isClosestStore={first === store.pickup_location_code}
            store={store}
          />
        )
      })}
    </Box>
  )
})

export function StoreListNoResults() {
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
      <FindLocation />
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
}

export function StoreList(props: StoreListProps) {
  const { position, stores } = props
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
        <StoreListNoResults />
      )}
    </>
  )
}
