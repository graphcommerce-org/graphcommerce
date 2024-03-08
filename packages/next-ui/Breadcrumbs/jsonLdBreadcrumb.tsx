import { BreadcrumbsProps } from './types'

export function jsonLdBreadcrumb(props: BreadcrumbsProps['breadcrumbs']) {
  const [...breadcrumbs] = props

  return {
    '@type': 'BreadcrumbList',
    itemListElement:
      breadcrumbs?.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        name: breadcrumb?.children,
        position: index + 1,
        item: `${import.meta.graphCommerce.canonicalBaseUrl}/${breadcrumb?.href}`,
      })) ?? [],
  }
}
