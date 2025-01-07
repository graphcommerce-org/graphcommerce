import { PageMeta } from '@graphcommerce/magento-store'
import type { CmsPageMetaFragment } from './CmsPageMeta.gql'

/** @public */
export function CmsPageMeta(props: CmsPageMetaFragment) {
  const { title, meta_title, meta_description } = props

  return (
    <PageMeta
      title={meta_title ?? title ?? ''}
      metaDescription={meta_description ?? ''}
      metaRobots={['noindex']}
    />
  )
}
