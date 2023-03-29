import type { Path } from 'react-hook-form'
import { GraphCommerceConfig } from '../generated/config'

export * from './commands/generateConfig'
export * from './commands/exportConfig'
export * from './runtimeCaching'

export * from './loadConfig'

declare global {
  interface ImportMeta {
    graphCommerce: GraphCommerceConfig
  }
}

export type IfConfig = Path<GraphCommerceConfig>
