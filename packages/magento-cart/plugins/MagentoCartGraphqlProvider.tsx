import type { GraphQLProviderProps } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import type { NextRouter } from 'next/router'
import { useMemo } from 'react'
import { cartLink } from '../link/cartLink'
import { cartTypePolicies, migrateCart } from '../typePolicies'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, router, links = [], policies = [], migrations = [], ...rest } = props

  const push = useEventCallback<NextRouter['push']>((...args) => router.push(...args))

  const cartLinkMemo = useMemo(
    () => cartLink({ push, events: router.events, locale: router.locale }),
    [push, router.events, router.locale],
  )

  return (
    <Prev
      {...rest}
      router={router}
      links={[...links, cartLinkMemo]}
      policies={[...policies, cartTypePolicies]}
      migrations={[...migrations, migrateCart]}
    />
  )
}
