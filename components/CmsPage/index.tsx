/* eslint-disable react/no-danger */
import React from 'react'
import Error from 'next/error'
import CmsPageMeta from 'components/CmsPageMeta'
import CmsPageContent from 'components/CmsPageContent'
import type { GetCmsPageProps } from './getCmsPageProps'

/**
 * Replaces RootComponents/Product
 * https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/RootComponents/CMS/cms.js
 */
const CmsPage: React.FC<GetCmsPageProps> = ({ cmsPage, storeConfig }) => {
  if (!cmsPage) return <Error statusCode={404}>404</Error>

  return (
    <>
      <CmsPageMeta {...cmsPage} {...storeConfig} />
      <CmsPageContent {...cmsPage} />
    </>
  )
}

export default CmsPage
