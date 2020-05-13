import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import getStaticPathsFactory from 'node/getStaticPathsFactory'
import ContentRenderer from 'components/ContentRenderer'
import extractParams, { StaticPageParams } from 'node/staticParams'
import { useHeaderSpacing } from 'components/Header'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

const CasesView: PageWithLayoutFull = ({ page }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <ContentRenderer content={page.content} />
    </div>
  )
}

CasesView.layout = LayoutFull

export default CasesView

export const getStaticPaths = getStaticPathsFactory('/cases/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayoutProps(extractParams(ctx, '/cases/')),
})
