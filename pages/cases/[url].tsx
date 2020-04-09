import React from 'react'
import { GetStaticProps } from 'next'
import { GQLLocale } from '../../generated/graphql'
import LayoutFull, { PageLayoutProps } from '../../components/PageLayout'
import { LayoutPage } from '../../lib/layout'
import getStaticPathsFactory from '../../components/PageLayout/server/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'
import extractParams, { StaticPageParams } from '../../lib/staticParams'

const CasesView: LayoutPage<PageLayoutProps> = ({ pages }) => {
  if (!pages[0]) return <></>

  return <ContentRenderer content={pages[0].content} />
}

CasesView.layout = LayoutFull

export default CasesView

export const getStaticPaths = getStaticPathsFactory('/cases/', GQLLocale.Nl)

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = extractParams(ctx, '/cases/')

  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
