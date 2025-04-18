import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { FabProps } from '@graphcommerce/next-ui'
import { Fab, iconLocation, iconSearch, IconSvg, sxx } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import { setPositionOnMap } from '../helpers/setPositionOnMap'
import { usePositionContext } from './PositionProvider'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export type StoreFiltersProps = {
  beforeSearch?: React.ReactNode
  afterSearch?: React.ReactNode
  fabProps?: FabProps
}

export const StoreFilters = React.forwardRef<typeof TextFieldElement>(
  (props: StoreFiltersProps, ref) => {
    const { beforeSearch, afterSearch, fabProps } = props
    const { sx: fabSx, ...fabRest } = fabProps || {}
    const { control } = useStoreLocatorForm()
    const { setPosition } = usePositionContext()
    const { map } = useStoreLocatorMap()
    const theme = useTheme()

    return (
      <Box
        className='StoreFilters-root'
        ref={ref}
        sx={{
          padding: theme.spacings.xs,
        }}
      >
        {beforeSearch}

        <Box
          className='StoreFilters-search'
          sx={{
            display: 'flex',
            gap: theme.spacings.xxs,
            alignItems: 'center',
          }}
        >
          <TextFieldElement
            fullWidth
            control={control}
            name='search'
            placeholder={i18n._(/* i18n */ 'Search your store by city, zip code or name')}
            autoComplete='off'
            InputProps={{
              inputProps: {
                id: 'StoreFilters_Input',
              },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconSvg src={iconSearch} />
                </InputAdornment>
              ),
            }}
            sx={{
              fieldset: {
                borderWidth: '2px',
              },

              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },

              '& .MuiInputBase-input': {
                fontSize: '16px',
                paddingLeft: theme.spacings.xs,
              },

              '& .MuiInputBase-root': {
                backgroundColor: theme.palette.background.paper,
                borderRadius: '40px',
                height: '50px',
              },
            }}
          />
          <Fab
            icon={iconLocation}
            {...fabRest}
            sx={sxx(
              {
                flexShrink: '0',
              },
              fabSx,
            )}
            onClick={() => {
              setPositionOnMap(map, setPosition)
            }}
          />
        </Box>

        {afterSearch}
      </Box>
    )
  },
)
