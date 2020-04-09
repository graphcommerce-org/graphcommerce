import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import { GQLLocale } from '../generated/graphql'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import { LayoutPage } from '../lib/layout'
import ContentRenderer from '../components/ContentRenderer'

const Blog: LayoutPage<PageLayoutProps> = ({ pages }) => {
  if (!pages[0]) return <></>

  return (
    <>
      <Typography variant='h1'>{pages[0].title}</Typography>
      <ContentRenderer content={pages[0].content} />
    </>
  )
}

Blog.layout = LayoutFull

export default Blog

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params = { url: '/blog', locale: GQLLocale.Nl }
  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
