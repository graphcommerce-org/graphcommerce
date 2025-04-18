import { i18n } from '@lingui/core'
import { Box, Typography } from '@mui/material'
import { StoreChip } from './StoreChip'
import { StoreInfo } from './StoreInfo'
import type { StoreListItemRenderProps } from './StoreListItem'

export type StoreListItemContentProps = StoreListItemRenderProps & { content?: React.ReactNode }
export function StoreListItemContent({
  store,
  isFocusedStore,
  isPreferredStore,
  isClosestStore,
  content,
}: StoreListItemContentProps) {
  return (
    <>
      <Box className='StoreListItemContent-info'>
        <strong>{store.name}</strong>
        <Typography variant='body1' sx={{ '&.MuiTypography-root': { fontSize: '15px' } }}>
          {store.phone} <br />
          {store.street}, {store.postcode}, {store.city}
        </Typography>
      </Box>
      <Box
        className='StoreListItemContent-details'
        sx={(theme) => ({
          display: 'flex',
          alignSelf: 'stretch',
          flexDirection: 'column',
          gap: theme.spacings.xxs,
        })}
      >
        {isPreferredStore && (
          <StoreChip
            className='StoreListItemContent-preferredStore'
            variant='primary'
            label={i18n._(/* i18n */ 'Your store')}
          />
        )}
        {isClosestStore && (
          <StoreChip
            className='StoreListItemContent-closestStore'
            variant='outlined'
            label={i18n._(/* i18n */ 'Closest store')}
          />
        )}

        {store.details}
      </Box>
      {isFocusedStore && (
        <Box className='StoreListItemContent-content' sx={{ flexBasis: '100%' }}>
          <StoreInfo store={store} />

          {content}
        </Box>
      )}
    </>
  )
}
