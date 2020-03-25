import {
  GQLLocale,
  GQLGetPageQuery,
  GQLGetBreadcrumbQuery,
  GQLGetChildrenQuery,
} from '../generated/graphql'
import { LayoutPage } from '../lib/layout'

export type GraphCmsPage = LayoutPage<GraphCmsPageProps>

export type GraphCmsPageProps = {
  page: GQLGetPageQuery['pages'][0]
  breadcrumbs: Array<GQLGetBreadcrumbQuery['pages'][0]>
  childs: GQLGetChildrenQuery['pages']
  locale: GQLLocale
}
