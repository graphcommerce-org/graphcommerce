import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { AppShellDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'

export default async function getAppShellProps(client: ApolloClient<NormalizedCacheObject>) {
  const menu = client.query<GQLAppShellQuery>({ query: AppShellDocument })
  return (await menu).data
}

export type GetAppShellProps = PromiseValue<ReturnType<typeof getAppShellProps>>
