import type { SearchFormProps } from '@graphcommerce/magento-search'
import { Trans } from '@lingui/react'
import { Box, debounce } from '@mui/material'
import TextField from '@mui/material/TextField'
import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import type { UseSearchBoxProps } from 'react-instantsearch-hooks-web'
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'

export type SearchBoxProps = UseSearchBoxProps & SearchFormProps

export function SearchBox(props: SearchBoxProps) {
  const { search, textFieldProps, sx = [] } = props
  const searchInputElement = useRef<HTMLInputElement>(null)

  const { refine } = useSearchBox()
  const { results } = useHits()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(
      (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => refine(e.target.value),
      import.meta.graphCommerce.algoliaSearchDebounceTime ?? 0,
    ),
    [refine],
  )

  useEffect(() => {
    if (search) refine(search)
  }, [search, refine])

  const totalResults = results?.nbHits ?? 0

  const endAdornment = (
    <Box
      sx={(theme) => ({
        minWidth: 'max-content',
        color: theme.palette.text.disabled,
        paddingRight: '7px',
      })}
    >
      {totalResults === 1 && <Trans id='{totalResults} result' values={{ totalResults }} />}
      {totalResults > 1 && <Trans id='{totalResults} results' values={{ totalResults }} />}
    </Box>
  )

  return (
    <TextField
      autoFocus
      variant='outlined'
      type='text'
      name='search'
      InputProps={{ endAdornment }}
      inputRef={searchInputElement}
      onChange={debounceSearch}
      fullWidth
      sx={[{ mt: 1, mb: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...textFieldProps}
    />
  )
}
