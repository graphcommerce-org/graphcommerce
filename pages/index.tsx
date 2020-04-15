import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import RowHeroHome from '../components/RowHeroHome'
import { StaticPageVariables } from '../lib/staticParams'

const Home: PageWithLayoutFull = ({ pages }) => {
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

export const getStaticProps: GetStaticProps<GQLGetPageLayoutQuery> = async () => {
  const params: StaticPageVariables = { url: '/', locale: 'nl' }
  const getStaticData = await import('../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
