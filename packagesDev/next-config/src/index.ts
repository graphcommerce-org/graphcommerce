import { execSync } from 'child_process'
import { createHash } from 'crypto'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import withTranspileModules from 'next-transpile-modules'
import { NextConfig } from 'next/dist/server/config-shared'
import { PackageJson } from 'type-fest'
import { DefinePlugin } from 'webpack'

export type WorkspaceInfo = {
  [name: string]: {
    location: string
    workspaceDependencies: string[]
    mismatchedWorkspaceDependencies: string[]
  }
}

type TreeNode = {
  name: string
  children?: TreeNode[]
  hint: null
  depth: number
  color?: string
  shadow?: boolean
}

export type ListInfo = {
  type: 'tree'
  data: {
    type: 'list'
    trees: TreeNode[]
  }
}

function extendConfig(nextConfig: NextConfig): NextConfig {
  return {
    ...nextConfig,
    webpack: (config, options) => {
      // To properly properly treeshake @apollo/client we need to define the __DEV__ property
      config.plugins = [new DefinePlugin({ __DEV__: options.dev }), ...config.plugins]

      return typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, options) : config
    },
  }
}

export function withYarn1Scopes(
  scopes: string[] = ['@apollo', '@graphcommerce'],
): (config: NextConfig) => NextConfig {
  const packageStr = readFileSync('package.json', 'utf-8')

  const hashSum = createHash('sha256').update(packageStr, 'utf-8').digest('hex').slice(0, 10)

  const cacheKey = `.next/cache/withYarn1Scopes.${hashSum}.json`
  let modules: string[]
  try {
    modules = JSON.parse(readFileSync(cacheKey, 'utf-8')) as string[]
  } catch (e) {
    const infoJson: string = execSync('yarn list --json', { encoding: 'utf-8' })

    const workspaceInfo = JSON.parse(infoJson) as ListInfo

    const list: Set<string> = new Set()
    const walk = (node: TreeNode) => {
      let packageName: string
      if (node.name.includes('/')) {
        const [scope, nameWithVersion] = node.name.split('/')
        const [name] = nameWithVersion.split('@')
        packageName = `${scope}/${name}`
      } else {
        const [name] = node.name.split('@')
        packageName = `${name}`
      }

      const found = scopes.find((scope) => packageName.startsWith(scope))
      if (found) list.add(packageName)

      node.children?.forEach(walk)
    }
    workspaceInfo.data.trees.map(walk)

    modules = [...list.values()]

    mkdirSync('.next/cache/', { recursive: true })
    writeFileSync(cacheKey, JSON.stringify(modules))
  }

  return (config) => extendConfig(withTranspileModules(modules)(config))
}

export function withYarn1Workspaces(modules: string[] = []): (config: NextConfig) => NextConfig {
  const packageStr = readFileSync('package.json', 'utf-8')
  const packageJson = JSON.parse(packageStr) as PackageJson

  const hashSum = createHash('sha256').update(packageStr, 'utf-8').digest('hex').slice(0, 10)

  let infoJson: string
  const cacheKey = `.next/cache/withYarn1Workspaces.${hashSum}.json`
  try {
    infoJson = readFileSync(cacheKey, 'utf-8')
  } catch (e) {
    infoJson = execSync('yarn list info --json', { encoding: 'utf-8' })
    try {
      mkdirSync('.next/cache/', { recursive: true })
      writeFileSync(cacheKey, infoJson)
    } catch (er) {
      // do nothing
    }
  }

  const workspaceInfo = JSON.parse(JSON.parse(infoJson).data) as WorkspaceInfo

  const requestedPackages = [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
  ]

  const entries = Object.entries(workspaceInfo as unknown as WorkspaceInfo)

  const m = new Set<string>(modules)
  entries.forEach(([p, b]) => {
    if (requestedPackages.includes(p)) {
      m.add(p)
      b.workspaceDependencies.forEach((wp) => m.add(wp))
    }
  })

  return (config) => extendConfig(withTranspileModules([...m.values()])(config))
}
