import { BreadcrumbsProps } from '@material-ui/core'
import BackButton from 'components/AppShell/BackButton'
import React from 'react'

type CategoryBreadcrumbProps = GQLCategoryBreadcrumbFragment & BreadcrumbsProps

export default function CategoryBreadcrumb(props: CategoryBreadcrumbProps) {
  const { breadcrumbs } = props

  if (!breadcrumbs) {
    return <BackButton href='/'>Home</BackButton>
  }

  const breadcrumb = breadcrumbs[breadcrumbs.length - 1]
  if (!breadcrumb?.category_id || !breadcrumb?.category_url_path || !breadcrumb?.category_name)
    return null

  return (
    <BackButton href={`/${breadcrumb.category_url_path}`}>{breadcrumb.category_name}</BackButton>
  )
}
