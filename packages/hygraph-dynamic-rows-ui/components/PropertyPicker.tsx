import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import type { FieldExtensionProps } from '@hygraph/app-sdk-react'
import { useFieldExtension } from '@hygraph/app-sdk-react'
import { TextField } from '@mui/material'
import type { IntrospectionQuery } from 'graphql'
import { getIntrospectionQuery } from 'graphql'
import { useEffect, useMemo, useState } from 'react'
import { getFieldPaths } from '../lib/getFieldPaths'

function useClient(extension: FieldExtensionProps['extension']) {
  return useMemo(
    () =>
      new ApolloClient({
        uri:
          typeof extension.config.backend === 'string'
            ? extension.config.backend
            : 'https://graphcommerce.vercel.app/api/graphql', // fallback on the standard GraphCommerce Schema
        cache: new InMemoryCache(),
      }),
    [extension.config.backend],
  )
}

export function PropertyPicker() {
  const fieldExtension = useFieldExtension()

  const { value, onChange, extension } = fieldExtension
  const [localValue, setLocalValue] = useState<string | undefined | null>(
    typeof value === 'string' ? value : undefined,
  )

  const client = useClient(extension)
  const { data, loading, error } = useQuery<IntrospectionQuery>(gql(getIntrospectionQuery()), {
    client,
  })
  // eslint-disable-next-line no-underscore-dangle
  const schema = data?.__schema

  useEffect(() => {
    onChange(localValue).catch((err) => err)
  }, [localValue, onChange])

  const fieldPaths = useMemo(() => {
    if (!schema) return []
    return getFieldPaths(schema, ['ProductInterface'])
      .sort((a, b) => a.depth() - b.depth())
      .map((fp) => fp.stringify())
      .filter<string>((v) => v !== undefined)
  }, [schema])

  return (
    <TextField
      id='property-selector'
      select={!!fieldPaths.length}
      variant='outlined'
      size='small'
      SelectProps={{
        native: true,
      }}
      value={localValue}
      onChange={(v) => {
        const val = v.target.value
        setLocalValue(val)
      }}
      fullWidth
      sx={{
        mt: '4px',
        fontSize: '0.8em',
        '& .MuiInputBase-root': {
          borderRadius: { xs: '2px!important' },
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: { xs: 'rgb(208, 213, 231)' },
            transition: 'border-color 0.25s ease 0s',
          },
          '&:hover': {
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: { xs: 'rgb(208, 213, 231)' },
            },
          },
          '&.Mui-focused': {
            '& fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: { xs: 'rgb(90, 92, 236)' },
            },
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: { xs: 'rgb(90, 92, 236)' },
        },
      }}
    >
      {fieldPaths.length > 0 ? (
        <>
          <option value='url'>url</option>
          {fieldPaths.map((fp) => (
            <option key={fp} value={fp}>
              {fp}
            </option>
          ))}
        </>
      ) : (
        <>{loading ? 'Loading..' : error?.message}</>
      )}
    </TextField>
  )
}
