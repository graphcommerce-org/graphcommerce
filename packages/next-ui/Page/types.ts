import type { ParsedUrlQuery } from 'querystring'
import type { UpPage } from '@graphcommerce/framer-next-pages'
import type {
  GetServerSideProps as GetServerSidePropsNext,
  GetStaticProps as GetStaticPropsNext,
} from 'next'

type AnyObj = Record<string, unknown>

export type ApolloStateProps = { apolloState: unknown; up?: UpPage | null }

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
