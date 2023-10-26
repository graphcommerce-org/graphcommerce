import { useFieldExtension } from '@hygraph/app-sdk-react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextField } from '@mui/material'
import React from 'react'
import { Options } from '../types'

type PropertyPickerProps = {
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
      {selectOptions.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label}
        </option>
      ))}
    </TextField>
  )
}
