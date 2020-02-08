/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */

import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import Error from 'next/error'
import { GraphCmsPage, PageHead, Link, isPageNlHasEn, isPageEnHasNl } from '../graphcms'

const BlogLayout: React.FC<GraphCmsPage> = ({ page, locale }) => {
  if (!page.blogPost) {
    return <Error statusCode={404} title='page.blogPost not found.' />
  }

  return (
    <div>
      <PageHead locale={locale} page={page} />
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
        <Link metaRobots={page.metaRobots} url={page.url!}>
          {page.blogPost.title}
        </Link>
      </h1>
      {isPageNlHasEn(page) && (
        <Link metaRobots={page.metaRobots} url={page.urlEN!}>
          Read in English
        </Link>
      )}
      {isPageEnHasNl(page) && (
        <Link metaRobots={page.metaRobots} url={page.urlNL!}>
          Read in Dutch
        </Link>
      )}

      <div dangerouslySetInnerHTML={{ __html: page.blogPost?.content! }} />
    </div>
  )
}

export { BlogLayout }
