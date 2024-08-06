import { defaultBuildResponseCacheKey } from '@envelop/response-cache'
import type { TypedDocumentNode } from '@graphcommerce/graphql'
import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { InContextSdkMethod, InContextSdkMethodRegularParams } from '@graphql-mesh/types'
import {
  Kind,
  OperationTypeNode,
  OperationDefinitionNode,
  FieldNode,
  print,
  ValueNode,
  GraphQLResolveInfo,
} from 'graphql'
import type { Path } from 'react-hook-form'
import { meshCache, MeshCacheOptions } from './meshCache'
import { selectionSetByPath } from './selectionSetByPath'

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

function maybeExecutor(
  context: MeshContext,
  operationType: OperationType,
  operationName: string,
): InContextSdkMethod | undefined {
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

  if (!found) return undefined

  return (params) => {
    console.warn(
      '@todo executeMesh does not properly apply args',
      (params as InContextSdkMethodRegularParams<any, any, any>).args,
    )
    return found(params)
  }
}

async function executeMesh<Q, V extends Record<string, unknown>>(
  document: TypedDocumentNode<Q, V>,
  options: { variables: V },
  context: MeshContext,
  root: object,
  info: GraphQLResolveInfo,
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
              root,
              info,
              context,
              selectionSet: selectionSetByPath<Q>(def.selectionSet, field.name.value as Path<Q>),
              args: collectArguments<V>(field, options.variables),
            }),
          ] as const,
      )

    return Promise.all(executions)
  })

  const flattenedEntries = (await Promise.all(des)).flat(1).filter((v) => !!v)
  return Object.fromEntries(flattenedEntries) as Q
}

export function createDocumentExecutor(
  context: MeshContext,
  root: object,
  info: GraphQLResolveInfo,
) {
  const headers = (((context as any).headers ?? {}) as Record<string, unknown>) ?? {}

  return async <Q, V extends Record<string, unknown>>(
    document: TypedDocumentNode<Q, V>,
    options: { variables: V; headers: string[] } & Pick<MeshCacheOptions, 'ttl'>,
  ) => {
    const { ttl, ...rest } = options

    const cacheKey = await defaultBuildResponseCacheKey({
      documentString: print(document),
      variableValues: {
        // @todo make sure we automatically select the correct headers.
        ...options.variables,
        ...Object.fromEntries(options.headers.map((h) => [h, headers[h]])),
      },
      sessionId: headers?.authorization ? String(headers?.authorization) : null,
    })

    return meshCache(() => executeMesh<Q, V>(document, rest, context, root, info), {
      ttl,
      context,
      cacheKey,
    })
  }
}
