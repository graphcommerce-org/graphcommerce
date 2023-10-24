import { useFieldExtension } from '@hygraph/app-sdk-react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextField, Autocomplete } from '@mui/material'
import React from 'react'

type PropertyPickerProps = {
  options: any
}

export function PropertyPicker(props: PropertyPickerProps) {
  const { options } = props
  const { value, onChange } = useFieldExtension()
  const [localValue, setLocalValue] = React.useState<string | undefined | null>(value as string)

  React.useEffect(() => {
    onChange(localValue).catch((err) => console.log(err))
  }, [localValue, onChange])

  // RM limiting max-height from MUI Autocomplete Popper
  const styleElement = document.createElement('style')
  styleElement.innerHTML = `
    body ul {
      max-height: 65vh!important;
    }
  `

  document.head.appendChild(styleElement)

  if (options.length < 1) return <div>No properties available</div>

  return (
    <Autocomplete
      id='property-selector'
      options={options.map((o) => o.label)}
      value={localValue}
      onChange={(_e, v) => {
        const id = options.find((option) => option.label === v)?.id
        setLocalValue(id as string | undefined)
      }}
      renderInput={(params) => <TextField {...params} label='Property' />}
      sx={(theme) => ({
        mt: theme.spacings.xxs,
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
      })}
    />
  )
}
