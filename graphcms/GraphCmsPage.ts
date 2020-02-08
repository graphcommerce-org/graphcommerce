import { GQLLocale, GQLGetPageNlQuery, GQLGetPageEnQuery } from '../generated/graphql'

export type GraphCmsPage = {
  page: NonNullable<GQLGetPageNlQuery['page']> | NonNullable<GQLGetPageEnQuery['page']>
  locale: GQLLocale
}

export function isPageNl(pet: GraphCmsPage['page']): pet is NonNullable<GQLGetPageNlQuery['page']> {
  return (pet as NonNullable<GQLGetPageNlQuery['page']>).urlEN !== undefined
}

export function isPageEn(pet: GraphCmsPage['page']): pet is NonNullable<GQLGetPageEnQuery['page']> {
  return (pet as NonNullable<GQLGetPageEnQuery['page']>).urlNL !== undefined
}
