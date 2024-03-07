import { Trans } from '@lingui/react'
import { Breadcrumbs as BreadcrumbsBase, Link, Typography } from '@mui/material'
import { BreadcrumbsProps } from './BreadcrumbsType'

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs, name, ...breadcrumbsProps } = props

  return (
    <BreadcrumbsBase {...breadcrumbsProps}>
      <Link href='/' underline='hover' color='inherit'>
        <Trans id='Home' />
      </Link>
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb) => (
        <Link {...breadcrumb} />
      ))}
      <Typography color='text.primary'>{breadcrumbs[breadcrumbs.length - 1].children}</Typography>
    </BreadcrumbsBase>
  )
}
