import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { LayoutPage } from '../lib/layout'
import RowHeroHome from '../components/RowHeroHome'
import { StaticPageVariables } from '../lib/staticParams'

const Home: LayoutPage<PageLayoutProps> = ({ pages }) => {
  return (
    <>
      <ContentRenderer
        content={pages[0].content}
        customRenderers={{
          RowHero: RowHeroHome,
        }}
      />
    </>
  )
}

Home.layout = LayoutFull

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/', locale: 'nl' }

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
