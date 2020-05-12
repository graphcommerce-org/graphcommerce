import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, {
  PageWithLayoutFull,
  PageLayoutProps,
  getStaticProps as getPageLayout,
} from 'components/PageLayout'
import getStaticPathsFactory from 'lib/getStaticPaths'
import ContentRenderer from 'components/ContentRenderer'
import extractParams, { StaticPageParams } from 'lib/staticParams'
import { useHeaderSpacing } from 'components/Header'

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
  props: await getPageLayout(extractParams(ctx, '/cases/')),
})
