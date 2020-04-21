import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../../components/PageLayout'
import getStaticPathsFactory from '../../lib/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'
import extractParams, { StaticPageParams } from '../../lib/staticParams'

const CasesView: PageWithLayoutFull = ({ page }) => {
  return <ContentRenderer content={page.content} />
}

CasesView.layout = LayoutFull

export default CasesView

export const getStaticPaths = getStaticPathsFactory('/cases/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = extractParams(ctx, '/cases/')

  const getStaticData = await import('../../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
