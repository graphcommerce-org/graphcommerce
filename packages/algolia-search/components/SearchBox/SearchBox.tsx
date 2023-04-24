import { Trans } from '@lingui/react'
import { Box, debounce } from '@mui/material'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import { useHits, useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks'

type SearchBoxProps = {
  defaultValue?: string
} & UseSearchBoxProps

export function SearchBox(props: SearchBoxProps) {
  const { defaultValue } = props
  const searchInputElement = useRef<HTMLInputElement>(null)

  const { refine } = useSearchBox()
  const { results } = useHits()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => refine(e.target.value), 0),
    [refine],
  )

  useEffect(() => {
    if (defaultValue) refine(defaultValue)
  }, [defaultValue, refine])

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
      variant='outlined'
      type='text'
      name='search'
      InputProps={{ endAdornment }}
      inputRef={searchInputElement}
      onChange={debounceSearch}
      fullWidth
      sx={{ mt: 1 }}
    />
  )
}
