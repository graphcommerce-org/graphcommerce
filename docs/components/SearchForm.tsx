/* eslint-disable no-underscore-dangle */
import { IconSvg, iconClose, iconSearch } from '@graphcommerce/next-ui'
import { useForm, useFormAutoSubmit, useFormMuiRegister } from '@graphcommerce/react-hook-form'
import {
  Box,
  IconButton,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  darken,
  TextFieldProps,
} from '@mui/material'
import { Hit, HitAttributeSnippetResult } from 'instantsearch.js'
import Link from 'next/link'
import { InstantSearch, useSearchBox } from 'react-instantsearch-hooks'
import { instantSearchProps, useHits } from '../lib/instantSearch'

function Snippet(hit: Hit) {
  if (!hit._snippetResult) return null

  const snippets = Object.entries(hit._snippetResult)
    .map(([field, snip]) => snip as HitAttributeSnippetResult)
    .filter((snip) => snip.matchLevel !== 'none')
    .map((snip) => snip.value)

  return (
    <>
      {snippets.map((snip) => (
        <Box component='span' key={snip} dangerouslySetInnerHTML={{ __html: snip }} sx={{}} />
      ))}
    </>
  )
}

function SearchBox() {
  const { hits, results } = useHits()
  const { query, clear, isSearchStalled, refine } = useSearchBox()

  const form = useForm<{ query: string }>()
  const { handleSubmit, resetField } = form

  const muiRegister = useFormMuiRegister(form)
  const submit = handleSubmit((values) => refine(values.query))
  useFormAutoSubmit({ form, submit, wait: 0 })

  const totalResults = query ? results?.nbHits ?? 0 : 0

  const endAdornment = !query ? (
    <IconButton size='small'>
      <IconSvg src={iconSearch} />
    </IconButton>
  ) : (
    <>
      {totalResults > 0 && (
        <Box sx={{ minWidth: 'max-content', color: 'text.disabled', paddingRight: '7px' }}>
          {totalResults === 1 && <>{totalResults} result</>}
          {totalResults > 1 && <>{totalResults} results</>}
        </Box>
      )}
      <IconButton onClick={() => resetField('query')} size='small'>
        <IconSvg src={iconClose} />
      </IconButton>
    </>
  )

  return (
    <Box component='form' onSubmit={submit} sx={{ mb: 2, overflow: 'hidden' }}>
      <TextField
        type='input'
        placeholder='Search...'
        {...muiRegister('query')}
        InputProps={{ endAdornment }}
        sx={{ width: '100%' }}
      />

      {isSearchStalled && <div>Searching...</div>}

      {query && (
        <List dense>
          {hits.map((hit) => (
            <Link key={hit.objectID} href={`/${hit.url}`} passHref>
              <ListItemButton
                dense
                component='a'
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': { color: (theme) => darken(theme.palette.primary.main, 0.01) },
                }}
              >
                <ListItemText primary={hit.name} secondary={<Snippet {...hit} />} />
              </ListItemButton>
            </Link>
          ))}

          <Divider variant='middle' sx={{ mt: 2 }} />
        </List>
      )}
    </Box>
  )
}

export default function SearchForm(props: TextFieldProps) {
  return (
    <InstantSearch {...instantSearchProps}>
      <SearchBox {...props} />
    </InstantSearch>
  )
}
