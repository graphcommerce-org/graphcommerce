import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import { GQLLocale } from '../../generated/graphql'
import LayoutFull, { PageLayoutProps } from '../../components/PageLayout'
import extractParams, { StaticPageParams } from '../../lib/staticParams'
import { LayoutPage } from '../../lib/layout'
import getStaticPathsFactory from '../../components/PageLayout/server/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'

const BlogView: LayoutPage<PageLayoutProps> = ({ pages }) => {
  if (!pages[0]) return <></>

  return (
    <>
      <Typography variant='h1'>{pages[0].title}</Typography>
      <ContentRenderer content={pages[0].content} />
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

export const getStaticPaths = getStaticPathsFactory('/blog/', GQLLocale.Nl)

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/blog/')
  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
