import { PageMeta } from '@graphcommerce/magento-store'
import type { CmsPageMetaFragment } from './CmsPageMeta.gql'

/** @public */
export function CmsPageMeta(props: CmsPageMetaFragment) {
  const { title, meta_title, meta_description, meta_keywords } = props

  return (
    <PageMeta
      title={meta_title ?? title}
      metaDescription={meta_description}
      metaKeywords={meta_keywords}
      metaRobots={['noindex']}
    />
  )
}
