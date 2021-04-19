import { ParsedUrlQuery } from 'querystring'
import { NormalizedCacheObject } from '@apollo/client'
import { GetStaticProps as GetStaticPropsNext } from 'next'
import { AppProps as NextAppProps } from 'next/app'

type AnyObj = Record<string, unknown>

type ApolloStateProps = { apolloState: NormalizedCacheObject }

export type GetStaticProps<
  PL extends AnyObj,
  P extends AnyObj = AnyObj,
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = GetStaticPropsNext<P & Omit<PL, 'children'> & ApolloStateProps, Q>

/** Used by _app */
export type AppProps = Omit<NextAppProps, 'pageProps'> & {
  pageProps: ApolloStateProps
}
