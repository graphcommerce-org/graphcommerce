import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useFieldExtension } from '@hygraph/app-sdk-react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { createOptionsFromInterfaceObject, objectifyGraphQLInterface } from '../lib'
import { fetchGraphQLInterface } from '../lib/fetchGraphQLInterface'
import { __Field } from '../types'

export function PropertyPicker() {
  const { value, onChange, field, extension } = useFieldExtension()
  const [localValue, setLocalValue] = useState<string | undefined | null>(
    typeof value === 'string' ? value : undefined,
  )
  const [fields, setFields] = useState<__Field[] | null>(null)

  useEffect(() => {
    onChange(localValue).catch((err) => err)
  }, [localValue, onChange])

  const graphQLInterfaceQuery = useMemo(() => {
    const client = new ApolloClient({
      uri:
        typeof extension.config.backend === 'string'
          ? extension.config.backend
          : 'https://graphcommerce.vercel.app/api/graphql', // fallback on the standard GraphCommerce Schema
      cache: new InMemoryCache(),
    })
    return fetchGraphQLInterface(client)
  }, [extension.config.backend])

  // Prepare options
  const numberOptions = useMemo(
    () =>
      createOptionsFromInterfaceObject(
        objectifyGraphQLInterface(fields, 'number', ['ProductInterface']),
      ),
    [fields],
  )
  const textOptions = useMemo(
    () =>
      createOptionsFromInterfaceObject(
        objectifyGraphQLInterface(fields, 'text', ['ProductInterface']),
      ),
    [fields],
  )
  const allOptions = useMemo(
    () => ({
      text: [...textOptions, { label: 'url', id: 'url' }].sort((a, b) => {
        if (!a.label.includes('.') && !b.label.includes('.')) {
          return a.label.localeCompare(b.label)
        }
        if (a.label.includes('.')) {
          return 1
        }
        return -1
      }),
      number: [...numberOptions, { label: 'url', id: 'url' }],
    }),
    [numberOptions, textOptions],
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - outdated types from @hygraph/app-sdk-react
  const fieldType = field.parent.apiId ?? 'ConditionText'
  const options = fieldType === 'ConditionNumber' ? allOptions.number : allOptions.text

  if (!fields) {
    Promise.resolve(graphQLInterfaceQuery)
      .then((res) => {
        const newFields: __Field[] = res?.data.__type?.fields

        setFields(newFields)
      })
      .catch((err) => err)

    return <div>Loading fields...</div>
  }
  if (options.length < 1) return <div>No properties available</div>
  if (options.length > 10000) return <div>Too many properties to display</div>

  return (
    <TextField
      id='property-selector'
      select
      SelectProps={{
        native: true,
        variant: 'outlined',
      }}
      value={localValue}
      onChange={(v) => {
        const val = v.target.value
        setLocalValue(val)
      }}
      fullWidth
      sx={{
        mt: '4px',
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
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </TextField>
  )
}
