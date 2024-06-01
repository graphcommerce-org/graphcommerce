import { Breadcrumbs } from '@graphcommerce/next-ui'
import { BreadcrumbsJsonLd } from '@graphcommerce/next-ui/Breadcrumbs/BreadcrumbsJsonLd'
import { jsonLdBreadcrumb } from '@graphcommerce/next-ui/Breadcrumbs/jsonLdBreadcrumb'
import { BreadcrumbsProps } from '@mui/material'
import { useRouter } from 'next/router'
import type { BreadcrumbList } from 'schema-dts'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'
import { categoryToBreadcrumbs } from './categoryToBreadcrumbs'

export type CategoryBreadcrumbsProps = Omit<BreadcrumbsProps, 'children'> & {
  category?: CategoryBreadcrumbFragment
}

export function CategoryBreadcrumbs(props: CategoryBreadcrumbsProps) {
  const { category, sx, ...breadcrumbsProps } = props
  const router = useRouter()

  if (!category) return null

  const breadcrumbs = categoryToBreadcrumbs(category)

  return (
    <>
      <BreadcrumbsJsonLd<BreadcrumbList>
        breadcrumbs={breadcrumbs}
        render={(bc) => ({ '@context': 'https://schema.org', ...jsonLdBreadcrumb(bc, router) })}
      />
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        {...breadcrumbsProps}
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
      />
    </>
  )
}
