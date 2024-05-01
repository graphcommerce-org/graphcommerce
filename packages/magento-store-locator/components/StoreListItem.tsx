import { IconSvg } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ButtonBase, Typography, Box } from '@mui/material'
import React from 'react'
import { StoreFragment } from '../Store.gql'
import LocationPackageIcon from '../icons/LocationPackageIcon.svg'
import { StoreInfo } from './StoreInfo'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

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
            padding: { xs: '0.7em 4em 0.7em 0.7em', md: '0.8em 4em 0.8em 0.8em' },
            backgroundColor: theme.palette.background.paper,
            cursor: 'pointer',
            position: 'relative',
            width: '100%',
            borderRadius: '10px',
            display: 'flex',
            marginBottom: { xs: theme.spacings.xxs, md: theme.spacings.xs },
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            typography: theme.typography.body1,
            lineHeight: { xs: '22px', md: '1.7em' },
            border: isSelected
              ? `2px solid ${theme.palette.secondary.main}`
              : `1px solid ${theme.palette.divider}`,

            ...(isSelectedStore && {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            }),
          },

          ...(isSelected && {
            paddingRight: { xs: '0.7em !important', md: '0.8em !important' },
          }),

          ...(isClosestStore && {
            boxShadow: 4,
          }),

          '& .LocationPackageIcon': {
            position: 'absolute',
            right: '15px',
            top: 0,
            bottom: 0,
            margin: 'auto',
            height: '1.4em',
            fontSize: '40px',
          },
        })}
      >
        {isClosestStore && (
          <Typography variant='subtitle2' sx={(theme) => ({ color: theme.palette.primary.main })}>
            <Trans id='Closest store' />
          </Typography>
        )}
        {isSelectedStore && (
          <Typography variant='subtitle2' sx={(theme) => ({ color: theme.palette.primary.main })}>
            <Trans id='Selected store' />
          </Typography>
        )}
        <strong>{store.name}</strong>
        <Typography variant='body1' sx={{ '&.MuiTypography-root': { fontSize: '15px' } }}>
          {store.phone} <br />
          {store.street}, {store.postcode}, {store.city}
        </Typography>
        {isSelected ? (
          <StoreInfo content={store} />
        ) : (
          <IconSvg src={LocationPackageIcon} className='LocationPackageIcon' size='large' />
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
