import {
  ApolloClient,
  ApolloLink,
  errorLink,
  measurePerformanceLink,
  InMemoryCache,
  fragments,
  graphqlConfig,
  mergeTypePolicies,
  FetchPolicy,
  DefaultOptions,
  PreviewConfig,
  NormalizedCacheObject,
} from '@graphcommerce/graphql'
import { MeshApolloLink, getBuiltMesh } from '@graphcommerce/graphql-mesh'
import { storefrontConfig, storefrontConfigDefault } from '@graphcommerce/next-ui'
import { GetStaticPropsContext } from 'next'
import { i18nSsrLoader } from '../i18n/I18nProvider'

function client(context: GetStaticPropsContext, fetchPolicy: FetchPolicy = 'no-cache') {
  const config = graphqlConfig({
    storefront: storefrontConfig(context.locale) ?? storefrontConfigDefault(),
    ...(context as PreviewConfig),
  })

  return new ApolloClient({
    link: ApolloLink.from([
      ...(process.env.NODE_ENV === 'production' ? [measurePerformanceLink] : []),
      errorLink,
      ...config.links,
      new MeshApolloLink(getBuiltMesh()),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    ssrMode: true,
    name: 'ssr',
    defaultOptions: {
      preview: context as PreviewConfig,
      query: { errorPolicy: 'all', fetchPolicy },
    } as DefaultOptions,
  })
}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient(context: GetStaticPropsContext) {
  if (context.preview || context.draftMode) return client(context, 'no-cache')
  return client(context, 'cache-first')
}

const ssrClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

export function graphqlSsrClient(context: GetStaticPropsContext) {
  if (context.preview || context.draftMode) return client(context, 'no-cache')
  const locale = context.locale ?? storefrontConfigDefault().locale
  i18nSsrLoader(locale)

  // Create a client if it doesn't exist for the locale.
  if (!ssrClient[locale]) ssrClient[locale] = client(context, 'no-cache')

  return ssrClient[locale]
}
