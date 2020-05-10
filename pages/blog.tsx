import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, {
  PageWithLayoutFull,
  PageLayoutProps,
  getStaticProps as getPageLayout,
} from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import BlogList, { getStaticProps as getBlogList } from '../components/BlogList'
import { useHeaderSpacing } from '../components/Header'

const Blog: PageWithLayoutFull<GQLGetBlogListQuery> = ({ page, blogPosts }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <ContentRenderer content={page.content} />
      <BlogList blogPosts={blogPosts} />
    </div>
  )
}

Blog.layout = LayoutFull

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/blog', locale: 'nl' }
  const data = await Promise.all([getPageLayout(params), getBlogList(params)])
  return { props: Object.assign(...data) }
}
