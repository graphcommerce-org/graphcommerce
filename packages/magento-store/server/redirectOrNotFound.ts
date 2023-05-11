import { ParsedUrlQuery } from 'querystring'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { nonNullable, isTypename } from '@graphcommerce/next-ui'
import { Redirect } from 'next'
import { defaultLocale } from '../localeToStore'
import { HandleRedirectDocument } from './HandleRedirect.gql'
import { storeConfig } from './storeConfig'
import { urlFromParams } from '@graphcommerce/next-ui/server'

export type RedirectOr404Return = Promise<
  | { redirect: Redirect; revalidate?: number | boolean }
  | { notFound: true; revalidate?: number | boolean }
>

const notFound = (from: string, reason: string) => {
  console.log(`[redirectOrNotFound: /${from}] ${reason}`)
  return { notFound: true, revalidate: 60 * 20 } as const
}

const redirect = (from: string, to: string, permanent: boolean, locale?: string) => {
  const prefix = locale === defaultLocale() ? '' : `/${locale}`
  const destination = `${prefix}${to}`

  // eslint-disable-next-line no-console
  console.log(
    `[redirectOrNotFound: /${prefix}/${from}] ${
      permanent ? 'Permanent' : 'Temporary'
    } redirect to ${destination}`,
  )
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-param-reassign
    permanent = false
  }

  return { redirect: { destination, permanent }, revalidate: 60 * 20 }
}

export async function redirectOrNotFound(
  params?: ParsedUrlQuery,
  locale?: string,
): RedirectOr404Return {
  // Create a URL from the params provided.
  const from = urlFromParams(params)

  try {
    // Get the configured suffixes from the store config
    const { product_url_suffix, category_url_suffix } = await storeConfig()

    const candidates = new Set([from])

    // If the incomming URL contains a suffix, we check if the URL without the suffix exists
    // if the incomming URL does not contain a suffix, we check if the URL with the suffix exists
    const suffixes = [product_url_suffix, category_url_suffix].filter(nonNullable)
    suffixes.forEach((suffix) => {
      candidates.add(from.endsWith(suffix) ? from.slice(0, -suffix.length) : `${from}${suffix}`)
    })

    const routePromises = [...candidates].map(
      async (url) =>
        (
          await graphqlQuery(HandleRedirectDocument, {
            variables: { url },
            fetchPolicy: 'no-cache',
          })
        ).data,
    )

    const routeData = (await Promise.all(routePromises)).find(nonNullable)

    if (!routeData?.route)
      return notFound(
        from,
        `no redirect candidates found for these paths: ${[...candidates.values()].join(',')}`,
      )

    const redirectUrl =
      routeData?.route?.relative_url && routeData?.route?.relative_url !== from
        ? routeData.route.relative_url
        : undefined

    // There is a URL, so we need to check if it can be found in the database.
    const permanent = routeData.route?.redirect_code === 301

    if (
      isTypename(routeData.route, [
        'ConfigurableProduct',
        'BundleProduct',
        'SimpleProduct',
        'VirtualProduct',
        'DownloadableProduct',
        'GroupedProduct',
      ])
    ) {
      const productRoute = import.meta.graphCommerce.productRoute ?? '/p/'

      if (redirectUrl) return redirect(from, `${productRoute}${redirectUrl}`, permanent, locale)

      const url_key = routeData.route?.url_key
      if (!routeData.products?.items?.find((i) => i?.url_key === url_key))
        return notFound(from, `Route found, but product isn't returned from products query`)

      return redirect(from, `${productRoute}${url_key}`, true, locale)
    }

    if (redirectUrl) return redirect(from, `/${redirectUrl}`, permanent, locale)

    return notFound(from, `Route found, but no redirect URL`)
  } catch (e) {
    if (e instanceof Error) {
      return notFound(from, `Error while redirecting: ${e.message}`)
    }
    console.log(e)
    return notFound(from, `Error while redirecting`)
  }
}
