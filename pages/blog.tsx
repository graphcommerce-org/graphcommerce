import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import BlogList from '../components/BlogList'

const Blog: PageWithLayoutFull<GQLGetBlogListQuery> = ({ page, blogPosts }) => {
  return (
    <>
      <ContentRenderer content={page.content} />
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

Blog.layout = LayoutFull

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/blog', locale: 'nl' }

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/BlogList/server/getStaticData').then((module) => module.default(params)),
  ])

  return { props: Object.assign(...data) }
}
