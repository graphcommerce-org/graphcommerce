/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'

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

export type InterceptorProps<C> = C extends React.FC<infer P> ? Omit<P, 'Prev'> : never

export type MethodPlugin<T extends (...args: any[]) => any> = (
  prev: T,
  ...args: Parameters<T>
) => ReturnType<T>
