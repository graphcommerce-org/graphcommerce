import { JsonLd } from 'react-schemaorg'
import { BreadcrumbList, WithContext, ListItem } from 'schema-dts'
import { GraphCmsPageProps } from './GraphCmsPage'
import { Link, getCanonical } from './Link'

function breadcrumbList(
  page: GraphCmsPageProps['page'],
  breadcrumbs: GraphCmsPageProps['breadcrumbs'],
): WithContext<BreadcrumbList> {
  let position = 1
  const itemListElement: ListItem[] = breadcrumbs
    .filter(breadcrumb => {
      if (!breadcrumb?.title || !breadcrumb.url) {
        console.error('Breadcrumb should have a title and url set.', breadcrumb)
        return false
      }
      return true
    })
    .map(breadcrumb => {
      const item: ListItem = {
        '@type': 'ListItem',
        position,
        name: breadcrumb!.title!,
        item: getCanonical(breadcrumb!.url!),
      }
      position += 1
      return item
    })
  itemListElement.push({
    '@type': 'ListItem',
    position,
    name: page!.title!,
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

const Breadcrumbs: React.FC<GraphCmsPageProps> = ({ breadcrumbs, page }) => {
  return (
    <>
      <JsonLd<BreadcrumbList> item={breadcrumbList(page, breadcrumbs)} />
      <ul>
        {breadcrumbs.map(breadcrumb => (
          <li key={breadcrumb!.url!}>
            <Link href={breadcrumb!.url!} metaRobots={breadcrumb!.metaRobots}>
              {breadcrumb?.title}
            </Link>
          </li>
        ))}
        <li>{page?.title}</li>
      </ul>
    </>
  )
}

export { Breadcrumbs }
