import type { Path } from 'react-hook-form'
import { GraphCommerceConfig } from '../generated/config'

export * from './generateConfig'
export * from './loadConfig'

declare global {
  interface ImportMeta {
    graphCommerce: GraphCommerceConfig
  }
}

export type IfConfig = Path<GraphCommerceConfig>
