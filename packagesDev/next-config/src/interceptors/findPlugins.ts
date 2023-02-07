import { parseFileSync } from '@swc/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from 'glob'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import type { PluginConfig } from './generateInterceptors'

type ParseResult = {
  component?: string
  exported?: string
  ifEnv?: string
}

function parseStructure(file: string): ParseResult {
  const ast = parseFileSync(file, { syntax: 'typescript', tsx: true })
  // const ast = swc.parseFileSync(file, { syntax: 'typescript' })

  const imports: Record<string, string> = {}
  const exports: Record<string, string> = {}

  ast.body.forEach((node) => {
    switch (node.type) {
      case 'ImportDeclaration':
        node.specifiers.forEach((s) => {
          if (s.type === 'ImportSpecifier') {
            imports[s.local.value] = node.source.value
          }
        })
        break
      case 'ExportDeclaration':
        switch (node.declaration.type) {
          case 'VariableDeclaration':
            node.declaration.declarations.forEach((declaration) => {
              if (declaration.id.type !== 'Identifier') return

              switch (declaration.init?.type) {
                case 'StringLiteral':
                  exports[declaration.id.value] = declaration.init.value
                  break
              }
            })
            break
          case 'FunctionDeclaration':
            if (node.declaration.type === 'FunctionDeclaration') {
              // console.log('func', node.declaration)
            }
            break
          default:
            console.log('unknown', node.declaration)
        }
        break
      // default:
      // console.log('hallo', node)
    }
  })

  return exports as ParseResult
}

export function findPlugins(cwd: string = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd)

  const plugins: PluginConfig[] = []
  dependencies.forEach((dependency, path) => {
    const files = glob.sync(`${dependency}/plugins/**/*.tsx`)
    files.forEach((file) => {
      try {
        const result = parseStructure(file)
        if (!result) return
        // if (result.ifEnv && !process.env[result.ifEnv]) return

        plugins.push({ ...result, plugin: file.replace(dependency, path).replace('.tsx', '') })
      } catch (e) {
        console.error(`Error parsing ${file}`, e)
      }
    })
  })

  return plugins
}
