import React from 'react'
import LayoutFull, { PageLayoutProps, PageWithLayoutFull } from 'components/PageLayout'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import ContentRenderer from 'components/ContentRenderer'
import RowHeroVertical from 'components/RowHero/RowHeroVertical'

const B2Bpage: PageWithLayoutFull = ({ page }) => {
  return (
    <div>
      <ContentRenderer
        content={page.content}
        renderers={{
          RowHero: RowHeroVertical,
        }}
      />
    </div>
  )
}

B2Bpage.layout = LayoutFull

export default B2Bpage

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: {
    ...(await getPageLayoutProps({ url: '/business-to-business-webshop', locale: 'nl' })),
    headerTheme: 'on-green',
  },
})
