/* eslint-disable react/no-danger */
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import Error from 'next/error'
import { GraphCmsPageHead } from '../../components/GraphCms/PageHead'
import { GraphCmsLink } from '../../components/GraphCms/Link'
import { GraphCmsPage, GetStaticProps } from '../../lib/graphcms'

const Page: React.FC<GraphCmsPage> = ({ page, language, slug }) => {
  if (!page?.blogPost) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <GraphCmsPageHead page={page} />
      <JsonLd<BlogPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: page.blogPost.title!,
          image: page.blogPost.image?.url,
          datePublished: page.blogPost.publicPublishedAt,
        }}
      />
      <h1>
        <GraphCmsLink page={page}>{page.blogPost.title}</GraphCmsLink>
        <div dangerouslySetInnerHTML={{ __html: page.blogPost.content! }} />
      </h1>
    </div>
  )
}

export default Page

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticPaths = async () => {
  const { getStaticPaths } = await import('../../lib/graphcms')
  return getStaticPaths('blog')
}
// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps: GetStaticProps = async ctx => {
  const { createGetStaticProps } = await import('../../lib/graphcms')
  return createGetStaticProps('blog')(ctx)
}
