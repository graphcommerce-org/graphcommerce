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

type DeepNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export function hasLayout(Component: any): Component is DeepNonNullable<GraphCmsPage> {
  return Component.getLayout !== undefined
}

export type GraphCmsPage = NextPage<GraphCmsPageProps> & {
  getLayout?: (page: GraphCmsPage, props: GraphCmsPageProps) => JSX.Element
}

export type GraphCmsPageProps = {
  page: GQLGetPageNlQuery['page'] | GQLGetPageEnQuery['page']
  breadcrumbs: Array<GQLGetBreadcrumbNlQuery['page']> | Array<GQLGetBreadcrumbEnQuery['page']>
  childs: GQLGetChildrenNlQuery['pages'] | GQLGetChildrenEnQuery['pages']
  locale: GQLLocale
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
