import fragments from '@graphcommerce/graphql/generated/fragments.json'
import { isTypename, nonNullable } from '@graphcommerce/next-ui'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { notFound, redirect } from 'next/navigation'
import type { HandleRedirectQuery } from '../graphql/HandleRedirect.gql'
import { HandleRedirectDocument } from '../graphql/HandleRedirect.gql'
import type { StoreConfigQuery } from '../graphql/StoreConfig.gql'

type ProductTypes = (typeof fragments.possibleTypes.ProductInterface)[number]
const productInterfaceTypes = fragments.possibleTypes.ProductInterface as ProductTypes[]

/**
 * Redirects to the correct URL or triggers a 404 for App Router pages. This function never returns
 * normally - it always throws (either a redirect or notFound).
 *
 * This is the App Router equivalent of the Pages Router's `redirectOrNotFound` utility. Instead of
 * returning { notFound: true } or { redirect: ... }, it calls the Next.js navigation functions
 * directly.
 *
 * @param client - Apollo client instance
 * @param storeConfig - Store config data (for URL suffixes)
 * @param urlParts - URL parts from the dynamic route params
 * @param store - Store code for URL prefix
 */
export async function redirectOrNotFound(
  client: ApolloClient<NormalizedCacheObject>,
  storeConfig: StoreConfigQuery['storeConfig'],
  urlParts: string | string[],
  store: string,
): Promise<never> {
  // Create a URL from the params provided
  const from = Array.isArray(urlParts) ? urlParts.join('/') : urlParts

  try {
    // Get the configured suffixes from the store config
    const { product_url_suffix, category_url_suffix } = storeConfig ?? {}

    const candidates = new Set([from])

    // If the incoming URL contains a suffix, we check if the URL without the suffix exists
    // if the incoming URL does not contain a suffix, we check if the URL with the suffix exists
    const suffixes = [product_url_suffix, category_url_suffix].filter(nonNullable)
    suffixes.forEach((suffix) => {
      candidates.add(from.endsWith(suffix) ? from.slice(0, -suffix.length) : `${from}${suffix}`)
    })

    // Handle the case where we transition from using the default .html suffix, to not using one
    if (from.endsWith('.html')) {
      candidates.add(from.slice(0, -'.html'.length))
    }

    const routePromises = [...candidates].filter(Boolean).map(async (url) => {
      const result = await client.query({
        query: HandleRedirectDocument,
        variables: { url },
        fetchPolicy: 'no-cache',
      })
      return result.data
    })

    const routeDataArray = (await Promise.all(routePromises)).filter(nonNullable)

    const routeData: HandleRedirectQuery = Object.assign(
      {},
      ...routeDataArray.map((result) => {
        if (!result.route) delete result.route
        return result
      }),
    )

    if (!routeData?.route) {
      console.info(
        `[redirectOrNotFound: /${from}] No redirect candidates found for: ${[...candidates.values()].join(',')}`,
      )
      notFound()
    }

    const redirectUrl =
      routeData?.route?.relative_url && routeData?.route?.relative_url !== from
        ? routeData.route.relative_url
        : undefined

    // For implicit redirects, always use permanent, otherwise use the given redirect type
    const permanent = !routeData.route?.redirect_code || routeData.route?.redirect_code === 301

    if (redirectUrl) {
      const productPath = `/p/${redirectUrl}`
      const destination = isTypename(routeData.route, productInterfaceTypes)
        ? `/${store}${productPath}`
        : `/${store}/${redirectUrl}`

      console.info(
        `[redirectOrNotFound: /${store}/${from}] ${permanent ? 'Permanent' : 'Temporary'} redirect to ${destination}`,
      )

      // In App Router, redirect() throws a special error that Next.js catches
      redirect(destination)
    }

    // Route found but no redirect needed - this shouldn't happen normally
    // as the page should have found the data
    console.info(`[redirectOrNotFound: /${from}] Route found, but no redirect URL`)
    notFound()
  } catch (e) {
    // Check if this is a redirect "error" (Next.js uses this pattern)
    if (e && typeof e === 'object' && 'digest' in e) {
      throw e // Re-throw redirect "errors"
    }

    if (e instanceof Error) {
      console.info(`[redirectOrNotFound: /${from}] Error while redirecting: ${e.message}`)
    } else {
      console.info(`[redirectOrNotFound: /${from}] Error while redirecting`)
    }
    notFound()
  }
}
