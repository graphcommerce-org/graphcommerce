import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import RowHeroLaptop from 'components/RowHero/RowHeroLaptop'
import RowColumnTwoSpread from 'components/RowColumnTwo/RowColumnTwoSpread'
import extractParams, { StaticPageParams } from 'node/staticParams'
import getStaticPathsFactory from 'node/getStaticPathsFactory'
import RowContactBoxed from 'components/RowContact/RowContactBoxed'

const M2Community: PageWithLayoutFull = ({ page }) => {
  return (
    <div>
      <ContentRenderer
        content={page.content}
        renderers={{
          RowHero: RowHeroLaptop,
          RowColumnTwo: RowColumnTwoSpread,
          RowContact: RowContactBoxed,
        }}
      />
    </div>
  )
}

M2Community.layout = LayoutFull

export default M2Community

export const getStaticPaths = getStaticPathsFactory('/magento-2/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayoutProps(extractParams(ctx, '/magento-2/')),
})
