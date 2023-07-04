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
  const [conditions, setConditions] = React.useState<Condition[]>([])
  const [property, setProperty] = React.useState<string>('')
  const [conditionValue, setConditionValue] = React.useState<string | number>('')
  const [propertyValue, setPropertyValue] = React.useState<string | number>()
  const [operator, setOperator] = React.useState<string>('')
  const dynamicRowName = React.useRef('')
  const { onChange, form } = useFieldExtension()

  /** DEVMODE */

  const [andBuffer, setAndBuffer] = React.useState<ConditionAnd>({
    type: 'ConditionAnd',
    conditions: [],
    id: uuid(),
  })

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

  const { data } = useQuery(getDynamicRowDocument, {
    variables: {
      internalName: dynamicRowName.current,
    },
    fetchPolicy: 'cache-and-network', // TODO: Check if this works with cache-first
  })

  React.useEffect(() => {
    console.log('data: ', data)
    if (data?.dynamicRow?.conditions !== null) {
      setConditions(data?.dynamicRow?.conditions as Condition[])
    } else {
      setConditions([])
    }
  }, [data])

  /** Prepare the available options for the property select field. */
  const selectOptions = products?.items?.[0] ? findProperties(products?.items?.[0]) : []

  const onAnd = () => {
    const conditionType = propertyValue ? conditionTypes[typeof propertyValue] : 'string'

    setAndBuffer({
      type: andBuffer.type,
      id: andBuffer.id,
      conditions: [
        ...andBuffer.conditions,
        {
          property,
          operator: typeof propertyValue === 'number' ? operator : undefined,
          value: conditionValue,
          type: conditionType,
        },
      ],
    })
  }

  React.useEffect(() => {
    console.log('andBuffer: ', andBuffer)
  }, [andBuffer])

  const onSubmit = () => {
    const conditionType = propertyValue ? conditionTypes[typeof propertyValue] : 'string'
    console.log(1241, conditionType, propertyValue, conditions)
    setConditions([
      ...conditions,
      andBuffer.conditions.length > 0
        ? andBuffer
        : {
            property,
            operator: typeof propertyValue === 'number' ? operator : undefined,
            value: conditionValue,
            type: conditionType, // TODO: Differ type for ConditionText, ConditionNumber, ConditionAnd, ConditionOr
          },
    ])

    setAndBuffer({ type: 'ConditionAnd', conditions: [], id: uuid() })
  }

  const onRemove = (event) => {
    console.log('value button: ', event.target.value)

    setConditions(
      conditions.filter((c) => {
        console.log('c', c)
        if (c.type !== 'ConditionAnd') {
          return c.property !== event.target.value
        }
        if (c.type === 'ConditionAnd' && isValidJSON(event.target.value as string)) {
          return c.id !== JSON.parse(event.target.value as string).id
        }
        return true
      }),
    )
  }

  React.useEffect(() => {
    if (products?.items?.[0]) {
      setPropertyValue(get(products?.items?.[0], property) as 'string' | 'number')
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
          value={conditionValue || ''}
          onChange={(e) => setConditionValue(e.target.value)}
          label='Value'
          variant='outlined'
        />
      </FormControl>

      <Button
        sx={(theme) => ({
          mr: theme.spacings.xs,
        })}
        onClick={onAnd}
        variant='outlined'
        size='medium'
      >
        AND
      </Button>

      <Button onClick={onSubmit} variant='outlined' size='medium'>
        Submit
      </Button>

      <Box
        sx={(theme) => ({
          mt: theme.spacings.xs,
        })}
      >
        <Typography
          sx={(theme) => ({
            mb: theme.spacings.sm,
          })}
          variant='h4'
        >
          Conditions
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          }}
        >
          {columns.map((column) => (
            <Typography
              variant='body1'
              sx={(theme) => ({ fontWeight: '600', pr: theme.spacings.xs })}
            >
              {column}
            </Typography>
          ))}

          {conditions?.map((condition, index) => {
            if (condition.type !== 'ConditionAnd') {
              return (
                <>
                  <ConditionRow
                    key={`${condition.property}-${condition.value}`}
                    condition={condition}
                    index={index}
                  />
                  <Button
                    sx={(theme) => ({
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      justifyContent: 'left',
                      borderRadius: 0,
                      py: theme.spacings.xxs,
                      '& svg': { opacity: 0.5 },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '& svg': { opacity: 1 },
                      },
                    })}
                    value={condition.property}
                    key={`${condition.property}-${condition.value}-remove`}
                    onClick={onRemove}
                    variant='text'
                    size='small'
                  >
                    <IconSvg
                      src={iconCancelAlt}
                      sx={(theme) => ({ pointerEvents: 'none', color: theme.palette.error.main })}
                    />
                  </Button>
                </>
              )
            }
            return (
              <>
                {condition?.conditions?.map((subCondition, subConditionIndex) => {
                  const showRemove = subConditionIndex === 0
                  return (
                    <>
                      <ConditionRow
                        key={`${subCondition.property}-${subCondition.value}-property`}
                        condition={subCondition}
                        onRemove={onRemove}
                        index={index}
                        showRemove={showRemove}
                        type='and'
                      />
                      <Button
                        sx={(theme) => ({
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          display: 'flex',
                          justifyContent: 'left',
                          borderRadius: 0,
                          py: theme.spacings.xxs,
                          '& svg': { opacity: 0.5 },
                          '&:hover': {
                            backgroundColor: 'transparent',
                            '& svg': { opacity: 1 },
                          },
                        })}
                        value={JSON.stringify(condition)}
                        onClick={showRemove ? onRemove : undefined}
                        variant='text'
                        size='small'
                      >
                        {showRemove && (
                          <IconSvg
                            src={iconCancelAlt}
                            sx={(theme) => ({
                              pointerEvents: 'none',
                              color: theme.palette.error.main,
                            })}
                          />
                        )}
                      </Button>
                    </>
                  )
                })}
              </>
            )
          })}
          {andBuffer.conditions.map((item, index) => {
            console.log(1)
            return (
              <>
                <ConditionRow
                  key={`${item.property}-${item.value}`}
                  condition={item}
                  index={index}
                  type='buffer'
                />
                <Box
                  sx={(theme) => ({
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    justifyContent: 'left',
                    px: '9px',
                    borderRadius: 0,
                    py: theme.spacings.xxs,
                    '& svg': { opacity: 0.5 },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '& svg': { opacity: 1 },
                    },
                  })}
                >
                  <IconSvg
                    src={iconRefresh}
                    sx={(theme) => ({
                      pointerEvents: 'none',
                      color: theme.palette.warning.main,
                    })}
                  />
                </Box>
              </>
            )
          })}
        </Box>
      </Box>
    </>
  )
}
