import type { ApolloClient } from '@graphcommerce/graphql'
import { redirectOrNotFound as redirectOrNotFoundLib } from '@graphcommerce/magento-store/server'
import { notFound, redirect } from 'next/navigation'

/**
 * App Router wrapper for the library's redirectOrNotFound function.
 *
 * Converts the Pages Router return pattern ({ redirect: ... } or { notFound: true }) to App Router
 * behavior (calling redirect() or notFound() from next/navigation).
 *
 * @param client - Apollo client instance
 * @param configPromise - Promise resolving to StoreConfig query result
 * @param params - URL params object (e.g., { url: ['women', 'business'] })
 * @param locale - Locale/store code
 */
export async function redirectOrNotFound(
  client: ApolloClient,
  configPromise: Parameters<typeof redirectOrNotFoundLib>[1],
  params: Parameters<typeof redirectOrNotFoundLib>[2],
  locale: Parameters<typeof redirectOrNotFoundLib>[3],
): Promise<never> {
  const result = await redirectOrNotFoundLib(client, configPromise, params, locale)

  if ('redirect' in result) {
    redirect(result.redirect.destination)
  }

  notFound()
}
