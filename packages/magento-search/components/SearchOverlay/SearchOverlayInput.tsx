import { InputBaseElement } from '@graphcommerce/ecommerce-ui'
import { ProductListParams, useProductFiltersPro } from '@graphcommerce/magento-product'
import { FormAutoSubmit, useDebounce } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/macro'
import { BoxProps, SxProps, Theme, Box, InputBaseProps } from '@mui/material'
import React from 'react'
import { useSearchResultRemaining } from '../ProductFiltersPro/ProductFiltersProSearchHeader'
import { useSearchInput } from './SearchOverlayProvider'
import { useRecentSearches } from './useRecentSearches'

function SearchInputShadow(
  props: BoxProps<'div'> & { params: ProductListParams; inputSx?: SxProps<Theme> },
) {
  const { params, sx, inputSx, ...rest } = props
  const { remaining, resultSearch, targetSearch } = useSearchResultRemaining(params)

  return (
    <Box
      component='div'
      sx={[
        { display: 'flex', height: '100%', alignItems: 'center' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {!resultSearch && !targetSearch ? (
        <Box component='span'>{resultSearch}</Box>
      ) : (
        <>
          <Box
            component='span'
            sx={[{ color: 'transparent' }, ...(Array.isArray(inputSx) ? inputSx : [inputSx])]}
          >
            {resultSearch}
          </Box>
          <Box
            component='span'
            sx={[
              {
                typography: 'h4',
                color: 'transparent',
                borderBottom: '2px solid',
                borderImage: 'linear-gradient(108deg,#0894FF,#C959DD 34%,#FF2E54 68%,#FF9004)',
                borderImageSlice: 1,
              },
              ...(Array.isArray(inputSx) ? inputSx : [inputSx]),
            ]}
          >
            {remaining}
          </Box>
        </>
      )}
    </Box>
  )
}

type SearchInputProps = Omit<InputBaseProps, 'name' | 'defaultValue' | 'ref'> & {
  params: ProductListParams
  inputSx?: SxProps<Theme>
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (props, rootRef) => {
    const { params, sx, inputSx, inputRef, ...rest } = props
    const { form, submit } = useProductFiltersPro()

    const { getRootProps } = useSearchInput({ rootRef })
    const { ref, selected, ...rootProps } = getRootProps()
    const { updateRecentSearches } = useRecentSearches()

    return (
      <Box sx={{ display: 'grid', '& > *': { gridArea: '1 / 1' }, height: '100%' }}>
        <InputBaseElement
          control={form.control}
          name='search'
          color='primary'
          size='medium'
          fullWidth
          autoFocus
          placeholder={t`Search...`}
          type='text'
          spellCheck='false'
          autoComplete='off'
          sx={[
            (theme) => ({
              '& .MuiInputBase-input': { ...inputSx },
              ...(selected && {
                boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
              }),
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          {...rest}
          {...rootProps}
          inputRef={ref}
          onKeyUp={useDebounce(() => {
            updateRecentSearches(form.getValues('search') ?? '')
          }, 1000)}
        />
        <SearchInputShadow params={params} sx={sx} inputSx={inputSx} />
        <FormAutoSubmit control={form.control} name={['search']} submit={submit} leading />
      </Box>
    )
  },
)

if (process.env.NODE_ENV !== 'production') {
  SearchInput.displayName = 'SearchInput'
}
