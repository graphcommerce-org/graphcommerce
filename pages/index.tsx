import React from 'react'
import { GQLLocale } from '../generated/graphql'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { GetStaticProps } from '../lib/getStaticProps'
import { LayoutPage } from '../lib/layout'

const Home: LayoutPage<PageLayoutProps> = ({ pages }) => {
  return <ContentRenderer content={pages[0].content} />
}

Home.layout = LayoutFull

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params = { url: '/', locale: GQLLocale.Nl }

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
    import('../components/Breadcrumb/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
