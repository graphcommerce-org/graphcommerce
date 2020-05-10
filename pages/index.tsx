import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, {
  PageWithLayoutFull,
  PageLayoutProps,
  getStaticProps as get,
} from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import RowHeroHome from '../components/RowHero/RowHeroHome'
import { StaticPageVariables } from '../lib/staticParams'

const Home: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <ContentRenderer
        content={page.content}
        renderers={{
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
  return { props: await get(params) }
}
