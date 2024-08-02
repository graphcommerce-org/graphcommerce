import { isObjectLike } from '@graphql-tools/utils'
import { Kind, SelectionNode, SelectionSetNode, print } from 'graphql'
import type { Path } from 'react-hook-form'

function isNumeric(n: string) {
  return !Number.isNaN(parseFloat(n))
}

export function selectionSetByPath<Q = string>(
  incomingSelectionSet: SelectionSetNode,
  path: Path<Q>,
) {
  const pathArray = path.split(/[,[\].]+?/)
  let selectionSet = incomingSelectionSet
  let pathIndex = 0

  while (pathIndex < pathArray.length) {
    let currentValue = pathArray[pathIndex]

    const isNegation = currentValue.startsWith('!')
    currentValue = isNegation ? currentValue.slice(1) : currentValue

    if (!isNumeric(currentValue)) {
      const newSelections: SelectionNode[] = []

      for (const selection of selectionSet.selections) {
        if (selection.kind === Kind.FIELD) {
          const val = selection.alias?.value ?? selection.name.value
          if (!isNegation && val === currentValue) {
            newSelections.push(...(selection.selectionSet?.selections ?? []))
          }

          if (isNegation && val !== currentValue) {
            newSelections.push(...(selection.selectionSet?.selections ?? []))
          }
        }
      }

      selectionSet = {
        kind: Kind.SELECTION_SET,
        selections: newSelections,
      }
    }

    pathIndex++
  }

  return selectionSet
}

/**
 * A FieldNode can have an alias field, but we want to remap the data back to its values without the aliases.
 *
 * This is a recursive function.
 */
export function renameFromAliasToRegular(selectionSet: SelectionSetNode, data: any): any {
  if (!data) return data

  if (Array.isArray(data)) {
    data.forEach((v: object) => renameFromAliasToRegular(selectionSet, v))
  } else if (isObjectLike(data)) {
    for (const selection of selectionSet.selections) {
      if (selection.kind === Kind.FIELD && selection.alias?.value) {
        data[selection.name.value] = data[selection.alias?.value ?? selection.name.value]
        delete data[selection.alias.value]
      }
    }

    for (const selection of selectionSet.selections) {
      if (selection.kind === Kind.INLINE_FRAGMENT) {
        const typeCondition = selection.typeCondition?.name.value
        if ('__typename' in data) {
          // console.log('ues typename', selection)
          if (data.__typename === typeCondition) {
            renameFromAliasToRegular(selection.selectionSet, data)
          }
        } else {
          // We should have a typename, else we can not properly distribute the data
        }
      }

      if (selection.kind === Kind.FRAGMENT_SPREAD) {
        // console.log(selection)
      }
    }
  }

  return data
}
