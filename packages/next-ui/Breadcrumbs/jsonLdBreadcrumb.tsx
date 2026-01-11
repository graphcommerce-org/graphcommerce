import type { BreadcrumbList } from 'schema-dts'
import { canonicalize } from '../PageMeta/canonicalize'
import type { BreadcrumbsType } from './types'

type CanonicalizeOptions = {
  pathname?: string | null
  locale?: string
}

export function jsonLdBreadcrumb(
  breadcrumbs: BreadcrumbsType['breadcrumbs'],
  options: CanonicalizeOptions,
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ name, href }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalize(options, href),
    })),
  }
}
