import { loadConfig } from '@graphcommerce/next-config'
import {
  BatchMigrationCreateModelInput,
  BatchMigrationCreateComponentInput,
  BatchMigrationCreateEnumerationInput,
  BatchMigrationCreateSimpleFieldInput,
  BatchMigrationCreateEnumerableFieldInput,
  BatchMigrationCreateRelationalFieldInput,
  BatchMigrationCreateUnionFieldInput,
  BatchMigrationCreateComponentFieldInput,
  BatchMigrationDeleteComponentInput,
  BatchMigrationDeleteEnumerationInput,
  BatchMigrationDeleteModelInput,
  BatchMigrationUpdateComponentFieldInput,
  BatchMigrationUpdateComponentInput,
  BatchMigrationUpdateEnumerableFieldInput,
  BatchMigrationUpdateEnumerationInput,
  BatchMigrationUpdateModelInput,
  BatchMigrationUpdateRelationalFieldInput,
  BatchMigrationUpdateSimpleFieldInput,
  BatchMigrationUpdateUnionFieldInput,
  BatchMigrationDeleteFieldInput,
  BatchMigrationCreateComponentUnionFieldInput,
  BatchMigrationUpdateComponentUnionFieldInput,
} from '@hygraph/management-sdk'
import dotenv from 'dotenv'
import { initClient } from './client'
import { Schema } from './types'

dotenv.config()
const config = loadConfig(process.cwd())

export const client = initClient(config, undefined)

export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const graphcommerceLog = (message: string, type?: 'info' | 'warning' | 'error') => {
  const color = {
    error: '\x1b[31m\x1b[1m%s\x1b[0m',
    warning: '\x1b[33m\x1b[1m%s\x1b[0m',
    info: '\x1b[36m\x1b[1m%s\x1b[0m',
  }
  // eslint-disable-next-line no-console
  console.log(type ? color[type] : '', `[GraphCommerce]: ${message}`)
}

type AllActions =
  | BatchMigrationCreateModelInput
  | BatchMigrationUpdateModelInput
  | BatchMigrationDeleteModelInput
  | BatchMigrationCreateComponentInput
  | BatchMigrationUpdateComponentInput
  | BatchMigrationDeleteComponentInput
  | BatchMigrationCreateEnumerationInput
  | BatchMigrationUpdateEnumerationInput
  | BatchMigrationDeleteEnumerationInput
  | BatchMigrationCreateSimpleFieldInput // type: SimpleFieldType
  | BatchMigrationUpdateSimpleFieldInput
  | BatchMigrationCreateEnumerableFieldInput
  | BatchMigrationUpdateEnumerableFieldInput
  | BatchMigrationCreateRelationalFieldInput // type: RelationalFieldType
  | BatchMigrationUpdateRelationalFieldInput
  | BatchMigrationCreateUnionFieldInput
  | BatchMigrationUpdateUnionFieldInput
  | BatchMigrationCreateComponentFieldInput
  | BatchMigrationUpdateComponentFieldInput
  | BatchMigrationDeleteFieldInput
  | BatchMigrationCreateComponentUnionFieldInput
  | BatchMigrationUpdateComponentUnionFieldInput

/**
 * This constant is used to assign the right action of the management SDK to the migratioAction
 * function
 */
const actionMap = {
  create: {
    model: (innerprops: BatchMigrationCreateModelInput) => client.createModel(innerprops),
    component: (innerprops: BatchMigrationCreateComponentInput) =>
      client.createComponent(innerprops),
    enumeration: (innerprops: BatchMigrationCreateEnumerationInput) =>
      client.createEnumeration(innerprops),
    simpleField: (innerprops: BatchMigrationCreateSimpleFieldInput) =>
      client.createSimpleField(innerprops),
    enumerableField: (innerprops: BatchMigrationCreateEnumerableFieldInput) =>
      client.createEnumerableField(innerprops),
    componentField: (innerprops: BatchMigrationCreateComponentFieldInput) =>
      client.createComponentField(innerprops),
    relationalField: (innerprops: BatchMigrationCreateRelationalFieldInput) =>
      client.createRelationalField(innerprops),
    unionField: (innerprops: BatchMigrationCreateUnionFieldInput) =>
      client.createUnionField(innerprops),
    componentUnionField: (innerprops: BatchMigrationCreateComponentUnionFieldInput) =>
      client.createComponentUnionField(innerprops),
  },
  update: {
    model: (innerprops: BatchMigrationUpdateModelInput) => client.updateModel(innerprops),
    component: (innerprops: BatchMigrationUpdateComponentInput) =>
      client.updateComponent(innerprops),
    enumeration: (innerprops: BatchMigrationUpdateEnumerationInput) =>
      client.updateEnumeration(innerprops),
    simpleField: (innerprops: BatchMigrationUpdateSimpleFieldInput) =>
      client.updateSimpleField(innerprops),
    enumerableField: (innerprops: BatchMigrationUpdateEnumerableFieldInput) =>
      client.updateEnumerableField(innerprops),
    componentField: (innerprops: BatchMigrationUpdateComponentFieldInput) =>
      client.updateComponentField(innerprops),
    relationalField: (innerprops: BatchMigrationUpdateRelationalFieldInput) =>
      client.updateRelationalField(innerprops),
    unionField: (innerprops: BatchMigrationUpdateUnionFieldInput) =>
      client.updateUnionField(innerprops),
    componentUnionField: (innerprops: BatchMigrationUpdateComponentUnionFieldInput) =>
      client.updateComponentUnionField(innerprops),
  },
  delete: {
    model: (innerprops: BatchMigrationDeleteModelInput) => client.deleteModel(innerprops),
    component: (innerprops: BatchMigrationDeleteComponentInput) =>
      client.deleteComponent(innerprops),
    enumeration: (innerprops: BatchMigrationDeleteEnumerationInput) =>
      client.deleteEnumeration(innerprops),
    simpleField: (innerprops: BatchMigrationDeleteFieldInput) => client.deleteField(innerprops),
    enumerableField: (innerprops: BatchMigrationDeleteFieldInput) => client.deleteField(innerprops),
    componentField: (innerprops: BatchMigrationDeleteFieldInput) => client.deleteField(innerprops),
    relationalField: (innerprops: BatchMigrationDeleteFieldInput) => client.deleteField(innerprops),
    unionField: (innerprops: BatchMigrationDeleteFieldInput) => client.deleteField(innerprops),
    componentUnionField: (innerprops: BatchMigrationDeleteFieldInput) =>
      client.deleteField(innerprops),
  },
}

/**
 * This function is our variation on the client.migrationAction functions from the hygraph
 * management sdk.
 *
 * MigrationAction() is better suited because it is a single function for all actions. More
 * importantly, if the action fails, because a field with the apiID already exists for instance. it
 * will skip this action but still continue the whole migration, while the management sdk function
 * will bail.
 *
 * It takes the schema as argument, which is always the same.
 *
 * Then it takes the type of schema entity you want to do an action upon, and the action you want to
 * do.
 *
 * The fourth arguments are the props that belong to the action you want to do. For instance, if you
 * want to create a model, you need to pass the props that belong to a model.
 *
 * The last two arguments are optional. If you want to create a field, you need to pass the apiId of
 * the model or component you want to create the field on. If you want to create a field on a
 * component, you also need to pass the parentType, which is either 'model' or 'component'.
 */
export const migrationAction = (
  schema: Schema,
  type:
    | 'model'
    | 'component'
    | 'enumeration'
    | 'simpleField'
    | 'componentField'
    | 'enumerableField'
    | 'relationalField'
    | 'unionField'
    | 'componentUnionField',
  action: 'create' | 'update' | 'delete',
  props: AllActions,
  parentApiId?: string,
  parentType?: 'model' | 'component' | 'enumeration',
) => {
  // Check if the entity already exists
  const alreadyExists = () => {
    switch (type) {
      case 'model':
        return schema.models.some((model) => model.apiId === props.apiId)

      case 'component':
        return schema.components.some((component) => component.apiId === props.apiId)

      case 'enumeration':
        return schema.enumerations.some((enumeration) => enumeration.apiId === props.apiId)

      case 'simpleField':
      case 'enumerableField':
      case 'relationalField':
      case 'unionField':
      case 'componentUnionField': {
        let parent
        switch (parentType) {
          case 'model': {
            parent = schema.models.find((model) => model.apiId === parentApiId)
            break
          }
          case 'component': {
            parent = schema.components.find((component) => component.apiId === parentApiId)
            break
          }
          default:
            return false // or undefined or any other value you want if no match
        }
        return parent?.fields.some((field) => field.apiId === props.apiId)
      }
      default: {
        return false // or undefined or any other value you want if no match
      }
    }
  }

  const actionFunc = actionMap[action] && actionMap[action][type]

  if (!alreadyExists()) {
    if (actionFunc) {
      graphcommerceLog(`${capitalize(action)} ${type} with apiId ${props.apiId}...`)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore | This error is a loss on typescript autocomplete, but the function is called correctly
      actionFunc(props)
    } else {
      graphcommerceLog(`Action ${action} is not supported for ${type}`, 'error')
    }
  } else {
    graphcommerceLog(`${capitalize(type)} with apiId ${props.apiId} already exists`, 'warning')
  }
}
