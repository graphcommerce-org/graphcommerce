import { NextRouter } from 'next/router'
import type { BreadcrumbList } from 'schema-dts'
import { canonicalize } from '../PageMeta/canonicalize'
import type { BreadcrumbsType } from './types'

export function jsonLdBreadcrumb(
  breadcrumbs: BreadcrumbsType['breadcrumbs'],
  router: NextRouter,
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ name, href }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalize(router, href),
    })),
  }
}
