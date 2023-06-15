import {
  Client,
  BatchMigrationCreateModelInput,
  BatchMigrationCreateComponentInput,
  BatchMigrationCreateEnumerationInput,
} from '@hygraph/management-sdk'
import { Schema } from './types'

function isTypeOfProps<T>(props: any, property: keyof T): props is T {
  return props && property in props
}

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const graphcommerceLog = (message: string, type?: 'info' | 'warning' | 'error') => {
  const color = {
    error: '\x1b[31m\x1b[1m%s\x1b[0m',
    warning: '\x1b[33m\x1b[1m%s\x1b[0m',
    info: '\x1b[36m\x1b[1m%s\x1b[0m',
  }
  console.log(type ? color[type] : '', `[GraphCommerce]: ${message}`)
}

export const validateFunction = (
  client: Client,
  schema: Schema,
  type: 'model' | 'component' | 'enumeration',
  props:
    | BatchMigrationCreateModelInput
    | BatchMigrationCreateComponentInput
    | BatchMigrationCreateEnumerationInput,
) => {
  const typeToCheck = {
    model: schema.models,
    component: schema.components,
    enumeration: schema.enumerations,
  }

  if (Array.isArray(typeToCheck[type])) {
    if (typeToCheck[type].some((model) => model.apiId === props.apiId)) {
      graphcommerceLog(`${capitalize(type)} with apiId ${props.apiId} already exists`, 'warning')
    } else if (isTypeOfProps<BatchMigrationCreateModelInput>(props, 'apiIdPlural')) {
      graphcommerceLog(`Creating ${type} with apiId ${props.apiId}...`)
      client.createModel(props)
    } else if (isTypeOfProps<BatchMigrationCreateComponentInput>(props, 'apiIdPlural')) {
      graphcommerceLog(`Creating ${type} with apiId ${props.apiId}...`)
      client.createComponent(props)
    } else if (isTypeOfProps<BatchMigrationCreateEnumerationInput>(props, 'apiId')) {
      graphcommerceLog(`Creating ${type} with apiId ${props.apiId}...`)
      client.createEnumeration(props)
    } else {
      graphcommerceLog('Migration script error: Invalid props', 'error')
    }
  } else {
    graphcommerceLog('Migration script error: Invalid type', 'error')
  }
}
