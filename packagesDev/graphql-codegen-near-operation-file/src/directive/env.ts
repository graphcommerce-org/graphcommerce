/* eslint-disable react/destructuring-assignment */
import { Types } from '@graphql-codegen/plugin-helpers'
import { Kind, visit } from 'graphql'

/**
 * Implements the env directive:
 *
 *     directive @env(if: String!) on FRAGMENT_DEFINITION
 */
export function envDirective(documentFiles: Types.DocumentFile[]) {
  return documentFiles.filter((documentFile) => {
    if (!documentFile.document) return true
    let keep = true
    documentFile.document = visit(documentFile.document, {
      Directive: (node) => {
        if (node.name.value === 'env') {
          const ifValue = node.arguments?.find((arg) => arg.name.value === 'if')?.value
          keep = ifValue?.kind === Kind.STRING && typeof process.env[ifValue.value] !== 'undefined'
        }
        return undefined
      },
    })
    return keep
  })
}
