import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../../components/PageLayout'
import extractParams, { StaticPageParams } from '../../lib/staticParams'
import getStaticPathsFactory from '../../lib/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'

const BlogView: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <Typography variant='h1'>{page.title}</Typography>
      <ContentRenderer content={page.content} />
    </>
  )

  // return (
  //   <div>
  //     <JsonLd<BlogPosting>
  //       item={{
  //         '@context': 'https://schema.org',
  //         '@type': 'BlogPosting',
  //         headline: page.metaTitle!,
  //         image: page.blogPost.image?.url,
  //         datePublished: page.blogPost.publicPublishedAt,
  //       }}
  //     />
  //     <h1>
  //       <Link metaRobots={page.metaRobots!} href={page.url!}>
  //         {page.breadcrumbTitle}
  //       </Link>
  //     </h1>

  //     {/* eslint-disable react/no-danger */}
  //     <div dangerouslySetInnerHTML={{ __html: page.blogPost?.content! }} />
  //   </div>
  // )
}

BlogView.layout = LayoutFull

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/blog/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/blog/')
  const { getStaticProps: get } = await import('../../components/PageLayout')
  return { props: await get(params) }
}
