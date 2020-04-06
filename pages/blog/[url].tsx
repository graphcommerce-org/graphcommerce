import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GQLLocale } from '../../generated/graphql'
import LayoutFull, {
  getStaticProps as getPageLayoutData,
  PageLayoutProps,
} from '../../components/PageLayout'
import { getStaticProps as getBreadcrumbData } from '../../components/Breadcrumb'
import { GetStaticProps } from '../../lib/getStaticProps'
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
  // if (!page || !page.blogPost) {
  //   return <Error statusCode={404} title='page.blogPost not found.' />
  // }

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

// export const getStaticPaths = async () => {
//   const { getPaths } = await import('../../components/PageLayout/server/ssg')
//   return getPaths('/blog/', GQLLocale.Nl)
// }

export const getStaticPaths = getStaticPathsFactory('/blog/', GQLLocale.Nl)

export const getStaticProps: GetStaticProps<PageLayoutProps> = async (ctx) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = { url: `/blog/${ctx.params.url}`, locale: GQLLocale.Nl }

  const data = await Promise.all([
    getPageLayoutData().then((obj) => obj.default({ params })),
    getBreadcrumbData().then((obj) => obj.default({ params })),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
