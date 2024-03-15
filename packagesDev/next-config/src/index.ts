/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import { IfConfig } from './config'

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

export type ReactPlugin<
  T extends React.FC<any>,
  AdditionalOptionalProps extends Record<string, unknown> = Record<string, unknown>,
> = (
  props: Parameters<T>[0] & AdditionalOptionalProps & { Prev: React.FC<Parameters<T>[0]> },
) => ReturnType<T>

export type ComponentWithoutPrev<C> =
  C extends React.ComponentType<infer P>
    ? React.ComponentType<P extends any ? ('Prev' extends keyof P ? Omit<P, 'Prev'> : P) : P>
    : never

export type MethodPlugin<T extends (...args: any[]) => any> = (
  prev: T,
  ...args: Parameters<T>
) => ReturnType<T>

export type Replace<T, Priority extends number, ifConfig extends IfConfig> = T & {
  __replace: Priority
  __ifConfig: ifConfig
}
