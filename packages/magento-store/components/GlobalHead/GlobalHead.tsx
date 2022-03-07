import {
  GlobalHead as GlobalHeadBase,
  GlobalHeadProps as GlobalHeadPropsBase,
} from '@graphcommerce/next-ui'
import { MagentoEnv } from '../../storeConfigEnv'

export type GlobalHeadProps = Omit<GlobalHeadPropsBase, 'name'>

export function GlobalHead(props: GlobalHeadProps) {
  const name = (process.env as MagentoEnv).NEXT_PUBLIC_WEBSITE_NAME ?? ''
  return <GlobalHeadBase name={name} {...props} />
}
