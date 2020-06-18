import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import { useHeaderSpacing } from 'components/Header'

const TermsAndConditions: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <ContentRenderer content={page.content} />
    </>
  )
}

TermsAndConditions.layout = LayoutFull

export default TermsAndConditions

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: {
    ...(await getPageLayoutProps({
      url: '/algemene-voorwaarden-magento-webshop-ontwikkeling',
      locale: 'nl',
    })),
    headerTheme: 'on-green',
  },
})
