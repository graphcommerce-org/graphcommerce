import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import getStaticPathsFactory from 'node/getStaticPathsFactory'
import ContentRenderer from 'components/ContentRenderer'
import extractParams, { StaticPageParams } from 'node/staticParams'
import { useHeaderSpacing } from 'components/Header'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import RowHeroCases from 'components/RowHero/RowHeroCases'
import RowColumnTwoSpread from 'components/RowColumnTwo/RowColumnTwoSpread'

const CasesView: PageWithLayoutFull = ({ page }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <ContentRenderer
        content={page.content}
        renderers={{
          RowHero: RowHeroCases,
          RowColumnTwo: RowColumnTwoSpread,
        }}
      />
    </div>
  )
}

CasesView.layout = LayoutFull

export default CasesView

export const getStaticPaths = getStaticPathsFactory(
  '/portfolio-magento-e-commerce-projecten/',
  'nl',
)

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayoutProps(extractParams(ctx, '/portfolio-magento-e-commerce-projecten/')),
})
