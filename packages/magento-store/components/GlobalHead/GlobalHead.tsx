import { useQuery } from '@graphcommerce/graphql'
import type { GlobalHeadProps as GlobalHeadPropsBase } from '@graphcommerce/next-ui'
import { GlobalHead as GlobalHeadBase } from '@graphcommerce/next-ui'
import { StoreConfigDocument } from '../../StoreConfig.gql'

export type GlobalHeadProps = Omit<GlobalHeadPropsBase, 'name'>

export function GlobalHead(props: GlobalHeadProps) {
  const name = useQuery(StoreConfigDocument).data?.storeConfig?.website_name ?? ''
  return <GlobalHeadBase name={name} {...props} />
}
