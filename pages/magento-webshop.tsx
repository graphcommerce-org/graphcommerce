import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import RowContactBoxed from 'components/RowContact/RowContactBoxed'

const MagentoWebshopPage: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <ContentRenderer
        {...page}
        renderers={{
          RowContact: RowContactBoxed,
        }}
      />
    </>
  )
}

MagentoWebshopPage.layout = LayoutFull

export default MagentoWebshopPage

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: {
    ...(await getPageLayoutProps({ url: '/magento-webshop', locale: 'nl' })),
    headerTheme: 'on-green',
  },
})
