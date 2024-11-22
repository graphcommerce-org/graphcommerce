import type { UpPage } from '@graphcommerce/framer-next-pages/types'
// todo: remove references to GraphQL
// eslint-disable-next-line import/no-extraneous-dependencies
import type { NormalizedCacheObject } from '@graphcommerce/graphql'
import type {
  GetServerSideProps as GetServerSidePropsNext,
  GetStaticProps as GetStaticPropsNext,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'

type AnyObj = Record<string, unknown>

export type ApolloStateProps = { apolloState: NormalizedCacheObject; up?: UpPage | null }

export type GetStaticProps<
  PL extends AnyObj,
  P extends AnyObj = AnyObj,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = GetStaticPropsNext<P & Omit<PL, 'children'> & ApolloStateProps, Q>

export type GetServerSideProps<
  PL extends AnyObj,
  P extends AnyObj = AnyObj,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = GetServerSidePropsNext<P & Omit<PL, 'children'> & ApolloStateProps, Q>
