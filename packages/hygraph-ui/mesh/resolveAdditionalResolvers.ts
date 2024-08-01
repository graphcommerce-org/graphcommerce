import type { YamlConfig } from '@graphql-mesh/types'
import { parseSelectionSet } from '@graphql-tools/utils'
import type {
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
  SelectionSetNode,
} from 'graphql'
import { getNamedType, isAbstractType, isInterfaceType, isObjectType, Kind } from 'graphql'
import toPath from 'lodash.topath'

function getTypeByPath(type: GraphQLType, path: string[]): GraphQLNamedType {
  if ('ofType' in type) {
    return getTypeByPath(getNamedType(type), path)
  }
  if (path.length === 0) {
    return getNamedType(type)
  }
  if (!('getFields' in type)) {
    throw new Error(`${type} cannot have a path ${path.join('.')}`)
  }
  const fieldMap = type.getFields()
  const currentFieldName = path[0]
  // Might be an index of an array
  if (!Number.isNaN(parseInt(currentFieldName))) {
    return getTypeByPath(type, path.slice(1))
  }
  const field = fieldMap[currentFieldName]
  if (!field?.type) {
    throw new Error(`${type}.${currentFieldName} is not a valid field.`)
  }
  return getTypeByPath(field.type, path.slice(1))
}

export function generateSelectionSetFactory(
  schema: GraphQLSchema,
  additionalResolver:
    | YamlConfig.AdditionalStitchingBatchResolverObject
    | YamlConfig.AdditionalStitchingResolverObject,
) {
  if (additionalResolver.sourceSelectionSet) {
    return () => parseSelectionSet(additionalResolver.sourceSelectionSet)
    // If result path provided without a selectionSet
  }
  if (additionalResolver.result) {
    const resultPath = toPath(additionalResolver.result)
    let abstractResultTypeName: string

    const sourceType = schema.getType(additionalResolver.sourceTypeName) as GraphQLObjectType
    const sourceTypeFields = sourceType.getFields()
    const sourceField = sourceTypeFields[additionalResolver.sourceFieldName]
    const resultFieldType = getTypeByPath(sourceField.type, resultPath)

    if (isAbstractType(resultFieldType)) {
      if (additionalResolver.resultType) {
        abstractResultTypeName = additionalResolver.resultType
      } else {
        const targetType = schema.getType(additionalResolver.targetTypeName) as GraphQLObjectType
        const targetTypeFields = targetType.getFields()
        const targetField = targetTypeFields[additionalResolver.targetFieldName]
        const targetFieldType = getNamedType(targetField.type)
        abstractResultTypeName = targetFieldType?.name
      }
      if (abstractResultTypeName !== resultFieldType.name) {
        const abstractResultType = schema.getType(abstractResultTypeName)
        if (
          (isInterfaceType(abstractResultType) || isObjectType(abstractResultType)) &&
          !schema.isSubType(resultFieldType, abstractResultType)
        ) {
          throw new Error(
            `${additionalResolver.sourceTypeName}.${
              additionalResolver.sourceFieldName
            }.${resultPath.join('.')} doesn't implement ${abstractResultTypeName}.}`,
          )
        }
      }
    }

    return (subtree: SelectionSetNode) => {
      let finalSelectionSet = subtree
      let isLastResult = true
      const resultPathReversed = [...resultPath].reverse()
      for (const pathElem of resultPathReversed) {
        // Ensure the path elem is not array index
        if (Number.isNaN(parseInt(pathElem))) {
          if (
            isLastResult &&
            abstractResultTypeName &&
            abstractResultTypeName !== resultFieldType.name
          ) {
            finalSelectionSet = {
              kind: Kind.SELECTION_SET,
              selections: [
                {
                  kind: Kind.INLINE_FRAGMENT,
                  typeCondition: {
                    kind: Kind.NAMED_TYPE,
                    name: {
                      kind: Kind.NAME,
                      value: abstractResultTypeName,
                    },
                  },
                  selectionSet: finalSelectionSet,
                },
              ],
            }
          }
          finalSelectionSet = {
            kind: Kind.SELECTION_SET,
            selections: [
              {
                // we create a wrapping AST Field
                kind: Kind.FIELD,
                name: {
                  kind: Kind.NAME,
                  value: pathElem,
                },
                // Inside the field selection
                selectionSet: finalSelectionSet,
              },
            ],
          }
          isLastResult = false
        }
      }
      return finalSelectionSet
    }
  }
  return undefined
}
