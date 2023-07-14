import type React from 'react'

export * from './utils/isMonorepo'
export * from './utils/resolveDependenciesSync'
export * from './utils/packageRoots'
export * from './withGraphCommerce'
export * from './generated/config'
export * from './config'

export type PluginProps<P extends Record<string, unknown> = Record<string, unknown>> = P & {
  Prev: React.FC<P>
}

export type ReactPlugin<T extends React.FC<any>> = (
  props: Parameters<T>[0] & { Prev: React.FC<Parameters<T>[0]> },
) => ReturnType<T>

export type MethodPlugin<T extends (...args: any[]) => any> = (
  prev: T,
  ...args: Parameters<T>
) => ReturnType<T>
