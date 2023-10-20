import { useFieldExtension } from '@hygraph/app-sdk-react'
import { TextField, Autocomplete } from '@mui/material'
import get from 'lodash/get'
import React from 'react'
import { getProductsQuery } from '../graphql/GetProducts.gql'
import { findProperties } from '../lib/functions'
import { ProductProperty } from '../types'

// If this component becomes generic, this will be any or unknown
type PropertyPickerProps = NonNullable<getProductsQuery>

const operators: ProductProperty[] = [
  { label: 'equals', id: 'equals' },
  { label: 'GTE', id: 'GTE' },
  { label: 'LTE', id: 'LTE' },
]

const conditionTypes = {
  string: 'ConditionText',
  number: 'ConditionNumber',
}

const columns = ['Property', 'Operator', 'Value', 'Remove']

export function PropertyPicker(props: PropertyPickerProps) {
  const { products } = props
  /**
   * ? STATES DOCUMENTATION
   *
   * 1. Const conditions are the local conditions which are displayed in the browser. They are synced
   *    with Hygraph once the user saves the hygraph page.
   * 2. Property is the actual path of the object which is used in the hygraph dynamic row module
   * 3. ConditionValue is the value that the user inputs in the text field he wants the object to match
   *    to. propertyValue is the actual value of the object property
   */
  const [property, setProperty] = React.useState<string>('')

  const [propertyValue, setPropertyValue] = React.useState<string | number>()
  const dynamicRowName = React.useRef('')

  const { form, value, onChange } = useFieldExtension()
  const [localValue, setLocalValue] = React.useState<string>(value || '')

  React.useEffect(() => {
    onChange(localValue)
  }, [localValue, onChange])

  /**
   * Here we get the internalName of the current dynamic row and request the current conditions on
   * this row. Then setConditions using an effect so we can see them in the component
   */
  form
    .getState()
    .then((formState) => {
      dynamicRowName.current = formState.values?.internalName
    })
    .catch((err) => console.log(err))

  /** Prepare the available options for the property select field. */
  const selectOptions = products?.items?.[0]
    ? findProperties(products?.items?.[0]).map((i) => i.label)
    : []

  React.useEffect(() => {
    if (products?.items?.[0]) {
      setPropertyValue(get(products?.items?.[0], property) as 'string' | 'number')
      console.log(property, propertyValue, typeof propertyValue)
    }
  }, [products?.items, property, propertyValue])

  // RM limiting max-height from MUI Autocomplete Popper
  let styleElement = document.createElement('style')
  styleElement.innerHTML = `
    body ul {
      max-height: 65vh!important;
    }
  `
  document.head.appendChild(styleElement)

  return (
    <Autocomplete
      id='property-selector'
      options={selectOptions}
      color='primary'
      value={localValue}
      onChange={(_e, v) => {
        console.log(30, v)
        setLocalValue(v || '')
      }}
      renderInput={(params) => {
        const body = document.querySelector('body')

        if (body) {
          body.style.height = '200px'
          body.style.overflow = 'hidden'
        }

        return <TextField {...params} label='Property' />
      }}
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
