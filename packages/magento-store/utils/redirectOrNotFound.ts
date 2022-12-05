import { ParsedUrlQuery } from 'querystring'
import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { Redirect } from 'next'
import { defaultLocale } from '../localeToStore'
import { HandleRedirectDocument } from './HandleRedirect.gql'

export type RedirectOr404Return = Promise<
  | { redirect: Redirect; revalidate?: number | boolean }
  | { notFound: true; revalidate?: number | boolean }
>

const notFound = () => ({ notFound: true, revalidate: 60 * 20 } as const)

const redirect = (to: string, permanent: boolean, locale?: string) => {
  const prefix = locale === defaultLocale() ? '' : `/${locale}`
  const destination = `${prefix}${to}`

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`${permanent ? 'Permanent' : 'Temporary'} redirect to ${to}`)
    // eslint-disable-next-line no-param-reassign
    permanent = false
  }

  return { redirect: { destination, permanent }, revalidate: 60 * 20 }
}

export async function redirectOrNotFound(
  client: ApolloClient<NormalizedCacheObject>,
  params?: ParsedUrlQuery,
  locale?: string,
): RedirectOr404Return {
  // Create a URL from the params provided.
  const url = Object.values(params ?? {})
    .map((v) => (Array.isArray(v) ? v.join('/') : v))
    .join('/')

  // There is a URL, so we need to check if it can be found in the database.
  const { route } = (await client.query({ query: HandleRedirectDocument, variables: { url } })).data
  const permanent = route?.redirect_code === 301

  // Add special handling for the homepage.
  if (route?.url_key && route.__typename.endsWith('Product')) {
    if (process.env.NEXT_PUBLIC_SINGLE_PRODUCT_PAGE !== '1') {
      console.warn('Redirects are only supported for NEXT_PUBLIC_SINGLE_PRODUCT_PAGE')
    }
    return redirect(`/p/${route.url_key}`, permanent, locale)
  }

  // The default URL for categories or CMS pages is handled by the pages/[...url].tsx file.
  if (route?.url_key) return redirect(`/${route.url_key}`, permanent, locale)

  // No route found, so return a 404.
  return notFound()
}
