import { Trans } from '@lingui/react'
import { Breadcrumbs as BreadcrumbsBase, Link, Typography } from '@mui/material'
import { BreadcrumbsJsonLd } from './BreadcrumbsJsonLd'
import { jsonLdBreadcrumb } from './jsonLdBreadcrumb'
import { BreadcrumbsProps } from './types'

export function Breadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs, name, baseUrl, sx } = props

  return (
    <>
      {breadcrumbs.length && (
        <BreadcrumbsJsonLd
          baseUrl={baseUrl}
          breadcrumbs={breadcrumbs}
          render={(bc, url) => ({
            '@context': 'https://schema.org',
            ...jsonLdBreadcrumb(bc, url),
          })}
        />
      )}
      <BreadcrumbsBase sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}>
        <Link href='/' underline='hover' color='inherit'>
          <Trans id='Home' />
        </Link>
        {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb) => (
          <Link {...breadcrumb} />
        ))}
        <Typography color='text.primary'>{name}</Typography>
      </BreadcrumbsBase>
    </>
  )
}
