import React from 'react'
import { GetStaticProps } from 'next'
import { Typography } from '@material-ui/core'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { LayoutPage } from '../lib/layout'
import { StaticPageVariables } from '../lib/staticParams'
import BlogList from '../components/BlogList'

const Blog: LayoutPage<PageLayoutProps & GQLGetBlogListQuery> = ({ pages, blogPosts }) => {
  if (!pages[0]) return <></>

  return (
    <>
      <Typography variant='h1'>{pages[0].title}</Typography>
      <ContentRenderer content={pages[0].content} />
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

Blog.layout = LayoutFull

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps & GQLGetBlogListQuery> = async () => {
  const params: StaticPageVariables = { url: '/blog', locale: 'nl' }
  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/BlogList/server/getStaticData').then((module) => module.default(params)),
  ])

  return { props: { ...data[0], ...data[1], ...data[2] } }
}
