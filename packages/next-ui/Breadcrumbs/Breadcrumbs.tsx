import { Trans } from '@lingui/react'
import { Breadcrumbs as BreadcrumbsBase, Link, Typography } from '@mui/material'
import { BreadcrumbsJsonLd } from './BreadcrumbsJsonLd'
import { BreadcrumbsProps } from './BreadcrumbsType'
import { jsonLdBreadcrumb } from './jsonLdBreadcrumb'

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs, ...breadcrumbsProps } = props

  return (
    <>
      {breadcrumbs.length && (
        <BreadcrumbsJsonLd
          breadcrumbs={breadcrumbs}
          render={(bc) => ({
            '@context': 'https://schema.org',
            ...jsonLdBreadcrumb(bc),
          })}
        />
      )}
      <BreadcrumbsBase {...breadcrumbsProps}>
        <Link href='/' underline='hover' color='inherit'>
          <Trans id='Home' />
        </Link>
        {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb) => (
          <Link {...breadcrumb} />
        ))}
        <Typography color='text.primary'>{breadcrumbs[breadcrumbs.length - 1].children}</Typography>
      </BreadcrumbsBase>
    </>
  )
}
