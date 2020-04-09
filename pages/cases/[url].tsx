import React from 'react'
import { GQLLocale } from '../../generated/graphql'
import LayoutFull, { PageLayoutProps } from '../../components/PageLayout'
import { GetStaticProps } from '../../lib/getStaticProps'
import { LayoutPage } from '../../lib/layout'
import getStaticPathsFactory from '../../components/PageLayout/server/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'

const CasesView: LayoutPage<PageLayoutProps> = ({ pages }) => {
  if (!pages[0]) return <></>

  return (
    <>
      <ContentRenderer content={pages[0].content} />
    </>
  )
}

CasesView.layout = LayoutFull

export default CasesView

export const getStaticPaths = getStaticPathsFactory('/cases/', GQLLocale.Nl)

export const getStaticProps: GetStaticProps<PageLayoutProps> = async (ctx) => {
  if (!ctx.params) throw new Error('Params not defined for blog view')

  const params = { url: `/cases/${ctx.params.url}`, locale: GQLLocale.Nl }

  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
    import('../../components/Breadcrumb/server/getStaticProps').then((module) =>
      module.default({ params }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
