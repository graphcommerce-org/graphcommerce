import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import extractParams, { StaticPageParams } from 'lib/staticParams'
import { useHeaderSpacing } from 'components/Header'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

const CatchAll: PageWithLayoutFull = ({ page }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <ContentRenderer {...page} />
    </div>
  )
}

CatchAll.layout = LayoutFull

export default CatchAll

export const getServerSideProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (
  ctx,
) => ({ props: await getPageLayoutProps(extractParams(ctx, '/')) })
