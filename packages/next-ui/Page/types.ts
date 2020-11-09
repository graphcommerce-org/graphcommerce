import { ParsedUrlQuery } from 'querystring'
import { NormalizedCacheObject } from '@apollo/client'
import { GetStaticPaths as GetStaticPathsNext, GetStaticProps as GetStaticPropsNext } from 'next'
import { AppProps as NextAppProps } from 'next/app'

type AnyObj = Record<string, unknown>

type ApolloStateProps = { apolloState: NormalizedCacheObject }

export type PageFC<P extends AnyObj = AnyObj, PL extends AnyObj = AnyObj> = React.FC<P> & {
  Layout: React.FC<PL>
}

export type GetStaticProps<
  PL extends AnyObj,
  P extends AnyObj = AnyObj,
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = GetStaticPropsNext<P & PL & ApolloStateProps, Q>

export type GetStaticPaths<Q extends ParsedUrlQuery = ParsedUrlQuery> = GetStaticPathsNext<Q>

/**
 * Used by _app
 */
export type AppProps = Omit<NextAppProps, 'Component' | 'pageProps'> & {
  Component: PageFC
  pageProps: ApolloStateProps
}
