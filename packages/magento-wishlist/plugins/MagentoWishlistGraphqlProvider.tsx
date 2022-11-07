/* eslint-disable import/no-mutable-exports */
import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { wishlistTypePolicies } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoWishlistGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, policies = [], ...prev } = props
  return <Prev {...prev} policies={[...policies, wishlistTypePolicies]} />
}

export const Plugin = MagentoWishlistGraphqlProvider
