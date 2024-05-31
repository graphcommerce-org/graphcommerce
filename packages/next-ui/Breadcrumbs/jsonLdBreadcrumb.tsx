import { NextRouter } from 'next/router'
import type { BreadcrumbList } from 'schema-dts'
import { canonicalize } from '../PageMeta/PageMeta'
import { filterNonNullableKeys } from '../RenderType'
import type { BreadcrumbsType } from './types'

export function jsonLdBreadcrumb(
  breadcrumbs: BreadcrumbsType['breadcrumbs'],
  router: NextRouter,
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: filterNonNullableKeys(breadcrumbs, ['href']).map(({ name, href }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalize(router, href),
    })),
  }
}
