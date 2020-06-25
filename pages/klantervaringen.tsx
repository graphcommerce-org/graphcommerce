import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import extractParams, { StaticPageParams } from 'node/staticParams'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

const ReviewPage: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <ContentRenderer {...page} />
    </>
  )
}

ReviewPage.layout = LayoutFull

export default ReviewPage

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: {
    ...(await getPageLayoutProps({ url: '/klantervaringen', locale: 'nl' })),
    headerTheme: 'on-green',
  },
})
