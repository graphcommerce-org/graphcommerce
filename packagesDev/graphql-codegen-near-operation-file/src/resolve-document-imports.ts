/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */
import { resolve } from 'path'
import type { Types } from '@graphql-codegen/plugin-helpers'
import { isUsingTypes } from '@graphql-codegen/plugin-helpers'
import type {
  ImportSource,
  FragmentImport,
  ImportDeclaration,
  LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import {
  generateImportStatement,
  resolveImportSource,
} from '@graphql-codegen/visitor-plugin-common'
import type { Source } from '@graphql-tools/utils'
import type { DocumentNode, FragmentDefinitionNode, GraphQLSchema } from 'graphql'
import { visit } from 'graphql'
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
  /** Generates a target file path from the source `document.location` */
  generateFilePath: (location: string) => string
  /** Schema base types source */
  schemaTypesSource: string | ImportSource
  /** Should `import type` be used */
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

function getFragmentName(documentFile: Types.DocumentFile) {
  let name: string | undefined
  if (!documentFile.document) return name

  visit<DocumentNode>(documentFile.document, {
    FragmentDefinition(node) {
      name = node.name.value
    },
  })

  return name
}

/**
 * Transform the preset's provided documents into single-file generator sources, while resolving
 * fragment and user-defined imports
 *
 * Resolves user provided imports and fragment imports using the `DocumentImportResolverOptions`.
 * Does not define specific plugins, but rather returns a string[] of `importStatements` for the
 * calling plugin to make use of
 */
export function resolveDocumentImports<T>(
  presetOptions: Types.PresetFnArgs<T>,
  schemaObject: GraphQLSchema,
  importResolverOptions: DocumentImportResolverOptions,
): Array<ResolveDocumentImportResult> {
  const { baseOutputDir, documents, pluginMap } = presetOptions
  const { generateFilePath, schemaTypesSource, baseDir, typesImport } = importResolverOptions

  const resolveFragments = buildFragmentResolver(importResolverOptions, presetOptions, schemaObject)
  const fragmentRegistry = buildFragmentRegistry(importResolverOptions, presetOptions, schemaObject)

  const isRelayOptimizer = !!Object.keys(pluginMap).find((plugin) =>
    plugin.includes('relay-optimizer-plugin'),
  )

  const resDocuments = documents.map((documentFile) => {
    try {
      const isFragment = typeof getFragmentName(documentFile) !== 'undefined'

      if (!isFragment && isRelayOptimizer) {
        const generatedFilePath = generateFilePath(documentFile.location!)

        let externalFragments = extractExternalFragmentsInUse(
          documentFile.document!,
          fragmentRegistry,
        )
        // Sort the entries in the right order so fragments are defined when using
        externalFragments = Object.fromEntries(
          Object.entries(externalFragments).sort(([, levelA], [, levelB]) => levelB - levelA),
        )

        const fragments = documents.filter(
          (d) => typeof externalFragments[getFragmentName(d) ?? ''] !== 'undefined',
        )

        const importStatements: string[] = []

        if (isUsingTypes(documentFile.document!, [], schemaObject)) {
          const schemaTypesImportStatement = generateImportStatement({
            baseDir,
            emitLegacyCommonJSImports: presetOptions.config.emitLegacyCommonJSImports,
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
      }

      const generatedFilePath = generateFilePath(documentFile.location!)
      const importStatements: string[] = []
      const { externalFragments, fragmentImports } = resolveFragments(
        generatedFilePath,
        documentFile.document!,
      )

      if (
        isRelayOptimizer ||
        isUsingTypes(
          documentFile.document!,
          externalFragments.map((m) => m.name),
          schemaObject,
        )
      ) {
        const schemaTypesImportStatement = generateImportStatement({
          baseDir,
          importSource: resolveImportSource(schemaTypesSource),
          emitLegacyCommonJSImports: presetOptions.config.emitLegacyCommonJSImports,
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
      if (e instanceof Error) {
        throw new Error(`File ${documentFile.location} caused error: ${e.message || e.toString()}`)
      } else {
        throw e
      }
    }
  })

  return resDocuments.filter((result) =>
    result.filename.startsWith(resolve(baseDir, baseOutputDir).replace(/\\/g, '/')),
  )
}
