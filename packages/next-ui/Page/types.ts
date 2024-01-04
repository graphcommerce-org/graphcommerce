/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParsedUrlQuery } from 'querystring'
import { UpPage } from '@graphcommerce/framer-next-pages/types'
// todo: remove references to GraphQL
// eslint-disable-next-line import/no-extraneous-dependencies
import { NormalizedCacheObject } from '@graphcommerce/graphql'
import {
  GetStaticProps as GetStaticPropsNext,
  GetServerSideProps as GetServerSidePropsNext,
} from 'next'

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

// Joshua's area

type MetaRobots = 'INDEX_FOLLOW' | 'INDEX_NOFOLLOW' | 'NOINDEX_FOLLOW' | 'NOINDEX_NOFOLLOW'

type RowColumnOneVariants = 'Default' | 'Message'
type RowLinksVariants = 'Inline' | 'ImageLabelSwiper' | 'LogoSwiper' | 'Usps'
type RowProductVariants =
  | 'Backstory'
  | 'Feature'
  | 'FeatureBoxed'
  | 'Grid'
  | 'Related'
  | 'Reviews'
  | 'Specs'
  | 'Upsells'
  | 'Swipeable'

export type Page = {
  __typename: 'Page'
  id: string
  title?: string | null
  metaTitle: string
  metaDescription: string
  metaRobots: MetaRobots
  url: string
  author?: string | null
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  date?: any | null
  relatedPages: Array<{ title?: string | null; url: string }>
  asset?: {
    url: string
    width?: number | null
    height?: number | null
    mimeType?: string | null
    size?: number | null
    alt?: string | null
  } | null
  content: Array<unknown>
}

export type Pages = {
  pages: Array<Page>
}

// Joshua's area end
