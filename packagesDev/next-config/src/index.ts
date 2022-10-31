import { NextConfig } from 'next/dist/server/config-shared'
import type React from 'react'
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

export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
  Prev: React.FC<P>
}
