import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { iconSearch, IconSvg } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StoreFilters = React.forwardRef<typeof TextFieldElement>((_, ref) => {
  const { control } = useStoreLocatorForm()

  return (
    <Box>
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
        sx={(theme) => ({
          mb: theme.spacings.xs,

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
            height: '45px',
          },
        })}
      />
    </Box>
  )
})
