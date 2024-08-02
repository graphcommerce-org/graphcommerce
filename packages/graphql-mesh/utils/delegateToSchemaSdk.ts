/* eslint-disable import/no-extraneous-dependencies */
import { InContextSdkMethod } from '@graphql-mesh/types'
import { delegateToSchema } from '@graphql-tools/delegate'
// import { batchDelegateToSchema } from '@graphql-tools/batch-delegate'
import { GraphQLResolveInfo, OperationTypeNode, responsePathAsArray, print } from 'graphql'
import { MeshContext } from '../.mesh'
import { renameFromAliasToRegular, selectionSetByPath } from './selectionSetByPath'

export function delegateToSchemaSdk<
  SourceName extends keyof MeshContext,
  SourceTypeName extends keyof MeshContext[SourceName],
  SourceFieldName extends keyof MeshContext[SourceName][SourceTypeName],
>(options: {
  context: MeshContext
  info: GraphQLResolveInfo
  sourceName: SourceName
  sourceTypeName: SourceTypeName
  sourceFieldName: SourceFieldName
  sourceArgs: MeshContext[SourceName][SourceTypeName][SourceFieldName] extends InContextSdkMethod<
    unknown,
    infer A
  >
    ? A
    : unknown
}): MeshContext[SourceName][SourceTypeName][SourceFieldName] extends InContextSdkMethod<infer R>
  ? Promise<R>
  : unknown {
  const { context, info, sourceArgs, sourceFieldName, sourceTypeName } = options

  const operationMap: Record<string, OperationTypeNode> = {
    Query: OperationTypeNode.QUERY,
    Mutation: OperationTypeNode.MUTATION,
    Subscription: OperationTypeNode.SUBSCRIPTION,
  }

  return delegateToSchema({
    context,
    info,
    schema: info.schema,
    operation: operationMap[sourceTypeName as string],
    fieldName: sourceFieldName as string,
    args: sourceArgs as Record<string, any>,
    selectionSet: selectionSetByPath(
      info.operation.selectionSet,
      responsePathAsArray(info.path).join('.'),
    ),
    validateRequest: false,
    transforms: [
      {
        transformResult: (result) => {
          renameFromAliasToRegular(
            selectionSetByPath(
              info.operation.selectionSet,
              responsePathAsArray(info.path).join('.'),
            ),
            result.data[sourceFieldName],
          )

          console.dir(result.data[sourceFieldName], { depth: 5 })
          return result
        },
      },
    ],
  })
}
