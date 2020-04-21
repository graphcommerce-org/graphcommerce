import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import RowHeroHome from '../components/RowHeroHome'
import { StaticPageVariables } from '../lib/staticParams'

const Home: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <ContentRenderer
        content={page.content}
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
  const { getStaticData } = await import('../components/PageLayout')
  return { props: await getStaticData(params) }
}
