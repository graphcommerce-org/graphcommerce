/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import type { Path, PathValue } from 'react-hook-form'
import { GraphCommerceConfig } from './generated/config'
export * from './utils/isMonorepo'
export * from './utils/resolveDependenciesSync'
export * from './utils/packageRoots'
export * from './withGraphCommerce'
export * from './generated/config'
export * from './config'
export * from './runtimeCachingOptimizations'

export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
  Prev: React.FC<P>
}

export type MethodPlugin<T extends (...args: any[]) => any> = (
  prev: T,
  ...args: Parameters<T>
) => ReturnType<T>

export type PluginConfig<P extends Path<GraphCommerceConfig> = Path<GraphCommerceConfig>> = {
  type: PluginType
  module: string
  ifConfig?: P | [P, PathValue<GraphCommerceConfig, P>]
}

export type PluginType = 'component' | 'method' | 'replace'
