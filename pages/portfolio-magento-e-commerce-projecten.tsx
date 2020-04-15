import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import PortfolioList from '../components/PortfolioList'
import { StaticPageVariables } from '../lib/staticParams'

const Portfolio: PageWithLayoutFull<GQLGetPortfolioListQuery> = ({ pages, portfolioList }) => {
  return (
    <>
      <PortfolioList portfolioList={portfolioList} />
      <ContentRenderer content={pages[0].content} />
    </>
  )
}

Portfolio.layout = LayoutFull

export default Portfolio

export const getStaticProps: GetStaticProps<
  GQLGetPageLayoutQuery & GQLGetPortfolioListQuery
> = async () => {
  const params: StaticPageVariables = {
    url: '/portfolio-magento-e-commerce-projecten',
    locale: 'nl',
  }

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/PortfolioList/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: Object.assign(...data) }
}
