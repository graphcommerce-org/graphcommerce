import { i18n } from '@lingui/core'
import { debounce } from '@mui/material'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks'

type SearchBoxProps = {
  defaultValue?: string
} & UseSearchBoxProps

export function SearchBox(props: SearchBoxProps) {
  const { defaultValue } = props
  const { refine } = useSearchBox()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(
      (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => refine(e.target.value),
      300,
    ),
    [refine],
  )

  useEffect(() => {
    if (defaultValue) refine(defaultValue)
  }, [defaultValue, refine])

  return (
    <TextField
      name='defaultValue'
      variant='outlined'
      type='text'
      placeholder={i18n._(/* i18n */ 'Search')}
      defaultValue={defaultValue}
      onChange={debounceSearch}
      fullWidth
    />
  )
}
