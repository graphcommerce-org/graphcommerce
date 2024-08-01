import { Kind, SelectionNode, SelectionSetNode } from 'graphql'
import type { Path } from 'react-hook-form'

function isNumeric(n: string) {
  return !Number.isNaN(parseFloat(n))
}

/**
 *
 */
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
        // if (selection.kind === Kind.INLINE_FRAGMENT) {
        //   console.log(selection)
        // }
        if (selection.kind === Kind.FIELD) {
          if (!isNegation && selection.name.value === currentValue) {
            newSelections.push(...(selection.selectionSet?.selections ?? []))
          }

          if (isNegation && selection.name.value !== currentValue) {
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
