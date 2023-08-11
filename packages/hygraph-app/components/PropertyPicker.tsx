/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useQuery } from '@graphcommerce/graphql'
import { Button, IconSvg, iconCancelAlt, iconRefresh } from '@graphcommerce/next-ui'
import { useFieldExtension } from '@hygraph/app-sdk-react'
import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Box,
  Typography,
} from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import get from 'lodash/get'
import React from 'react'
import { uuid } from 'uuidv4'
import { getProductsQuery } from '../graphql/GetProducts.gql'
import { getDynamicRowDocument } from '../graphql/getDynamicRow.gql'
import { isValidJSON, findProperties } from '../lib/functions'
import { ProductProperty, Condition, ConditionAnd } from '../types'
import { ConditionRow } from './ConditionRow'

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
  const { form } = useFieldExtension()

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
  const selectOptions = products?.items?.[0] ? findProperties(products?.items?.[0]) : []

  React.useEffect(() => {
    if (products?.items?.[0]) {
      setPropertyValue(get(products?.items?.[0], property) as 'string' | 'number')
      console.log(property, propertyValue, typeof propertyValue)
    }
  }, [products?.items, property, propertyValue])
  return (
    <>
      <FormControl
        sx={(theme) => ({
          my: theme.spacings.xs,
          width: '100%',
        })}
      >
        <InputLabel variant='outlined' id='property-selector-label'>
          Property
        </InputLabel>
        <Select
          name='property'
          variant='outlined'
          labelId='property-selector-label'
          id='property-selector'
          value={property}
          label='Property'
          onChange={(e) => setProperty(e.target.value)}
          sx={{ width: '100%' }}
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
