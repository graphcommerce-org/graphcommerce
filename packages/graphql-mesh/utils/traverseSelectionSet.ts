import type { GraphQLResolveInfo, SelectionNode, SelectionSetNode } from 'graphql'
import { Kind, print } from 'graphql'
import type { Path } from 'react-hook-form'

function isNumeric(n: string) {
  return !Number.isNaN(parseFloat(n))
}

export function traverseSelectionSet<Q>(incomingSelectionSet: SelectionSetNode, path: Path<Q>) {
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

export function hasSelectionSetPath<Q>(selectionSet: SelectionSetNode, path: Path<Q>): boolean {
  return traverseSelectionSet<Q>(selectionSet, path).selections.length > 0
}

/** SelectionSet template literal that accepts SelectionSetNode and returns SelectionSetNode */
export function selectionSetTemplate(
  strings: TemplateStringsArray,
  ...values: SelectionSetNode[]
): string {
  return strings.reduce((acc, str, i) => {
    const value = values[i] ? values[i].selections.map((s) => print(s)).join(' ') : ''
    return acc + str + value
  }, '')
}
