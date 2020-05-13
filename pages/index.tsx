import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import ContentRenderer from 'components/ContentRenderer'
import RowHeroHome from 'components/RowHero/RowHeroHome'

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

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayoutProps({ url: '/', locale: 'nl' }),
})
