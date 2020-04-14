import React from 'react'
import { GetStaticProps } from 'next'
import { Typography } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import BlogList from '../components/BlogList'

const Blog: PageWithLayoutFull<GQLGetBlogListQuery> = ({ pages, blogPosts }) => {
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

export const getStaticProps: GetStaticProps<
  GQLGetPageLayoutQuery & GQLGetBlogListQuery
> = async () => {
  const params: StaticPageVariables = { url: '/blog', locale: 'nl' }

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/BlogList/server/getStaticData').then((module) => module.default(params)),
  ])

  return { props: Object.assign(...data) }
}
