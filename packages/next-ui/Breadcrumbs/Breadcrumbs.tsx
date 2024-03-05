import { Trans } from '@lingui/react'
import {
  Breadcrumbs as BreadcrumbsBase,
  BreadcrumbsProps as BreadcrumbsPropsBase,
  Link,
  LinkProps,
  Typography,
} from '@mui/material'

type BreadcrumbsProps = {
  breadcrumbs: Pick<LinkProps, 'underline' | 'key' | 'color' | 'href' | 'children'>[]
  name?: string | null
} & BreadcrumbsPropsBase

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs, name, ...breadcrumbsProps } = props

  return (
    <BreadcrumbsBase {...breadcrumbsProps}>
      <Link href='/' underline='hover' color='inherit'>
        <Trans id='Home' />
      </Link>
      {breadcrumbs.map((breadcrumb) => (
        <Link {...breadcrumb} />
      ))}
      <Typography color='text.primary'>{name}</Typography>
    </BreadcrumbsBase>
  )
}
