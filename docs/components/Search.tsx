import { iconSearch, IconSvg } from '@graphcommerce/next-ui'
import { IconButton, TextField, TextFieldProps } from '@mui/material'
import dynamic from 'next/dynamic'
import { useState } from 'react'

function SearchButton(props: TextFieldProps) {
  return (
    <TextField
      type='input'
      name='query'
      placeholder='Search...'
      InputProps={
        <IconButton size='small'>
          <IconSvg src={iconSearch} />
        </IconButton>
      }
      sx={{ width: '100%', mb: 2 }}
      {...props}
    />
  )
}

const SearchForm = dynamic(() => import('./SearchForm'), {
  ssr: false,
  loading: () => <SearchButton />,
})

/** Swap SearchButton with SearchForm onFocus */
export function Search(props: TextFieldProps) {
  const [load, setLoad] = useState(false)

  const handleFocus = () => setLoad(true)

  if (!load) return <SearchButton onFocus={handleFocus} {...props} />

  return <SearchForm {...props} />
}
