import { BreadcrumbsProps } from '@material-ui/core'
import BackNavFab from 'components/AppShell/BackNavFab'
import React from 'react'

type CategoryBreadcrumbProps = GQLCategoryBreadcrumbFragment & BreadcrumbsProps

export default function CategoryBreadcrumb(props: CategoryBreadcrumbProps) {
  const { breadcrumbs } = props

  if (!breadcrumbs) {
    return <BackNavFab href='/'>Home</BackNavFab>
  }

  const breadcrumb = breadcrumbs[breadcrumbs.length - 1]
  if (!breadcrumb?.category_id || !breadcrumb?.category_url_path || !breadcrumb?.category_name)
    return null

  return (
    <BackNavFab href={`/${breadcrumb.category_url_path}`}>{breadcrumb.category_name}</BackNavFab>
  )
}
