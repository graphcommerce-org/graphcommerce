/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import type { Path, PathValue } from 'react-hook-form'
import type { GraphCommerceConfig } from './generated/config'

export * from './utils/isMonorepo'
export * from './utils/resolveDependenciesSync'
export * from './utils/packageRoots'
export * from './utils/sig'
export * from './withGraphCommerce'
export * from './generated/config'
export * from './config'
export * from './interceptors/commands/codegenInterceptors'
export * from './commands/copyFiles'
export * from './commands/codegen'

export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
  Prev: React.FC<P>
}

export type FunctionPlugin<T extends (...args: any[]) => any> = (
  prev: T,
  ...args: Parameters<T>
) => ReturnType<T>

/** @deprecated Use FunctionPlugin instead */
export type MethodPlugin<T extends (...args: any[]) => any> = (
  prev: T,
  ...args: Parameters<T>
) => ReturnType<T>

export type PluginConfig<P extends Path<GraphCommerceConfig> = Path<GraphCommerceConfig>> = {
  type: PluginType
  module: string
  ifConfig?: P | [P, PathValue<GraphCommerceConfig, P>]
}

export type PluginType = 'component' | 'function' | 'replace'
