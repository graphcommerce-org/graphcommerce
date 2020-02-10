import { NextPage } from 'next'
import {
  GQLLocale,
  GQLGetPageNlQuery,
  GQLGetPageEnQuery,
  GQLGetBreadcrumbEnQuery,
  GQLGetBreadcrumbNlQuery,
  GQLGetChildrenNlQuery,
  GQLGetChildrenEnQuery,
} from '../generated/graphql'

export type GraphCmsPage = NextPage & {
  getLayout?: (page: GraphCmsPage) => GraphCmsPage
}

export interface GraphCmsPageProps {
  page: GQLGetPageNlQuery['page'] | GQLGetPageEnQuery['page']
  breadcrumbs: Array<GQLGetBreadcrumbNlQuery['page']> | Array<GQLGetBreadcrumbEnQuery['page']>
  childs: GQLGetChildrenNlQuery['pages'] | GQLGetChildrenEnQuery['pages']
  locale: GQLLocale
}

export function isPage(props: GraphCmsPageProps): props is GraphCmsPageProps {
  return props.page !== undefined
}

export function isPageNlHasEn(
  pet: GraphCmsPageProps['page'],
): pet is NonNullable<GQLGetPageNlQuery['page']> {
  return !!(pet as NonNullable<GQLGetPageNlQuery['page']>).urlEN
}

export function isPageEnHasNl(
  pet: GraphCmsPageProps['page'],
): pet is NonNullable<GQLGetPageEnQuery['page']> {
  return !!(pet as NonNullable<GQLGetPageEnQuery['page']>).urlNL
}
