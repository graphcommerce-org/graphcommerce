import { extendableComponent } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { debounce, TextField } from '@mui/material'
import { ChangeEvent, useCallback, useMemo } from 'react'
import { UseSearchBoxProps } from 'react-instantsearch-hooks'

const name = 'SearchBox' as const
const parts = ['root', 'totalProducts'] as const
const { classes } = extendableComponent(name, parts)

type SearchBoxProps = {
  refine: (value: string) => void
  defaultValue?: string
} & UseSearchBoxProps

export function SearchBox(props: SearchBoxProps) {
  const { defaultValue, refine } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(
      (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => refine(e.target.value),
      300,
    ),
    [refine],
  )

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
