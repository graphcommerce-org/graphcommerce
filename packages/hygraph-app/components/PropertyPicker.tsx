import { useFieldExtension } from '@hygraph/app-sdk-react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextField, Autocomplete } from '@mui/material'
import React from 'react'
import { Options } from '../types'

type PropertyPickerProps = {
  condition: 'text' | 'number'
  options: Options
}

export function PropertyPicker(props: PropertyPickerProps) {
  const { options } = props
  const { value, onChange, field } = useFieldExtension()
  const [localValue, setLocalValue] = React.useState<string | undefined | null>(value as string)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - outdated types from @hygraph/app-sdk-react
  const fieldType = field.parent.apiId ?? 'ConditionText'
  const isConditionNumber = fieldType === 'ConditionNumber'
  const selectOptions = isConditionNumber ? options.number : options.text

  React.useEffect(() => {
    onChange(localValue).catch((err) => console.log(err))
  }, [localValue, onChange])

  if (selectOptions.length < 1) return <div>No properties available</div>
  if (selectOptions.length > 10000) return <div>Too many properties to display</div>

  // RM limiting max-height from MUI Autocomplete Popper
  const removeMaxHeight = document.createElement('style')
  removeMaxHeight.innerHTML = `
    body ul {
      max-height: 65vh!important;
    }
  `

  document.head.appendChild(removeMaxHeight)

  const label: string =
    selectOptions.find((option) => option.id === value)?.label || 'Select a property'

  return (
    <Autocomplete
      id='property-selector'
      options={selectOptions.map((o) => o.label)}
      value={localValue}
      onChange={(_e, v) => {
        const id = selectOptions.find((option) => option.label === v)?.id
        setLocalValue(id)
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
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
