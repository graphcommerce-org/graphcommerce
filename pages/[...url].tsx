import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import { LayoutPage } from '../lib/layout'
import ContentRenderer from '../components/ContentRenderer'
import extractParams, { StaticPageParams } from '../lib/staticParams'

const CatchAll: LayoutPage<PageLayoutProps> = ({ pages }) => {
  return <ContentRenderer {...pages[0]} />
}

CatchAll.layout = LayoutFull

export default CatchAll

export const getServerSideProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (
  ctx,
) => {
  const params = extractParams(ctx, '/')

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
