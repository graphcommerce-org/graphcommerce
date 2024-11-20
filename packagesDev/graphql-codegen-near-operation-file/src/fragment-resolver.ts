/* eslint-disable import/no-cycle */
import type { Types } from '@graphql-codegen/plugin-helpers'
import type {
  FragmentImport,
  LoadedFragment,
  ParsedConfig,
  RawConfig,
  ImportDeclaration,
} from '@graphql-codegen/visitor-plugin-common'
import {
  BaseVisitor,
  getConfigValue,
  getPossibleTypes,
  buildScalarsFromConfig,
} from '@graphql-codegen/visitor-plugin-common'
import type { DocumentNode, FragmentDefinitionNode, GraphQLSchema } from 'graphql'
import { Kind, print } from 'graphql'
import type { DocumentImportResolverOptions } from './resolve-document-imports'
import { extractExternalFragmentsInUse } from './utils'

export interface NearOperationFileParsedConfig extends ParsedConfig {
  importTypesNamespace?: string
  dedupeOperationSuffix: boolean
  omitOperationSuffix: boolean
  fragmentVariablePrefix: string
  fragmentVariableSuffix: string
}

export type FragmentRegistry = {
  [fragmentName: string]: {
    filePath: string
    onType: string
    node: FragmentDefinitionNode
    imports: Array<FragmentImport>
  }
}

/**
 * Used by `buildFragmentResolver` to build a mapping of fragmentNames to paths, importNames, and
 * other useful info
 */
export function buildFragmentRegistry<T>(
  { generateFilePath }: DocumentImportResolverOptions,
  { documents, config }: Types.PresetFnArgs<T>,
  schemaObject: GraphQLSchema,
): FragmentRegistry {
  const baseVisitor = new BaseVisitor<RawConfig, NearOperationFileParsedConfig>(config, {
    scalars: buildScalarsFromConfig(schemaObject, config),
    dedupeOperationSuffix: getConfigValue(config.dedupeOperationSuffix, false),
    omitOperationSuffix: getConfigValue(config.omitOperationSuffix, false),
    fragmentVariablePrefix: getConfigValue(config.fragmentVariablePrefix, ''),
    fragmentVariableSuffix: getConfigValue(config.fragmentVariableSuffix, 'FragmentDoc'),
  })

  const getFragmentImports = (possbileTypes: string[], name: string): Array<FragmentImport> => {
    const fragmentImports: Array<FragmentImport> = []

    fragmentImports.push({ name: baseVisitor.getFragmentVariableName(name), kind: 'document' })

    const fragmentSuffix = baseVisitor.getFragmentSuffix(name)
    if (possbileTypes.length === 1) {
      fragmentImports.push({
        name: baseVisitor.convertName(name, {
          useTypesPrefix: true,
          suffix: fragmentSuffix,
        }),
        kind: 'type',
      })
    } else if (possbileTypes.length !== 0) {
      possbileTypes.forEach((typeName) => {
        fragmentImports.push({
          name: baseVisitor.convertName(name, {
            useTypesPrefix: true,
            suffix: `_${typeName}_${fragmentSuffix}`,
          }),
          kind: 'type',
        })
      })
    }

    return fragmentImports
  }

  const duplicateFragmentNames: string[] = []
  const registry = documents.reduce<FragmentRegistry>((prev: FragmentRegistry, documentRecord) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fragments: FragmentDefinitionNode[] = documentRecord.document!.definitions.filter(
      (d) => d.kind === Kind.FRAGMENT_DEFINITION,
    )

    if (fragments.length > 0) {
      for (const fragment of fragments) {
        const schemaType = schemaObject.getType(fragment.typeCondition.name.value)

        if (!schemaType) {
          throw new Error(
            `Fragment "${fragment.name.value}" is set on non-existing type "${fragment.typeCondition.name.value}"!`,
          )
        }

        const possibleTypes = getPossibleTypes(schemaObject, schemaType)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const filePath = generateFilePath(documentRecord.location!)
        const imports = getFragmentImports(
          possibleTypes.map((t) => t.name),
          fragment.name.value,
        )

        if (
          prev[fragment.name.value] &&
          print(fragment) !== print(prev[fragment.name.value].node)
        ) {
          duplicateFragmentNames.push(
            `${prev[fragment.name.value]} ${prev[fragment.name.value].filePath}`,
          )
          duplicateFragmentNames.push(`${fragment.name.value} ${fragment.loc?.source.name}`)
        }

        prev[fragment.name.value] = {
          filePath,
          imports,
          onType: fragment.typeCondition.name.value,
          node: fragment,
        }
      }
    }

    return prev
  }, {})

  if (duplicateFragmentNames.length) {
    throw new Error(
      `Multiple definitions of the same fragment found at:
${duplicateFragmentNames.join('\n')}\n\n`,
    )
  }

  return registry
}

/** Builds a fragment "resolver" that collects `externalFragments` definitions and `fragmentImportStatements` */
export default function buildFragmentResolver<T>(
  collectorOptions: DocumentImportResolverOptions,
  presetOptions: Types.PresetFnArgs<T>,
  schemaObject: GraphQLSchema,
) {
  const fragmentRegistry = buildFragmentRegistry(collectorOptions, presetOptions, schemaObject)
  const { baseOutputDir } = presetOptions
  const { baseDir, typesImport } = collectorOptions

  function resolveFragments(generatedFilePath: string, documentFileContent: DocumentNode) {
    const fragmentsInUse = extractExternalFragmentsInUse(documentFileContent, fragmentRegistry)

    const externalFragments: LoadedFragment<{ level: number }>[] = []
    // fragment files to import names
    const fragmentFileImports: { [fragmentFile: string]: Array<FragmentImport> } = {}
    for (const fragmentName of Object.keys(fragmentsInUse)) {
      const level = fragmentsInUse[fragmentName]
      const fragmentDetails = fragmentRegistry[fragmentName]
      if (fragmentDetails) {
        // add top level references to the import object
        // we don't checkf or global namespace because the calling config can do so
        if (level === 0) {
          if (fragmentFileImports[fragmentDetails.filePath] === undefined) {
            fragmentFileImports[fragmentDetails.filePath] = fragmentDetails.imports
          } else {
            fragmentFileImports[fragmentDetails.filePath].push(...fragmentDetails.imports)
          }
        }

        externalFragments.push({
          level,
          isExternal: true,
          name: fragmentName,
          onType: fragmentDetails.onType,
          node: fragmentDetails.node,
        })
      }
    }

    return {
      externalFragments,
      fragmentImports: Object.entries(fragmentFileImports).map(
        ([fragmentsFilePath, identifiers]): ImportDeclaration<FragmentImport> => ({
          baseDir,
          baseOutputDir,
          outputPath: generatedFilePath,
          importSource: {
            path: fragmentsFilePath,
            identifiers,
          },
          emitLegacyCommonJSImports: presetOptions.config.emitLegacyCommonJSImports,
          typesImport,
        }),
      ),
    }
  }
  return resolveFragments
}
