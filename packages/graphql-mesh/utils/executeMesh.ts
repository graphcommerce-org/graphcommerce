import { defaultBuildResponseCacheKey } from '@envelop/response-cache'
import type { TypedDocumentNode } from '@graphcommerce/graphql'
import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { InContextSdkMethod } from '@graphql-mesh/types'
import {
  Kind,
  SelectionSetNode,
  OperationTypeNode,
  OperationDefinitionNode,
  FieldNode,
  print,
  ValueNode,
} from 'graphql'
import type { Path } from 'react-hook-form'
import { meshCache, MeshCacheOptions } from './meshCache'

function isNumeric(n: string) {
  return !Number.isNaN(parseFloat(n))
}

function traverseSelectionSet<Q>(incomingSelectionSet: SelectionSetNode, path: Path<Q>) {
  const pathArray = path.split(/[,[\].]+?/)
  let selectionSet = incomingSelectionSet
  let pathIndex = 0

  while (pathIndex < pathArray.length) {
    const currentValue = pathArray[pathIndex]
    if (!isNumeric(currentValue)) {
      for (const selection of selectionSet.selections) {
        if (selection.kind === Kind.FIELD && selection.name.value === currentValue) {
          selectionSet = {
            kind: Kind.SELECTION_SET,
            selections: selection.selectionSet?.selections ?? [],
          }
          break
        }
      }
    }

    pathIndex++
  }

  return selectionSet
}

type OperationType = 'Query' | 'Mutation' | 'Subscription'
function getOperationType(def: OperationDefinitionNode) {
  let operationType: OperationType | undefined
  switch (def.operation) {
    case OperationTypeNode.QUERY:
      operationType = 'Query'
      break
    case OperationTypeNode.MUTATION:
      operationType = 'Mutation'
      break
    case OperationTypeNode.SUBSCRIPTION:
      operationType = 'Subscription'
      break
  }
  return operationType
}

function traverseValueNode<V extends Record<string, unknown>>(
  value: ValueNode,
  variables: V,
): unknown {
  switch (value.kind) {
    case Kind.NULL:
      return null
    case Kind.VARIABLE:
      return variables[value.name.value]
    case Kind.LIST:
      return value.values.map((v) => traverseValueNode(v, variables))
    case Kind.OBJECT:
      return value.fields.map((f) => ({
        [f.name.value]: traverseValueNode(f.value, variables),
      }))
    default:
      return value.value
  }
}

function collectArguments<V extends Record<string, unknown>>(field: FieldNode, variables: V) {
  if (!field?.arguments || field?.arguments.length === 0) return {}
  const args: Record<string, unknown> = {}
  field.arguments?.forEach((argument) => {
    args[argument.name.value] = traverseValueNode<V>(argument.value, variables)
  }, field.arguments)
  return args
}

function maybeExecutor(context: MeshContext, operationType: OperationType, operationName: string) {
  const possibleLocations = Object.keys(context)

  let found: InContextSdkMethod | undefined
  for (const location of possibleLocations) {
    const ctx = context as unknown as Record<
      string,
      Record<string, Record<string, InContextSdkMethod>>
    >
    if (ctx[location]?.[operationType]?.[operationName]) {
      found = ctx[location][operationType][operationName]
    }
  }

  return found
}

export async function executeMesh<Q, V extends Record<string, unknown>>(
  document: TypedDocumentNode<Q, V>,
  options: { variables: V },
  context: MeshContext,
): Promise<Q> {
  const des = document.definitions.map(async (def) => {
    if (def.kind !== Kind.OPERATION_DEFINITION) return null

    const executions = def.selectionSet.selections
      .filter((s) => s.kind === Kind.FIELD)
      .map(
        async (field) =>
          [
            field.name.value,
            await maybeExecutor(
              context,
              getOperationType(def),
              field.name.value,
            )?.({
              context,
              selectionSet: traverseSelectionSet<Q>(def.selectionSet, field.name.value as Path<Q>),
              args: collectArguments<V>(field, options.variables),
            }),
          ] as const,
      )

    return Promise.all(executions)
  })

  const flattenedEntries = (await Promise.all(des)).flat(1).filter((v) => !!v)
  return Object.fromEntries(flattenedEntries) as Q
}

export function createExecutor(context: MeshContext) {
  const headers = (((context as any).headers ?? {}) as Record<string, unknown>) ?? {}

  return async <Q, V extends Record<string, unknown>>(
    document: TypedDocumentNode<Q, V>,
    options: { variables: V } & Pick<MeshCacheOptions, 'ttl'>,
  ) => {
    const { ttl, ...rest } = options

    const cacheKey = await defaultBuildResponseCacheKey({
      documentString: print(document),
      variableValues: {
        // @todo make sure we automatically select the correct headers.
        ...options.variables,
        'gcms-locales': headers['gcms-locales'],
        'gcms-stage': headers['gcms-stage'],
        'X-Magento-Cache-Id': headers['x-magento-cache-id'],
        Store: headers.store,
      },
      sessionId: null,
    })

    return meshCache(() => executeMesh<Q, V>(document, rest, context), { ttl, context, cacheKey })
  }
}
