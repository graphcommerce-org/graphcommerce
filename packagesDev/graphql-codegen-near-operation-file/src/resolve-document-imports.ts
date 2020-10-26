import { isUsingTypes, Types, DetailedError } from '@graphql-codegen/plugin-helpers'
import {
  generateImportStatement,
  ImportSource,
  resolveImportSource,
  FragmentImport,
  ImportDeclaration,
  LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import { Source } from '@graphql-tools/utils'
import { FragmentDefinitionNode, GraphQLSchema, visit, concatAST, parse } from 'graphql'
import buildFragmentResolver, { buildFragmentRegistry } from './fragment-resolver'
import { extractExternalFragmentsInUse } from './utils'

export type FragmentRegistry = {
  [fragmentName: string]: {
    location: string
    importNames: string[]
    onType: string
    node: FragmentDefinitionNode
  }
}

export type DocumentImportResolverOptions = {
  baseDir: string
  /**
   * Generates a target file path from the source `document.location`
   */
  generateFilePath: (location: string) => string
  /**
   * Schema base types source
   */
  schemaTypesSource: string | ImportSource
  /**
   * Should `import type` be used
   */
  typesImport: boolean
}

interface ResolveDocumentImportResult {
  filename: string
  documents: Source[]
  importStatements: string[]
  fragmentImports: ImportDeclaration<FragmentImport>[]
  externalFragments: LoadedFragment<{
    level: number
  }>[]
}

function fragmentName(documentFile: Types.DocumentFile) {
  let name: string | undefined
  visit(documentFile.document!, {
    enter: {
      FragmentDefinition: (node: FragmentDefinitionNode) => {
        name = node.name.value
      },
    },
  })
  return name
}

/**
 * Transform the preset's provided documents into single-file generator sources, while resolving fragment and user-defined imports
 *
 * Resolves user provided imports and fragment imports using the `DocumentImportResolverOptions`.
 * Does not define specific plugins, but rather returns a string[] of `importStatements` for the calling plugin to make use of
 */
export function resolveDocumentImports<T>(
  presetOptions: Types.PresetFnArgs<T>,
  schemaObject: GraphQLSchema,
  importResolverOptions: DocumentImportResolverOptions,
): Array<ResolveDocumentImportResult> {
  const { baseOutputDir, documents, config } = presetOptions
  const { generateFilePath, schemaTypesSource, baseDir, typesImport } = importResolverOptions

  const resolveFragments = buildFragmentResolver(importResolverOptions, presetOptions, schemaObject)
  const fragmentRegistry = buildFragmentRegistry(importResolverOptions, presetOptions, schemaObject)

  if (config.flattenGeneratedTypes) {
    return (
      documents
        // .filter((documentFile) => typeof fragmentName(documentFile) === 'undefined')
        .map((documentFile) => {
          const generatedFilePath = generateFilePath(documentFile.location!)

          if (typeof fragmentName(documentFile) === 'undefined') {
            return {
              filename: generatedFilePath,
              documents: [documentFile],
              importStatements: [],
              fragmentImports: [],
              externalFragments: [],
            }
          }

          const externalFragments = extractExternalFragmentsInUse(
            documentFile.document!,
            fragmentRegistry,
          )

          const fragments = documents.filter(
            (d) => typeof externalFragments[fragmentName(d) ?? ''] !== 'undefined',
          )

          const importStatements: string[] = []

          if (isUsingTypes(documentFile.document!, [], schemaObject)) {
            const schemaTypesImportStatement = generateImportStatement({
              baseDir,
              importSource: resolveImportSource(schemaTypesSource),
              baseOutputDir,
              outputPath: generatedFilePath,
              typesImport,
            })
            importStatements.unshift(schemaTypesImportStatement)
          }

          // const newDocument = [...fragments.map((f) => f.rawSDL), documentFile.rawSDL].join('\n')

          return {
            filename: generatedFilePath,
            documents: [...fragments, documentFile],
            importStatements,
            fragmentImports: [],
            externalFragments: [],
          } as ResolveDocumentImportResult
        })
    )
  }

  return documents.map((documentFile) => {
    try {
      const generatedFilePath = generateFilePath(documentFile.location!)
      const importStatements: string[] = []
      const { externalFragments, fragmentImports } = resolveFragments(
        generatedFilePath,
        documentFile.document!,
      )

      if (
        isUsingTypes(
          documentFile.document!,
          externalFragments.map((m) => m.name),
          schemaObject,
        )
      ) {
        const schemaTypesImportStatement = generateImportStatement({
          baseDir,
          importSource: resolveImportSource(schemaTypesSource),
          baseOutputDir,
          outputPath: generatedFilePath,
          typesImport,
        })
        importStatements.unshift(schemaTypesImportStatement)
      }

      return {
        filename: generatedFilePath,
        documents: [documentFile],
        importStatements,
        fragmentImports,
        externalFragments,
      }
    } catch (e) {
      throw new DetailedError(
        `Unable to validate GraphQL document!`,
        `
      File ${documentFile.location} caused error:
        ${e.message || e.toString()}
            `,
        documentFile.location,
      )
    }
  })
}
