import {
  Client,
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
import { Schema } from './types'

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

export const migrationAction = (
  client: Client,
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
  const alreadyExists = () => {
    if (type === 'model') {
      return schema.models.some((model) => model.apiId === props.apiId)
    }
    if (type === 'component') {
      return schema.components.some((component) => component.apiId === props.apiId)
    }
    if (type === 'enumeration') {
      return schema.enumerations.some((enumeration) => enumeration.apiId === props.apiId)
    }
    if (type === 'simpleField') {
      if (parentType === 'model') {
        const modelparent = schema.models.find((model) => model.apiId === parentApiId)
        return modelparent?.fields.some((field) => field.apiId === props.apiId)
      }
      if (parentType === 'component') {
        const componentparent = schema.components.find(
          (component) => component.apiId === parentApiId,
        )
        return componentparent?.fields.some((field) => field.apiId === props.apiId)
      }
    }
    if (type === 'componentField') {
      if (parentType === 'component') {
        const componentparent = schema.components.find(
          (component) => component.apiId === parentApiId,
        )
        return componentparent?.fields.some((field) => field.apiId === props.apiId)
      }
    }
    if (type === 'enumerableField') {
      if (parentType === 'model') {
        const modelparent = schema.models.find((model) => model.apiId === parentApiId)
        return modelparent?.fields.some((field) => field.apiId === props.apiId)
      }
      if (parentType === 'component') {
        const componentparent = schema.components.find(
          (component) => component.apiId === parentApiId,
        )
        return componentparent?.fields.some((field) => field.apiId === props.apiId)
      }
    }
    if (type === 'relationalField') {
      if (parentType === 'model') {
        const modelparent = schema.models.find((model) => model.apiId === parentApiId)
        return modelparent?.fields.some((field) => field.apiId === props.apiId)
      }
      if (parentType === 'component') {
        const componentparent = schema.components.find(
          (component) => component.apiId === parentApiId,
        )
        return componentparent?.fields.some((field) => field.apiId === props.apiId)
      }
    }
    if (type === 'unionField') {
      if (parentType === 'model') {
        const modelparent = schema.models.find((model) => model.apiId === parentApiId)
        return modelparent?.fields.some((field) => field.apiId === props.apiId)
      }
      if (parentType === 'component') {
        const componentparent = schema.components.find(
          (component) => component.apiId === parentApiId,
        )
        return componentparent?.fields.some((field) => field.apiId === props.apiId)
      }
    }

    if (type === 'componentUnionField') {
      if (parentType === 'model') {
        const modelparent = schema.models.find((model) => model.apiId === parentApiId)
        return modelparent?.fields.some((field) => field.apiId === props.apiId)
      }
      if (parentType === 'component') {
        const componentparent = schema.components.find(
          (component) => component.apiId === parentApiId,
        )
        return componentparent?.fields.some((field) => field.apiId === props.apiId)
      }
    }

    return true
  }

  const validPropMap = {
    model: {
      create: 'BatchMigrationCreateModelInput',
      update: 'BatchMigrationUpdateModelInput',
      delete: 'BatchMigrationDeleteModelInput',
    },
    component: {
      create: 'BatchMigrationCreateComponentInput',
      update: 'BatchMigrationUpdateComponentInput',
      delete: 'BatchMigrationDeleteComponentInput',
    },
    enumeration: {
      create: 'BatchMigrationCreateEnumerationInput',
      update: 'BatchMigrationUpdateEnumerationInput',
      delete: 'BatchMigrationDeleteEnumerationInput',
    },
    simpleField: {
      create: 'BatchMigrationCreateSimpleFieldInput',
      update: 'BatchMigrationUpdateSimpleFieldInput',
      delete: 'BatchMigrationDeleteFieldInput',
    },
    componentField: {
      create: 'BatchMigrationCreateComponentFieldInput',
      update: 'BatchMigrationUpdateComponentFieldInput',
      delete: 'BatchMigrationDeleteFieldInput',
    },
    enumerableField: {
      create: 'BatchMigrationCreateEnumerableFieldInput',
      update: 'BatchMigrationUpdateEnumerableFieldInput',
      delete: 'BatchMigrationDeleteFieldInput',
    },
    relationalField: {
      create: 'BatchMigrationCreateRelationalFieldInput',
      update: 'BatchMigrationUpdateRelationalFieldInput',
      delete: 'BatchMigrationDeleteFieldInput',
    },
    unionField: {
      create: 'BatchMigrationCreateUnionFieldInput',
      update: 'BatchMigrationUpdateUnionFieldInput',
      delete: 'BatchMigrationDeleteFieldInput',
    },
    componentUnionField: {
      create: 'BatchMigrationCreateComponentUnionFieldInput',
      update: 'BatchMigrationUpdateComponentUnionFieldInput',
      delete: 'BatchMigrationDeleteFieldInput',
    },
  }

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
      enumerableField: (innerprops: BatchMigrationDeleteFieldInput) =>
        client.deleteField(innerprops),
      componentField: (innerprops: BatchMigrationDeleteFieldInput) =>
        client.deleteField(innerprops),
      relationalField: (innerprops: BatchMigrationDeleteFieldInput) =>
        client.deleteField(innerprops),
      unionField: (innerprops: BatchMigrationDeleteFieldInput) => client.deleteField(innerprops),
      componentUnionField: (innerprops: BatchMigrationDeleteFieldInput) =>
        client.deleteField(innerprops),
    },
  }

  const validProp = validPropMap[type] && validPropMap[type][action]
  const actionFunc = actionMap[action] && actionMap[action][type]

  if (!alreadyExists()) {
    if (validProp && actionFunc) {
      graphcommerceLog(`${capitalize(action)} ${type} with apiId ${props.apiId}...`)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore | This error is a loss on typescript autocomplete, but the function is called correctly
      actionFunc(props)
    }
  } else {
    graphcommerceLog(`${capitalize(type)} with apiId ${props.apiId} already exists`, 'warning')
  }
}
