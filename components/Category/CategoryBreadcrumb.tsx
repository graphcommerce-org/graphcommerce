import { BreadcrumbsProps } from '@material-ui/core'
import BreadcrumbFab from 'components/Header/BreadcrumbFab'
import React from 'react'

type CategoryBreadcrumbProps = GQLCategoryBreadcrumbFragment & BreadcrumbsProps

export default function CategoryBreadcrumb(props: CategoryBreadcrumbProps) {
  const { breadcrumbs } = props

  if (!breadcrumbs) {
    return <BreadcrumbFab href='/'>Home</BreadcrumbFab>
  }

  const breadcrumb = breadcrumbs[breadcrumbs.length - 1]
  if (!breadcrumb?.category_id || !breadcrumb?.category_url_path || !breadcrumb?.category_name)
    return null

  return (
    <BreadcrumbFab href={`/${breadcrumb.category_url_path}`}>
      {breadcrumb.category_name}
    </BreadcrumbFab>
  )
}
