import path from 'node:path'

export function isMonorepo() {
  const root = process.cwd()
  const meshDir = path.dirname(require.resolve('@graphcommerce/graphql-mesh'))
  const relativePath = path.join(path.relative(meshDir, root), '/')
  return relativePath.startsWith(`..${path.sep}..${path.sep}examples`)
}
