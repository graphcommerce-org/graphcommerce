import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import extractParams, { StaticPageParams } from '../lib/staticParams'

const CatchAll: PageWithLayoutFull = ({ pages }) => {
  return <ContentRenderer {...pages[0]} />
}

CatchAll.layout = LayoutFull

export default CatchAll

export const getServerSideProps: GetStaticProps<GQLGetPageLayoutQuery, StaticPageParams> = async (
  ctx,
) => {
  const params = extractParams(ctx, '/')

  const getStaticData = await import('../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
