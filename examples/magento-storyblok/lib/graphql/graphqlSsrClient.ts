import type { FetchPolicy, PreviewConfig } from '@graphcommerce/graphql'
import {
  ApolloClient,
  ApolloLink,
  errorLink,
  fragments,
  graphqlConfig,
  InMemoryCache,
  measurePerformanceLink,
  mergeTypePolicies,
  renewSignal,
} from '@graphcommerce/graphql'
import { getBuiltMesh, MeshApolloLink } from '@graphcommerce/graphql-mesh'
import { storefrontConfig, storefrontConfigDefault } from '@graphcommerce/next-ui'
import type { GetStaticPropsContext } from 'next'
import { i18nSsrLoader } from '../i18n/I18nProvider'

function client(context: GetStaticPropsContext, fetchPolicy: FetchPolicy = 'no-cache') {
  const config = graphqlConfig({
    storefront: storefrontConfig(context.locale) ?? storefrontConfigDefault(),
    ...(context as PreviewConfig),
  })

  return new ApolloClient({
    link: ApolloLink.from([
      ...(process.env.NODE_ENV !== 'production' ? [measurePerformanceLink] : []),
      errorLink,
      ...config.links,
      new MeshApolloLink(getBuiltMesh()),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    ssrMode: true,
    clientAwareness: { name: 'ssr' },
    defaultOptions: {
      preview: context as PreviewConfig,
      query: { errorPolicy: 'all', fetchPolicy },
    },
  })
}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient(context: GetStaticPropsContext) {
  const locale = context.locale ?? storefrontConfigDefault().locale
  i18nSsrLoader(locale)

  if (context.preview || context.draftMode) return client(context, 'no-cache')
  return client(context, 'cache-first')
}

const ssrClient: {
  [locale: string]: { instancedAt: number; client: ApolloClient }
} = {}

export function graphqlSsrClient(context: GetStaticPropsContext) {
  const locale = context.locale ?? storefrontConfigDefault().locale
  i18nSsrLoader(locale)

  if (context.preview || context.draftMode) return client(context, 'no-cache')

  // `undefined` means the signal has not been read yet, which is the state of every pod right after
  // a deploy. Creating the client without invalidating is correct there — a client made now cannot
  // predate a publish — and `renewSignal()` schedules the read that makes the next call decisive.
  const signal = renewSignal()
  const existing = ssrClient[locale]
  if (existing && signal !== undefined && existing.instancedAt < signal) delete ssrClient[locale]

  if (!ssrClient[locale])
    ssrClient[locale] = { instancedAt: Date.now(), client: client(context, 'no-cache') }

  return ssrClient[locale].client
}
