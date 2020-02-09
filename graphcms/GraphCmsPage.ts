import {
  GQLLocale,
  GQLGetPageNlQuery,
  GQLGetPageEnQuery,
  GQLGetBreadcrumbEnQuery,
  GQLGetBreadcrumbNlQuery,
  GQLGetChildrenNlQuery,
  GQLGetChildrenEnQuery,
} from '../generated/graphql'

export type GraphCmsPage = {
  page: GQLGetPageNlQuery['page'] | GQLGetPageEnQuery['page']
  breadcrumbs: Array<GQLGetBreadcrumbNlQuery['page']> | Array<GQLGetBreadcrumbEnQuery['page']>
  childs: GQLGetChildrenNlQuery['pages'] | GQLGetChildrenEnQuery['pages']
  locale: GQLLocale
}

export function isPageNlHasEn(
  pet: GraphCmsPage['page'],
): pet is NonNullable<GQLGetPageNlQuery['page']> {
  return !!(pet as NonNullable<GQLGetPageNlQuery['page']>).urlEN
}

export function isPageEnHasNl(
  pet: GraphCmsPage['page'],
): pet is NonNullable<GQLGetPageEnQuery['page']> {
  return !!(pet as NonNullable<GQLGetPageEnQuery['page']>).urlNL
}
