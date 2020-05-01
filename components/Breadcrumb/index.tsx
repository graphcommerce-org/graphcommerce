import React from 'react'
import { JsonLd } from 'react-schemaorg'
import { BreadcrumbList, WithContext, ListItem } from 'schema-dts'
import { Breadcrumbs, Typography } from '@material-ui/core'
import Link from '../Link'
import parentUrls from './parentUrls'
import { GQLGetStaticProps } from '../../lib/staticParams'

const breadcrumbList = (breadcrumbs: GQLBreadcrumbFragment[]): WithContext<BreadcrumbList> => {
  let position = 1
  const itemListElement: ListItem[] = breadcrumbs
    .filter((breadcrumb) => {
      if (!breadcrumb.title || !breadcrumb.url) {
        console.error('Breadcrumb should have a title and url set.', breadcrumb)
        return false
      }
      return true
    })
    .map((breadcrumb, index) => {
      const item: ListItem = {
        '@type': 'ListItem',
        position,
        name: breadcrumb.title,
        ...(index === breadcrumbs.length - 1 && { link: breadcrumb.url }),
      }
      position += 1
      return item
    })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

const Breadcrumb: React.FC<{ breadcrumbs: GQLBreadcrumbFragment[] }> = ({ breadcrumbs }) => {
  return (
    <>
      <JsonLd<BreadcrumbList> item={breadcrumbList(breadcrumbs)} />
      <Breadcrumbs aria-label='breadcrumb'>
        {breadcrumbs.map((breadcrumb, index) =>
          index === breadcrumbs.length - 1 ? (
            <Typography color='textPrimary' key={breadcrumb.id}>
              {breadcrumb.title}
            </Typography>
          ) : (
            <Link key={breadcrumb.id} href={breadcrumb.url} metaRobots={breadcrumb.metaRobots}>
              {breadcrumb.title}
            </Link>
          ),
        )}
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb

export const getStaticProps: GQLGetStaticProps<GQLGetBreadcrumbQuery> = async ({ url, locale }) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetBreadcrumbDocument } = await import('../../generated/apollo')

  const { data } = await client().query<GQLGetBreadcrumbQuery, GQLGetBreadcrumbQueryVariables>({
    query: GetBreadcrumbDocument,
    variables: { urls: [...parentUrls(url, locale), url], locale },
  })
  return data
}
