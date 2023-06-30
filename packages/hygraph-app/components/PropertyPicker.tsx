/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useQuery } from '@graphcommerce/graphql'
import { Button, GetStaticProps } from '@graphcommerce/next-ui'
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
import { getProductsQuery } from '../graphql/GetProducts.gql'
import { getDynamicRowDocument } from '../graphql/getDynamicRow.gql'

type ProductProperty = {
  label: string
  id: string
  type?: string
}

type PropertyPickerProps = NonNullable<getProductsQuery>

const operators: ProductProperty[] = [
  { label: 'equals', id: 'equals' },
  { label: 'GTE', id: 'GTE' },
  { label: 'LTE', id: 'LTE' },
]

const findProperties = (
  obj: Record<string, any>,
  path = '',
  inputs: ProductProperty[] = [],
  parent = '',
): ProductProperty[] => {
  for (const [key, value] of Object.entries(obj)) {
    /** Keep count of the current path and parent */
    const currentPath: string = path ? `${path}.${key}` : key
    const currentParent: string = parent ? `${parent}/` : ''

    /**
     * If the value is a string, number or boolean, add it to the inputs array. If the value is an
     * array, recurse on the first item. If the value is an object, recurse on all it's keys.
     */
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      inputs.push({
        label: `${key} ${currentParent ? `| ${currentParent}` : ''}`,
        id: currentPath,
      })
    } else if (Array.isArray(value) && value.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      findProperties(value[0], `${currentPath}[0]`, inputs, `${currentParent}${key}`)
    } else if (typeof value === 'object' && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      findProperties(value, currentPath, inputs, `${currentParent}${key}`)
    }
  }
  return inputs
}

export function PropertyPicker(props: PropertyPickerProps) {
  const { products } = props
  const [property, setProperty] = React.useState<string>('')
  const [value, setValue] = React.useState<string | number>('')
  const [operator, setOperator] = React.useState<string>('')
  const [propertyValue, setPropertyValue] = React.useState<any>()
  const [conditions, setConditions]: any = React.useState([])
  // TODO: State types

  const { data, loading } = useQuery(getDynamicRowDocument, {
    variables: {
      internalName: 'DRPP-test', // TODO: get this from the form
    },
    fetchPolicy: 'network-only', // TODO: Check if this works with cache-first
  })

  const selectOptions = products?.items?.[0] ? findProperties(products?.items?.[0]) : []

  const { onChange, form } = useFieldExtension()
  console.log('Get internal Name from here >>>', form.getState())

  const onSubmit = () => {
    setConditions([
      ...conditions,
      {
        property,
        operator: typeof propertyValue === 'number' ? operator : undefined,
        value,
        type: 'foo', // TODO: Differ type for ConditionText, ConditionNumber, ConditionAnd, ConditionOr
      },
    ])
  }

  const onRemove = (event) => {
    console.log(event)
    setConditions(conditions.filter((c) => c.property !== event.target.value))
  }

  React.useEffect(() => {
    if (products?.items?.[0]) {
      setPropertyValue(get(products?.items?.[0], property))
      console.log(property, propertyValue, typeof propertyValue)
    }
  }, [products?.items, property, propertyValue])

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onChange(conditions)
    console.log('conditions: ', conditions)

    // Adding the onChange function to the effect's dependencies will cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions])

  React.useEffect(() => {
    console.log('data: ', data)
    setConditions(data?.dynamicRow?.propertyPicker)
  }, [data])

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
          defaultValue={property || 'name'}
          value={property || 'name'}
          label='Property'
          onChange={(e) => setProperty(e.target.value)}
          sx={(theme) => ({
            width: '100%',
          })}
        >
          {selectOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {typeof propertyValue === 'number' && (
        <FormControl
          sx={(theme) => ({
            my: theme.spacings.xs,
            width: '100%',
          })}
        >
          <InputLabel id='operator-selector-label'>Operator</InputLabel>
          <Select
            name='operator'
            labelId='operator-selector-label'
            id='operator-selector'
            defaultValue={operator}
            value={operator}
            label='Operator'
            onChange={(e) => setOperator(e.target.value)}
            sx={{
              width: '100%',
            }}
          >
            {operators.map((op) => (
              <MenuItem key={op.id} value={op.id}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl
        sx={(theme) => ({
          my: theme.spacings.xs,
          width: '100%',
        })}
      >
        <TextField
          name='value'
          placeholder='value'
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          label='Value'
          variant='outlined'
        />
      </FormControl>

      <Button onClick={onSubmit} variant='outlined' size='medium'>
        Submit
      </Button>

      <Box
        sx={(theme) => ({
          mt: theme.spacings.xs,
        })}
      >
        <Typography variant='h4'>Conditions: </Typography>
        <Box sx={(theme) => ({ display: 'flex' })}>
          <Box>
            <Typography
              variant='body1'
              sx={(theme) => ({ fontWeight: '600', pr: theme.spacings.xs })}
            >
              Property
            </Typography>
            {conditions &&
              conditions.map((condition: any) => (
                <Typography sx={(theme) => ({ pr: theme.spacings.xs })}>
                  {condition.property}
                </Typography>
              ))}
          </Box>
          <Box>
            <Typography
              variant='body1'
              sx={(theme) => ({ fontWeight: '600', pr: theme.spacings.xs })}
            >
              Operator
            </Typography>
            {conditions &&
              conditions.map((condition: any) => (
                <Typography sx={(theme) => ({ pr: theme.spacings.xs })}>
                  {condition.operator ?? 'N/A'}
                </Typography>
              ))}
          </Box>
          <Box>
            <Typography
              variant='body1'
              sx={(theme) => ({ fontWeight: '600', pr: theme.spacings.xs })}
            >
              Value
            </Typography>
            {conditions &&
              conditions.map((condition: any) => (
                <Typography sx={(theme) => ({ pr: theme.spacings.xs })}>
                  {condition.value}
                </Typography>
              ))}
          </Box>
          <Box>
            <Typography
              variant='body1'
              sx={(theme) => ({ fontWeight: '600', pr: theme.spacings.xs })}
            >
              Remove
            </Typography>
            {conditions &&
              conditions.map((condition) => (
                <Button
                  sx={{ display: 'block' }}
                  value={condition.property}
                  onClick={onRemove}
                  variant='text'
                  size='small'
                >
                  X
                </Button>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}
