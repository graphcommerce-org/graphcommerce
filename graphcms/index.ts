import { GQLLocale, GQLGetPageNlQuery, GQLGetPageEnQuery } from '../generated/graphql'

export type GraphCmsPage = {
  page: NonNullable<GQLGetPageNlQuery['page']> | NonNullable<GQLGetPageEnQuery['page']>
  locale: GQLLocale
}

export * from './Link'
export * from './PageHead'
