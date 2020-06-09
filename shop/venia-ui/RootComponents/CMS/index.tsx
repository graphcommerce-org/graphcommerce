/* eslint-disable react/no-danger */
import React from 'react'
import Head from 'next/head'
import Error from 'next/error'
import RichContent from '@magento/venia-ui/lib/components/RichContent'
import MagentoDynamic from 'shop/venia-ui/MagentoDynamic/MagentoDynamic'
import type { GetCmsPageProps } from './getCmsPageProps'

/**
 * Replaces RootComponents/Product
 * https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/RootComponents/CMS/cms.js
 */
const CmsPage: React.FC<GetCmsPageProps> = ({ cmsPage }) => {
  if (!cmsPage) return <Error statusCode={404}>404</Error>
  const { meta_title, meta_description, content_heading } = cmsPage

  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name='description' content={meta_description} />
        <meta name='robots' content='INDEX, FOLLOW' />
      </Head>
      {content_heading && <h1>{content_heading}</h1>}
      {cmsPage.content ? (
        <RichContent html={cmsPage.content} />
      ) : (
        <MagentoDynamic
          loader={() => import('@magento/venia-ui/lib/components/CategoryList')}
          skeleton={(ref) => <div ref={ref}>Loading</div>}
          title='Shop by category'
          id={2}
        />
      )}
    </>
  )
}

export default CmsPage
