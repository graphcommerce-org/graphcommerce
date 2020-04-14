import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull } from '../../components/PageLayout'
import getStaticPathsFactory from '../../components/PageLayout/server/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'
import extractParams, { StaticPageParams } from '../../lib/staticParams'

const CasesView: PageWithLayoutFull = ({ pages }) => {
  if (!pages[0]) return <></>
  return <ContentRenderer content={pages[0].content} />
}

CasesView.layout = LayoutFull

export default CasesView

export const getStaticPaths = getStaticPathsFactory('/cases/', 'nl')

export const getStaticProps: GetStaticProps<GQLGetPageLayoutQuery, StaticPageParams> = async (
  ctx,
) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = extractParams(ctx, '/cases/')

  const getStaticData = await import('../../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
