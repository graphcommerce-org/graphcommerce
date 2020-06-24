import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import RowHeroLaptop from 'components/RowHero/RowHeroLaptop'
import RowContactBoxed from 'components/RowContact/RowContactBoxed'

const M2Quotation: PageWithLayoutFull = ({ page }) => {
  return (
    <div>
      <ContentRenderer
        content={page.content}
        renderers={{
          RowHero: RowHeroLaptop,
          RowContact: RowContactBoxed,
        }}
      />
    </div>
  )
}

M2Quotation.layout = LayoutFull

export default M2Quotation

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayoutProps({ url: '/magento-webshop-offerte-aanvragen', locale: 'nl' }),
})
