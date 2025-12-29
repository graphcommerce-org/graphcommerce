import type { SearchFormProps } from '@graphcommerce/magento-search'
import { algoliaSearchDebounceTime } from '@graphcommerce/next-config/config'
import { sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
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
      algoliaSearchDebounceTime ?? 0,
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
        color: theme.vars.palette.text.disabled,
        paddingRight: '7px',
      })}
    >
      {totalResults === 1 && <Trans>{totalResults} result</Trans>}
      {totalResults > 1 && <Trans>{totalResults} results</Trans>}
    </Box>
  )

  return (
    <TextField
      autoFocus
      variant='outlined'
      type='text'
      name='search'
      inputRef={searchInputElement}
      onChange={debounceSearch}
      fullWidth
      sx={sxx({ mt: 1, mb: 1 }, sx)}
      {...textFieldProps}
      slotProps={{
        input: { endAdornment },
      }}
    />
  )
}
