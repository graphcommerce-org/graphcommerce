import type { Path, PathValue } from 'react-hook-form'
import type { GraphCommerceConfig } from '../generated/config'

export * from './commands/generateConfig'
export * from './commands/exportConfig'

export * from './loadConfig'

declare global {
  interface ImportMeta {
    graphCommerce: GraphCommerceConfig
  }
}

export type IfConfig<P extends Path<GraphCommerceConfig> = Path<GraphCommerceConfig>> =
  | P
  | [P, PathValue<GraphCommerceConfig, P>]
