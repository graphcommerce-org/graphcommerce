import { Console } from 'console'
import { Transform } from 'stream'
import { parseFileSync } from '@swc/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from 'glob'
import get from 'lodash/get'
import type { Path } from 'react-hook-form'
import diff from '../config/utils/diff'
import { GraphCommerceConfig } from '../generated/config'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import type { PluginConfig } from './generateInterceptors'

function table(input: any) {
  // @see https://stackoverflow.com/a/67859384
  const ts = new Transform({
    transform(chunk, enc, cb) {
      cb(null, chunk)
    },
  })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const t = (ts.read() || '').toString()
  let result = ''
  for (const row of t.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌')
    r = r.replace(/^├─*┼/, '├')
    r = r.replace(/│[^│]*/, '')
    r = r.replace(/^└─*┴/, '└')
    r = r.replace(/'/g, ' ')
    result += `${r}\n`
  }
  console.log(result)
}

type ParseResult = {
  component?: string
  exported?: string
  ifConfig?: Path<GraphCommerceConfig>
}

function parseStructure(file: string): ParseResult {
  const ast = parseFileSync(file, { syntax: 'typescript', tsx: true })

  const imports: Record<string, string> = {}
  const exports: Record<string, string> = {}

  ast.body.forEach((node) => {
    if (node.type === 'ImportDeclaration') {
      node.specifiers.forEach((s) => {
        if (s.type === 'ImportSpecifier') {
          imports[s.local.value] = node.source.value
        }
      })
    }
    if (node.type === 'ExportDeclaration' && node.declaration.type === 'VariableDeclaration') {
      node.declaration.declarations.forEach((declaration) => {
        if (declaration.init?.type === 'StringLiteral' && declaration.id.type === 'Identifier') {
          exports[declaration.id.value] = declaration.init.value
        }
      })
    }
  })

  return exports as ParseResult
}

let prevlog: any

export function findPlugins(config: GraphCommerceConfig, cwd: string = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd)

  const debug = Boolean(config.debug?.pluginStatus)

  if (debug) console.time('findPlugins')

  const plugins: PluginConfig[] = []
  dependencies.forEach((dependency, path) => {
    const files = glob.sync(`${dependency}/plugins/**/*.tsx`)
    files.forEach((file) => {
      try {
        const result = parseStructure(file)
        if (!result) return

        plugins.push({
          plugin: file.replace(dependency, path).replace('.tsx', ''),
          ...result,
          enabled: !result.ifConfig || Boolean(get(config, result.ifConfig)),
        })
      } catch (e) {
        console.error(`Error parsing ${file}`, e)
      }
    })
  })

  if (debug) {
    const res = diff(prevlog, plugins)
    if (!prevlog) {
      prevlog = res

      table(
        plugins.map(({ plugin, component, ifConfig, enabled, exported }) => ({
          '💉': enabled ? '✅' : '❌',
          Reason: `${ifConfig ? `${ifConfig}` : ''}`,
          Plugin: plugin,
          Target: `${exported}#${component}`,
        })),
      )
    } else if (res) {
      table(res)
    }
    console.timeEnd('findPlugins')
  }

  return plugins
}
