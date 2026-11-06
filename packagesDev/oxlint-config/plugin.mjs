import { existsSync, readFileSync, statSync } from 'node:fs'
import { builtinModules } from 'node:module'
import path from 'node:path'

const packageJsons = new Map()

function packageRoot(dir) {
  for (let current = dir; ; current = path.dirname(current)) {
    if (existsSync(path.join(current, 'package.json'))) return current
    if (path.dirname(current) === current) return undefined
  }
}

function readPackageJson(root) {
  if (!packageJsons.has(root))
    packageJsons.set(root, JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')))
  return packageJsons.get(root)
}

/** Calls `check` with each import, export and require specifier of the file, except type imports. */
const moduleSourceVisitors = (check) => ({
  ImportDeclaration: (node) => node.importKind !== 'type' && check(node, node.source.value),
  ExportNamedDeclaration: (node) =>
    node.source && node.exportKind !== 'type' && check(node, node.source.value),
  ExportAllDeclaration: (node) => node.exportKind !== 'type' && check(node, node.source.value),
  ImportExpression: (node) =>
    node.source.type === 'Literal' &&
    typeof node.source.value === 'string' &&
    check(node, node.source.value),
  CallExpression: (node) =>
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments[0]?.type === 'Literal' &&
    typeof node.arguments[0].value === 'string' &&
    check(node, node.arguments[0].value),
})

export default {
  meta: { name: 'graphcommerce' },
  rules: {
    'no-restricted-syntax': {
      meta: { type: 'suggestion', schema: false },
      create: (context) =>
        Object.fromEntries(
          context.options.map(({ selector, message }) => [
            selector,
            (node) => context.report({ node, message }),
          ]),
        ),
    },
    'no-extraneous-dependencies': {
      meta: { type: 'problem', schema: false },
      create(context) {
        const root = packageRoot(path.dirname(context.filename))
        if (!root) return {}
        const pkg = readPackageJson(root)
        const declared = new Set([
          pkg.name,
          ...Object.keys(pkg.dependencies ?? {}),
          ...Object.keys(pkg.peerDependencies ?? {}),
          ...Object.keys(pkg.optionalDependencies ?? {}),
          ...(context.options[0]?.devDependencies ? Object.keys(pkg.devDependencies ?? {}) : []),
        ])
        return moduleSourceVisitors((node, source) => {
          if (/^[./#]|^node:/.test(source)) return
          const parts = source.split('/')
          const name = source.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
          if (builtinModules.includes(name) || declared.has(name)) return
          context.report({
            node,
            message: `'${name}' must be in the dependencies of ${path.relative(process.cwd(), path.join(root, 'package.json'))}.`,
          })
        })
      },
    },
    'no-relative-packages': {
      meta: { type: 'problem' },
      create(context) {
        const dir = path.dirname(context.filename)
        const root = packageRoot(dir)
        return moduleSourceVisitors((node, source) => {
          if (!source.startsWith('.')) return
          const target = path.resolve(dir, source)
          const targetDir =
            existsSync(target) && statSync(target).isDirectory() ? target : path.dirname(target)
          const targetRoot = packageRoot(targetDir)
          if (!targetRoot || targetRoot === root) return
          context.report({
            node,
            message: `Import '${readPackageJson(targetRoot).name}' by its package name instead of the relative path '${source}'.`,
          })
        })
      },
    },
  },
}
