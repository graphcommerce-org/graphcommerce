import path from 'path'
import { parseSync } from '@swc/core'
import { ResolveDependency, ResolveDependencyReturn } from '../utils/resolveDependency'
import { PluginConfig, isMethodPluginConfig } from './generateInterceptors'

function parseStructure(
  resolved: ResolveDependencyReturn,
  findExport: string,
  resolve: ResolveDependency,
): ResolveDependencyReturn | undefined {
  if (!resolved?.source) return resolved
  const { dependency, source } = resolved
  const ast = parseSync(source, { syntax: 'typescript', tsx: true, comments: true })

  for (const node of ast.body) {
    if (node.type === 'ExportDeclaration') {
      switch (node.declaration.type) {
        case 'ClassDeclaration':
        case 'FunctionDeclaration':
          if (node.declaration.identifier.value === findExport) return resolved
          break
        case 'VariableDeclaration':
          for (const declaration of node.declaration.declarations) {
            if (declaration.type === 'VariableDeclarator') {
              if (declaration.id.type === 'Identifier') {
                if (declaration.id.value === findExport) return resolved
              } else {
                console.log(declaration)
              }
            }
          }
          break
      }
    }
  }

  for (const node of ast.body) {
    if (node.type === 'ExportAllDeclaration') {
      const isRelative = node.source.value.startsWith('.')
      if (isRelative) {
        const d = dependency.endsWith('/index') ? dependency.slice(0, -6) : dependency
        const newPath = path.join(d, node.source.value)

        const resolveResult = resolve(newPath, { includeSources: true })
        // eslint-disable-next-line no-continue
        if (!resolveResult) continue

        const newResolved = parseStructure(resolveResult, findExport, resolve)

        if (newResolved && dependency !== newResolved.dependency) {
          // console.log(findExport, newPath, newResolved)
          return newResolved
        }
      }
    }
  }

  return undefined
}

export function findOriginalSource(
  plug: PluginConfig,
  resolved: ResolveDependencyReturn,
  resolve: ResolveDependency,
) {
  if (!resolved?.source) return resolved
  const findExport = isMethodPluginConfig(plug) ? plug.func : plug.component
  const result = parseStructure(resolved, findExport, resolve)

  if (!result) {
    throw new Error(`Could not find original source for ${findExport}`)
  }
  return result
}
