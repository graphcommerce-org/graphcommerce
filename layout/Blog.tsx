/* eslint-disable react/no-danger */
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import Error from 'next/error'
import { GraphCmsLink, GraphCmsPage, GraphCmsPageHead } from '../graphcms'

const BlogLayout: React.FC<GraphCmsPage> = ({ page, locale }) => {
  if (!page.blogPost) {
    return <Error statusCode={404} title='page.blogPost not found.' />
  }

  return (
    <div>
      <GraphCmsPageHead locale={locale} page={page} />
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
        <GraphCmsLink page={page} locale={locale}>
          {page.blogPost.title}
        </GraphCmsLink>
      </h1>
      <div dangerouslySetInnerHTML={{ __html: page.blogPost.content! }} />
    </div>
  )
}

export { BlogLayout }
