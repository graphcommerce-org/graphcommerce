import { TypedDocumentNode } from '@apollo/client'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { Scalars } from '@reachdigital/magento-graphql'
import {
  DefinitionNode,
  OperationDefinitionNode,
  ValueNode,
  NullValueNode,
  ObjectValueNode,
  ListValueNode,
  VariableNode,
  VariableDefinitionNode,
  TypeNode,
  ListTypeNode,
  NamedTypeNode,
  NonNullTypeNode,
} from 'graphql'
import { LiteralUnion } from 'type-fest'
import { Path } from './getter'

function isOperationDefinitionNode(
  node: DefinitionNode | OperationDefinitionNode,
): node is OperationDefinitionNode {
  return (node as OperationDefinitionNode).variableDefinitions !== undefined
}

type WithValueNode = Exclude<
  ValueNode,
  NullValueNode | ObjectValueNode | ListValueNode | VariableNode
>

function isWithValueNode(value: ValueNode | WithValueNode): value is WithValueNode {
  return (value as WithValueNode).value !== undefined
}

type OptionalKeys<T> = { [k in keyof T]-?: undefined extends T[k] ? never : k }[keyof T]

type IsRequired<V> = {
  [k in keyof V]-?: undefined extends V[k] ? false : true
}

type DeepStringify<V> = {
  [k in keyof V]?: V[k] extends (infer U)[]
    ? string[]
    : V[k] extends Record<string, unknown>
    ? DeepStringify<V[k]>
    : string
}

type FieldTypes = LiteralUnion<keyof Scalars, string> | FieldTypes[]

function variableType<T extends TypeNode>(type: T): FieldTypes {
  if (type.kind === 'ListType') {
    return [variableType((type as ListTypeNode).type)]
  }
  if (type.kind === 'NonNullType') {
    return variableType((type as NonNullTypeNode).type)
  }

  return (type as NamedTypeNode).name.value as keyof Scalars
}

export type FormPaths<D extends TypedDocumentNode> = Path<VariablesOf<D>>

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

function entries<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as Entries<T>
}

export default function handlerFactory<D extends TypedDocumentNode>(document: D) {
  type V = VariablesOf<D>
  type Defaults = Partial<Pick<V, OptionalKeys<V>>>
  type Encoding = { [k in keyof V]: FieldTypes }
  type Required = IsRequired<V>
  type Paths = FormPaths<D>
  let requiredPartial: Partial<Required> = {}
  let encodingPartial: Partial<Encoding> = {}
  let defaults: Defaults = {}

  document.definitions.forEach((definition) => {
    if (isOperationDefinitionNode(definition) && Array.isArray(definition.variableDefinitions)) {
      definition.variableDefinitions.forEach((variable: VariableDefinitionNode) => {
        const name = variable.variable.name.value as keyof V

        requiredPartial = { ...requiredPartial, [name]: variable.type.kind === 'NonNullType' }
        encodingPartial = { ...encodingPartial, [name]: variableType(variable.type) }

        if (variable.defaultValue && isWithValueNode(variable.defaultValue)) {
          defaults = {
            ...defaults,
            [name]: variable.defaultValue.value as Defaults[keyof Defaults],
          }
        }
      })
    }
  })

  const required = requiredPartial as Required
  const encoding = encodingPartial as Encoding

  function validate(variables: DeepStringify<V>) {
    let valid = true
    entries(required).forEach(([key]) => {
      if (!variables[key]) valid = false
    })
    return valid
  }

  const name = (string: Paths) => string

  function heuristicEncode(val: unknown) {
    if (Number(val).toString() === val) return Number(val)
    if (val === 'true') return true
    if (val === 'false') return false
    return val
  }

  function encodeItem(enc: FieldTypes, val: unknown) {
    if (Array.isArray(enc)) return [encodeItem(enc[0], val)]
    if (val && typeof val === 'object') {
      return Object.fromEntries(Object.entries(val).map(([key, v]) => [key, heuristicEncode(v)]))
    }
    if (enc === 'Boolean') return Boolean(val)
    if (enc === 'Float' || enc === 'Int') return Number(val)
    return val
  }

  function encode(variables: { [k in keyof V]: DeepStringify<V[k]> }, enc = encoding) {
    return Object.fromEntries(
      Object.entries(variables).map(([key, val]) => {
        return [key, encodeItem(enc[key], val)]
      }),
    )
  }

  function shape() {}

  return { required, encoding, defaults, validate, encode, name }
}
