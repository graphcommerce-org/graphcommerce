import { join } from 'path'
import addPlugin from '@graphql-codegen/add'
import { Types, CodegenPlugin } from '@graphql-codegen/plugin-helpers'
import {
  FragmentImport,
  ImportDeclaration,
  ImportSource,
} from '@graphql-codegen/visitor-plugin-common'
import { FragmentDefinitionNode, buildASTSchema, visit } from 'graphql'
import { envDirective } from './directive/env'
import { injectableDirective } from './directive/injectable'
import { resolveDocumentImports, DocumentImportResolverOptions } from './resolve-document-imports'
import { appendExtensionToFilePath, defineFilepathSubfolder } from './utils'

export { resolveDocumentImports }
export type { DocumentImportResolverOptions }

export type FragmentImportFromFn = (
  source: ImportSource<FragmentImport>,
  sourceFilePath: string,
) => ImportSource<FragmentImport>

export type NearOperationFileConfig = {
  /**
   * Required, should point to the base schema types file. The key of the output is used a the base
   * path for this file.
   *
   * If you wish to use an NPM package or a local workspace package, make sure to prefix the package
   * name with `~`.
   *
   * @exampleMarkdown ```yml generates:
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *   plugins:
   *     - typescript-operations
   * ```
   */
  baseTypesPath: string
  /**
   * Overrides all external fragments import types by using a specific file path or a package name.
   *
   * If you wish to use an NPM package or a local workspace package, make sure to prefix the package
   * name with `~`.
   *
   * @exampleMarkdown ```yml generates:
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *     importAllFragmentsFrom: '~types'
   *   plugins:
   *     - typescript-operations
   * ```
   */
  importAllFragmentsFrom?: string | FragmentImportFromFn
  /**
   * Optional, sets the extension for the generated files. Use this to override the extension if you
   * are using plugins that requires a different type of extensions (such as
   * `typescript-react-apollo`)
   *
   * @default .generates.ts
   * @exampleMarkdown ```yml generates:
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *     extension: .generated.tsx
   *   plugins:
   *     - typescript-operations
   *     - typescript-react-apollo
   * ```
   */
  extension?: string
  /**
   * Optional, override the `cwd` of the execution. We are using `cwd` to figure out the imports
   * between files. Use this if your execuion path is not your project root directory.
   *
   * @default process
   * @exampleMarkdown ```yml generates:
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *     cwd: /some/path
   *   plugins:
   *     - typescript-operations
   * ```
   */
  cwd?: string
  /**
   * Optional, defines a folder, (Relative to the source files) where the generated files will be
   * created.
   *
   * @default ''
   * @exampleMarkdown ```yml generates:
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *     folder: __generated__
   *   plugins:
   *     - typescript-operations
   * ```
   */
  folder?: string
  /**
   * Optional, override the name of the import namespace used to import from the `baseTypesPath`
   * file.
   *
   * @default Types
   * @exampleMarkdown ```yml generates:
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *     importTypesNamespace: SchemaTypes
   *   plugins:
   *     - typescript-operations
   * ```
   */
  importTypesNamespace?: string

  /**
   * Enable the injectables
   *
   * ```yml
   * src/:
   *   preset: near-operation-file
   *   presetConfig:
   *     baseTypesPath: types.ts
   *     injectables: true
   *   plugins:
   *     - typescript-operations
   * ```
   */
  injectables?: boolean
}

export type FragmentNameToFile = {
  [fragmentName: string]: {
    location: string
    importsNames: string[]
    onType: string
    node: FragmentDefinitionNode
  }
}

function isFragment(documentFile: Types.DocumentFile) {
  let name = false
  if (!documentFile.document) return name

  visit(documentFile.document, {
    FragmentDefinition: () => {
      name = true
    },
  })
  return name
}

function isDocument(documentFiles: Types.DocumentFile[]) {
  return !documentFiles.every(isFragment)
}

export const preset: Types.OutputPreset<NearOperationFileConfig> = {
  buildGeneratesSection: (options) => {
    options.documents = envDirective(options.documents)
    if (options.presetConfig.injectables) {
      options.documents = injectableDirective(options.documents)
    }

    const schemaObject = options.schemaAst ?? buildASTSchema(options.schema, options.config)

    const baseDir = options.presetConfig.cwd ?? process.cwd()
    const extension = options.presetConfig.extension ?? '.generated.ts'
    const folder = options.presetConfig.folder ?? ''
    const importTypesNamespace = options.presetConfig.importTypesNamespace ?? 'Types'
    const { importAllFragmentsFrom } = options.presetConfig

    const { baseTypesPath } = options.presetConfig

    if (!baseTypesPath) {
      throw new Error(
        `Preset "near-operation-file" requires you to specify "baseTypesPath" configuration and point it to your base types file (generated by "typescript" plugin)!`,
      )
    }

    const shouldAbsolute = !baseTypesPath.startsWith('~')

    const pluginMap: { [name: string]: CodegenPlugin } = {
      ...options.pluginMap,
      add: addPlugin,
    }

    const sources = resolveDocumentImports(options, schemaObject, {
      baseDir,
      generateFilePath(location: string) {
        const newFilePath = defineFilepathSubfolder(location, folder)

        return appendExtensionToFilePath(newFilePath, extension)
      },
      schemaTypesSource: {
        path: shouldAbsolute ? join(options.baseOutputDir, baseTypesPath) : baseTypesPath,
        namespace: importTypesNamespace,
      },
      typesImport: options.config.useTypeImports ?? false,
    })

    return sources.map<Types.GenerateOptions>(
      ({ importStatements, externalFragments, fragmentImports, documents, ...source }) => {
        let fragmentImportsArr = fragmentImports

        if (importAllFragmentsFrom) {
          fragmentImportsArr = fragmentImports.map<ImportDeclaration<FragmentImport>>((t) => {
            const newImportSource: ImportSource<FragmentImport> =
              typeof importAllFragmentsFrom === 'string'
                ? { ...t.importSource, path: importAllFragmentsFrom }
                : importAllFragmentsFrom(t.importSource, source.filename)

            return {
              ...t,
              importSource: newImportSource || t.importSource,
            }
          })
        }

        const isDoc = isDocument(documents)
        const isRelayOptimizer = !!Object.keys(pluginMap).find((plugin) =>
          plugin.includes('relay-optimizer-plugin'),
        )

        const plugins = [
          // TODO/NOTE I made globalNamespace include schema types - is that correct?
          ...(options.config.globalNamespace
            ? []
            : importStatements.map((importStatement) => ({ add: { content: importStatement } }))),
          ...options.plugins.filter(
            (pluginOptions) =>
              !isRelayOptimizer ||
              isDoc ||
              !Object.keys(pluginOptions).includes('typed-document-node'),
          ),
        ]
        const config = {
          ...options.config,
          // This is set here in order to make sure the fragment spreads sub types
          // are exported from operations file
          exportFragmentSpreadSubTypes: true,
          namespacedImportName: importTypesNamespace,
          externalFragments,
          fragmentImports: fragmentImportsArr,
        }

        return {
          ...source,
          documents,
          plugins,
          pluginMap,
          config,
          schema: options.schema,
          schemaAst: schemaObject,
          // skipDocumentsValidation: true,
        }
      },
    )
  },
}

export default preset
