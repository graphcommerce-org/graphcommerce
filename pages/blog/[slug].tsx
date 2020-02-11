import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import Error from 'next/error'
import { ParsedUrlQuery } from 'querystring'
import { GQLLocale } from '../../generated/graphql'
import { Link, GraphCmsPage } from '../../graphcms'
import { FullLayout } from '../../layout'

const BlogSlug: GraphCmsPage = props => {
  const { page } = props
  if (!page || !page.blogPost) {
    return <Error statusCode={404} title='page.blogPost not found.' />
  }

  return (
    <div>
      <JsonLd<BlogPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: page.title!,
          image: page.blogPost.image?.url,
          datePublished: page.blogPost.publicPublishedAt,
        }}
      />
      <h1>
        <Link metaRobots={page.metaRobots} href={page.url!}>
          {page.title}
        </Link>
      </h1>

      {/* eslint-disable react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: page.blogPost?.content! }} />
    </div>
  )
}

BlogSlug.getLayout = FullLayout

export default BlogSlug

// eslint-disable-next-line @typescript-eslint/camelcase
// export const unstable_getStaticPaths = async () => {
//   const { getStaticPaths } = await import('../../graphcms/ssg')
//   return getStaticPaths('/blog', GQLLocale.Nl)
// }

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (ctx: { params: ParsedUrlQuery }) => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps(`/blog/${ctx.params.slug}`, GQLLocale.Nl)
}
