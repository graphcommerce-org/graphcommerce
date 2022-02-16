import { ParsedUrlQuery } from 'querystring'
import { UpPage } from '@graphcommerce/framer-next-pages/types'
// todo: remove references to GraphQL
import { NormalizedCacheObject } from '@graphcommerce/graphql'
import { GetStaticProps as GetStaticPropsNext } from 'next'

type AnyObj = Record<string, unknown>

export type ApolloStateProps = { apolloState: NormalizedCacheObject; up?: UpPage | null }

export type GetStaticProps<
  PL extends AnyObj,
  P extends AnyObj = AnyObj,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = GetStaticPropsNext<P & Omit<PL, 'children'> & ApolloStateProps, Q>
