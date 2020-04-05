import { GetStaticProps as NextGetStaticProps } from 'next'
import { GQLLocale } from '../generated/graphql'

export type GetStaticProps<P> = NextGetStaticProps<P, { url: string; locale: GQLLocale }>
