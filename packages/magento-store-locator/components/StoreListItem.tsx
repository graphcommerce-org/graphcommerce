import { useWatch } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { ButtonBase, Typography, Box } from '@mui/material'
import React from 'react'
import { StoreFragment } from '../Store.gql'
import { StoreChip } from './StoreChip'
import { StoreInfo } from './StoreInfo'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

type RetailStoreListItemProps = { store: StoreFragment; isClosestStore?: boolean }

const StoreListItemRender = React.memo<
  RetailStoreListItemProps & { isPreferredStore: boolean; isFocusedStore: boolean }
>((props) => {
  const { store, isPreferredStore, isClosestStore, isFocusedStore } = props
  const { setValue } = useStoreLocatorForm()

  console.log('Rendering listitem', store.pickup_location_code)

  return (
    <Box sx={{ order: isFocusedStore ? -1 : 0 }}>
      <ButtonBase
        component='div'
        onClick={() => {
          if (!store.pickup_location_code) return
          setValue('focusedStore', store.pickup_location_code)
        }}
        sx={(theme) => ({
          '&.MuiButtonBase-root': {
            padding: theme.spacings.xxs,
            backgroundColor: theme.palette.background.paper,
            cursor: 'pointer',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
            borderRadius: '10px',
            marginBottom: { xs: theme.spacings.xxs, md: theme.spacings.xs },
            typography: theme.typography.body1,
            // lineHeight: { xs: '22px', md: '1.7em' },
            border: isFocusedStore
              ? `2px solid ${theme.palette.secondary.main}`
              : `1px solid ${theme.palette.divider}`,

            ...(isPreferredStore && {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            }),
          },
          ...(isClosestStore && {
            boxShadow: 4,
          }),
        })}
      >
        <Box>
          <strong>{store.name}</strong>
          <Typography variant='body1' sx={{ '&.MuiTypography-root': { fontSize: '15px' } }}>
            {store.phone} <br />
            {store.street}, {store.postcode}, {store.city}
          </Typography>
        </Box>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignSelf: 'stretch',
            flexDirection: 'column',
            gap: theme.spacings.xxs,
          })}
        >
          {isPreferredStore && (
            <StoreChip variant='primary' label={i18n._(/* i18n */ 'Your store')} />
          )}
          {isClosestStore && (
            <StoreChip variant='outlined' label={i18n._(/* i18n */ 'Closest store')} />
          )}
        </Box>
        {isFocusedStore && (
          <Box sx={{ flexBasis: '100%' }}>
            <StoreInfo content={store} />
          </Box>
        )}
      </ButtonBase>
    </Box>
  )
})

export function StoreListItem(props: RetailStoreListItemProps) {
  const { store } = props
  const { control } = useStoreLocatorForm()

  const [preferredStore, focusedStore] = useWatch({
    control,
    name: ['preferredStore', 'focusedStore'],
  })

  const isPreferredStore = preferredStore?.pickup_location_code === store.pickup_location_code
  const isFocusedStore = focusedStore === store.pickup_location_code

  return (
    <StoreListItemRender
      {...props}
      isFocusedStore={isFocusedStore}
      isPreferredStore={isPreferredStore}
    />
  )
}
