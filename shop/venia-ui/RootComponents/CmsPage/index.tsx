/* eslint-disable react/no-danger */
import React from 'react'
import Head from 'next/head'
import { Typography } from '@material-ui/core'
import Error from 'next/error'
import { GetCmsPageProps } from './getCmsPageProps'

const CmsPage: React.FC<GetCmsPageProps> = ({ cmsPage }) => {
  if (!cmsPage) return <Error statusCode={404}>404</Error>

  return (
    <>
      <Head>
        <title>{cmsPage.meta_title}</title>
        <meta name='description' content={cmsPage.meta_description} />
        <meta name='robots' content='INDEX, FOLLOW' />
      </Head>
      <Typography variant='h1'>{cmsPage.content_heading ?? cmsPage.title}</Typography>
      <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} />
    </>
  )
}

export default CmsPage
