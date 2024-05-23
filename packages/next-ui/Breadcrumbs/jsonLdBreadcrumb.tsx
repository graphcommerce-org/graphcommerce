import type { BreadcrumbsType } from './types'

export function jsonLdBreadcrumb(breadcrumbs: BreadcrumbsType['breadcrumbs']) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement:
      breadcrumbs?.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        name: breadcrumb?.children,
        position: index + 1,
        item: breadcrumb.href,
      })) ?? [],
  }
}
