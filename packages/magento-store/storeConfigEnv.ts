import type {} from 'process'
import { StoreConfigEnvQuery } from './StoreConfigEnv.gql'

type StoreConfig = Required<NonNullable<StoreConfigEnvQuery['_storeConfig']>>

/**
 * Usage:
 *
 * ```tsx
 * if ((process.env as MagentoEnv).MYVAR) {
 *   // ...
 * }
 * ```
 */
export type MagentoEnv<K extends keyof StoreConfig = keyof StoreConfig> = {
  [P in K]: string
} & NodeJS.ProcessEnv
