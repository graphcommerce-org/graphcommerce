import React from 'react'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import Error from 'next/error'
import { ParsedUrlQuery } from 'querystring'
import { GQLLocale } from '../../generated/graphql'
import { Link, GraphCmsPage } from '../../graphcms'
import { FullLayout } from '../../layout/FullLayout'

const BlogSlug: GraphCmsPage = (props) => {
  const { page } = props

  return <div>Not yet implemented {page.title}</div>
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

BlogSlug.layout = FullLayout

export default BlogSlug

export const getStaticPaths = async () => {
  const { getPaths } = await import('../../graphcms/ssg')
  return getPaths('/blog/', GQLLocale.Nl)
}

export const getStaticProps = async (ctx: { params: ParsedUrlQuery }) => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps(`/blog/${ctx.params.slug}`, GQLLocale.Nl)
}
