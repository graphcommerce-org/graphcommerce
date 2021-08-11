import { execSync } from 'child_process'
import { createHash } from 'crypto'
import { readFileSync, writeFileSync } from 'fs'
import withTranspileModules from 'next-transpile-modules'
import { NextConfig } from 'next/dist/server/config-shared'
import { PackageJson } from 'type-fest'

export type WorkspaceInfo = {
  [name: string]: {
    location: string
    workspaceDependencies: string[]
    mismatchedWorkspaceDependencies: string[]
  }
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
    infoJson = execSync('yarn workspaces info --json', { encoding: 'utf-8' })
    try {
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

  return withTranspileModules([...m.values()])
}
