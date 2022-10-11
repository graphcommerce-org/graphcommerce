import { NextConfig } from 'next/dist/server/config-shared'
import { withGraphCommerce } from './withGraphCommerce'

export * from './utils/isMonorepo'
export * from './utils/resolveDependenciesSync'
export * from './withGraphCommerce'

export function withYarn1Workspaces(packages: string[] = []): (config: NextConfig) => NextConfig {
  return withGraphCommerce({ packages })
}

export function withYarn1Scopes(packages?: string[]): (config: NextConfig) => NextConfig {
  return withGraphCommerce({ packages })
}
