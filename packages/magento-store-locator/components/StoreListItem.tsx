import { IconSvg } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ButtonBase, Typography, useEventCallback, Box } from '@mui/material'
import { forwardRef } from 'react'
import { StoreFragment } from '../Store.gql'
import LocationPackageIcon from '../icons/LocationPackageIcon.svg'
import { StoreInfo } from './StoreInfo'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

type RetailStoreListItemProps = StoreFragment & {
  selected: string | undefined
  isClosestStore?: boolean
}

export const StoreListItem = forwardRef<HTMLDivElement, RetailStoreListItemProps>((props, ref) => {
  const { pickup_location_code, name, postcode, street, city, phone, selected, isClosestStore } =
    props

  const { control } = useStoreLocatorForm()
  const selectedStore = useWatch({ control, name: 'selectedStore' })
  const isSelectedStore = selectedStore?.pickup_location_code === pickup_location_code

  const { setValue } = useStoreLocatorForm()

  const select = useEventCallback(() => {
    if (!pickup_location_code) return
    setValue('selected', pickup_location_code)
  })

  return (
    <Box ref={ref} sx={{ order: isSelectedStore ? -1 : 0 }}>
      <ButtonBase
        component='div'
        key={pickup_location_code}
        onClick={select}
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
            border:
              selected === pickup_location_code
                ? `2px solid ${theme.palette.secondary.main}`
                : '1px solid #00000010',

            ...(isSelectedStore && {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            }),
          },

          ...(selected === pickup_location_code && {
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
        <strong>{name}</strong>
        <Typography variant='body1' sx={{ '&.MuiTypography-root': { fontSize: '15px' } }}>
          {phone} <br />
          {street}, {postcode}, {city}
        </Typography>
        {selected === pickup_location_code ? (
          <StoreInfo content={props} />
        ) : (
          <IconSvg src={LocationPackageIcon} className='LocationPackageIcon' size='large' />
        )}
      </ButtonBase>
    </Box>
  )
})
