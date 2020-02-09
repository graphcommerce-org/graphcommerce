import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import Error from 'next/error'
import { ParsedUrlQuery } from 'querystring'
import { GQLLocale } from '../../generated/graphql'
import { GraphCmsPage, PageMeta, Link, isPageNlHasEn, isPageEnHasNl } from '../../graphcms'
import { Breadcrumbs } from '../../graphcms/Breadcrumbs'

const BlogSlug: React.FC<GraphCmsPage> = graphCmsPage => {
  const { page } = graphCmsPage
  if (!page || !page.blogPost) {
    return <Error statusCode={404} title='page.blogPost not found.' />
  }

  return (
    <div>
      <PageMeta {...graphCmsPage} />
      <Breadcrumbs {...graphCmsPage} />
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
      {isPageNlHasEn(page) && (
        <Link metaRobots={page.metaRobots} href={page.urlEN!}>
          Read in English
        </Link>
      )}
      {isPageEnHasNl(page) && (
        <Link metaRobots={page.metaRobots} href={page.urlNL!}>
          Read in Dutch
        </Link>
      )}

      {/* eslint-disable react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: page.blogPost?.content! }} />
    </div>
  )
}

export default BlogSlug

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticPaths = async () => {
  const { getStaticPaths } = await import('../../graphcms/ssg')
  return getStaticPaths('blog', GQLLocale.Nl)
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (ctx: { params: ParsedUrlQuery }) => {
  const { getProps } = await import('../../graphcms/ssg')
  return getProps(`blog/${ctx.params.slug}`, GQLLocale.Nl)
}
