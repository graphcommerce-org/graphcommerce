import { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { NextRouter } from 'next/router'
import { useMemo } from 'react'
import { customerLink } from '../link/customerLink'
import { customerTypePolicies, migrateCustomer } from '../typePolicies'

export const component = 'GraphQLProvider'
export const exported = '@graphcommerce/graphql'

function MagentoCustomerGraphqlProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], policies = [], migrations = [], router, ...rest } = props

  const push = useEventCallback<NextRouter['push']>((...args) => router.push(...args))
  const customerLinkMemo = useMemo(
    () => customerLink({ push, events: router.events }),
    [push, router.events],
  )

  return (
    <Prev
      {...rest}
      router={router}
      links={[...links, customerLinkMemo]}
      policies={[...policies, customerTypePolicies]}
      migrations={[...migrations, migrateCustomer]}
    />
  )
}

export const Plugin = MagentoCustomerGraphqlProvider
