import { IconSvg } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ButtonBase, Typography, Box, Chip } from '@mui/material'
import React from 'react'
import { StoreFragment } from '../Store.gql'
import LocationPackageIcon from '../icons/LocationPackageIcon.svg'
import { StoreInfo } from './StoreInfo'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { i18n } from '@lingui/core'
import { StoreChip } from './StoreChip'

type RetailStoreListItemProps = { store: StoreFragment; isClosestStore?: boolean }

const StoreListItemRender = React.memo<
  RetailStoreListItemProps & { isSelectedStore: boolean; isSelected: boolean }
>((props) => {
  const { store, isSelectedStore, isClosestStore, isSelected } = props
  const { setValue } = useStoreLocatorForm()

  return (
    <Box sx={{ order: isSelectedStore ? -1 : 0 }}>
      <ButtonBase
        component='div'
        onClick={() => {
          if (!store.pickup_location_code) return
          setValue('selected', store.pickup_location_code)
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
            border: isSelected
              ? `2px solid ${theme.palette.secondary.main}`
              : `1px solid ${theme.palette.divider}`,

            ...(isSelectedStore && {
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
          {isSelectedStore && (
            <StoreChip variant='primary' label={i18n._(/* i18n */ 'Your store')} />
          )}
          {isClosestStore && (
            <StoreChip variant='outlined' label={i18n._(/* i18n */ 'Closest store')} />
          )}
        </Box>
        {isSelected && (
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

  const [selectedStore, selected] = useWatch({ control, name: ['selectedStore', 'selected'] })

  const isSelectedStore = selectedStore?.pickup_location_code === store.pickup_location_code
  const isSelected = selected === store.pickup_location_code

  return (
    <StoreListItemRender {...props} isSelected={isSelected} isSelectedStore={isSelectedStore} />
  )
}
