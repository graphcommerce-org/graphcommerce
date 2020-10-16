import { ParsedUrlQuery } from 'querystring'
import { NormalizedCacheObject } from '@apollo/client'
import { GetStaticPaths, GetStaticProps as GetStaticPropsNext } from 'next'
import { AppProps as NextAppProps } from 'next/app'

type AnyObj = Record<string, unknown>

export type BasePageLayoutComponentProps = GQLResolveUrlQuery &
  GQLLayoutHeaderQuery & { title: string }

type BasePage<T = AnyObj> = React.FC<BasePageLayoutComponentProps & T>

type ApolloStateProps = { apolloState: NormalizedCacheObject }

export type PageLayoutFC<T = AnyObj> = BasePage<T>

export type GetProps<T extends React.FC> = Omit<Parameters<T>['0'], 'children'>

export type PageFC<TProps = AnyObj, TPropsLayout = AnyObj> = BasePage<TProps> & {
  Layout: PageLayoutFC<TPropsLayout>
}

export type PageStaticPropsFn<
  TPage extends PageFC,
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = GetStaticPropsNext<GetProps<TPage> & GetProps<TPage['Layout']> & ApolloStateProps, Q>

export type PageStaticPathsFn<Q extends ParsedUrlQuery = ParsedUrlQuery> = GetStaticPaths<Q>

/**
 * Used by _app
 */
export type AppProps = Omit<NextAppProps, 'Component' | 'pageProps'> & {
  Component: PageFC
  pageProps: ApolloStateProps & AnyObj
}
