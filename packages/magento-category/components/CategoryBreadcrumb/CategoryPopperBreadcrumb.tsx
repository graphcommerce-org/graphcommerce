import { i18n } from '@lingui/core'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'
import { PopperBreadcrumb } from './PopperBreadcrumb'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

export function CategoryPopperBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, name, sx, uid, url_path, ...breadcrumbsProps } = props
  const level = 1

  const composedBreadcrumbs = useMemo(
    () => [
      {
        category_uid: 'home',
        category_name: i18n._(/* i18n */ 'Home'),
        category_url_path: '',
        category_level:
          breadcrumbs && breadcrumbs[0] ? Number(breadcrumbs[0].category_level) - 1 : 0,
      },
      ...(breadcrumbs ?? []),
      {
        category_uid: uid ?? '',
        category_name: name,
        category_url_path: url_path,
        category_level: level,
      },
    ],
    [breadcrumbs, uid, name, level, url_path],
  )

  return <PopperBreadcrumb breadcrumbs={composedBreadcrumbs} uid={uid} {...breadcrumbsProps} />
}
